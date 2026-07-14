<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserInquiryAcknowledgment;
use App\Mail\UserInquiryApproved;
use App\Mail\AdminInquiryNotification;
use App\Mail\QuoteIssued;
use App\Models\Tour;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'destination' => 'nullable|string|max:255',
            'message' => 'nullable|string', // make optional since we have specific fields now
            'travel_date' => 'nullable|date',
            'travelers' => 'nullable|integer',
            'phone' => 'nullable|string',
        ]);

        $userId = null;
        $needsSetup = false;
        $setupToken = null;

        if (Auth::guard('sanctum')->check()) {
            $userId = Auth::guard('sanctum')->id();
        } else {
            // Check if user exists by email
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                $userId = $existingUser->id;
            } else {
                // Auto create temp user
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make(Str::random(16)),
                ]);
                $userId = $user->id;
                
                // Generate password setup token
                $setupToken = Str::random(60);
                DB::table('password_resets')->insert([
                    'email' => $user->email,
                    'token' => $setupToken,
                    'created_at' => now()
                ]);
                $needsSetup = true;
            }
        }

        $inquiry = Inquiry::create([
            'user_id' => $userId,
            'name' => $request->name,
            'email' => $request->email,
            'destination' => $request->destination,
            'message' => $request->message ?? '',
            'status' => 'Pending Consultation',
            'item_type' => $request->item_type,
            'item_id' => $request->item_id,
            'travel_date' => $request->travel_date,
            'travelers' => $request->travelers,
            'phone' => $request->phone,
        ]);

        // 1. Assign a Concierge Persona
        $concierges = ['Alexander Thorne', 'Isabella Vance', 'Julian Croft', 'Eleanor Vance'];
        $assignedConcierge = $concierges[array_rand($concierges)];

        // 2. Fetch Smart Recommendations (based on destination or just top rated)
        $recommendations = collect();
        if ($inquiry->destination) {
            $recommendations = Tour::where('title', 'like', '%' . $inquiry->destination . '%')
                                   ->orWhere('location', 'like', '%' . $inquiry->destination . '%')
                                   ->orWhereHas('destination', function($q) use ($inquiry) {
                                       $q->where('name', 'like', '%' . $inquiry->destination . '%');
                                   })
                                   ->inRandomOrder()
                                   ->take(3)
                                   ->get();
        }

        // Fallback to top-rated tours if no exact match found
        if ($recommendations->count() < 3) {
            $fallback = Tour::orderBy('rating', 'desc')
                            ->whereNotIn('id', $recommendations->pluck('id'))
                            ->take(3 - $recommendations->count())
                            ->get();
            $recommendations = $recommendations->merge($fallback);
        }

        try {
            Mail::to($inquiry->email)->send(new UserInquiryAcknowledgment($inquiry, $assignedConcierge, $recommendations));
            Mail::to(env('MAIL_USERNAME', 'farhanashakil.memon@gmail.com'))->send(new AdminInquiryNotification($inquiry));
        } catch (\Exception $e) {
            \Log::error("Mail delivery failed for inquiry {$inquiry->id}: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Inquiry submitted successfully.',
            'inquiry' => $inquiry,
            'needs_setup' => $needsSetup,
            'setup_token' => $setupToken,
            'email' => $request->email,
        ], 201);
    }

    public function confirm($id)
    {
        $inquiry = Inquiry::findOrFail($id);

        // Promoting inquiry to consultation stage
        $inquiry->update(['status' => 'Consultation']);

        try {
            Mail::to($inquiry->email)->send(new UserInquiryApproved($inquiry));
        } catch (\Exception $e) {
            \Log::error("Failed to send approval email: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Inquiry acknowledged. Consultation phase initiated.',
            'inquiry' => $inquiry,
        ]);
    }

    public function setQuote(Request $request, $id)
    {
        // ... keeping for backward compatibility but moving to sendProposal
        $inquiry = Inquiry::findOrFail($id);
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
        ]);

        $inquiry->update([
            'quote_amount' => $request->amount,
            'quote_currency' => $request->currency,
            'status' => 'Awaiting Payment',
        ]);

        try {
            Mail::to($inquiry->email)->send(new QuoteIssued($inquiry));
        } catch (\Exception $e) {
            \Log::error("Failed to send quote email: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Quote established for this journey.',
            'inquiry' => $inquiry,
        ]);
    }

    public function sendProposal(Request $request, $id)
    {
        $inquiry = Inquiry::findOrFail($id);
        $request->validate([
            'title' => 'required|string',
            'dates' => 'required|string',
            'duration' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $inquiry->update([
            'proposal_data' => $request->all(),
            'quote_amount' => $request->price,
            'quote_currency' => 'USD', // Defaulting to USD for now
            'status' => 'Proposal Sent',
        ]);

        // In a real app, send a specific Proposal Sent email here

        return response()->json([
            'message' => 'Proposal officially sent to the client.',
            'inquiry' => $inquiry,
        ]);
    }

    public function acceptProposal(Request $request, $id)
    {
        $inquiry = Inquiry::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        
        $inquiry->update([
            'status' => 'Awaiting Payment'
        ]);

        return response()->json([
            'message' => 'Proposal accepted. Please proceed with the deposit.',
            'inquiry' => $inquiry,
        ]);
    }

    public function finalize(Request $request, $id)
    {
        $inquiry = Inquiry::findOrFail($id);
        
        if (!$inquiry->quote_amount) {
            return response()->json(['message' => 'Please set a quote first.'], 400);
        }

        $inquiry->update(['status' => 'Confirmed']);

        // Create a transaction record for the user ledger
        Transaction::create([
            'user_id' => $inquiry->user_id,
            'inquiry_id' => $inquiry->id,
            'amount' => $inquiry->quote_amount,
            'currency' => $inquiry->quote_currency,
            'status' => 'Completed',
            'method' => 'Internal Approval',
            'owner_signature' => $request->signature, // Admin signature
        ]);

        return response()->json([
            'message' => 'Journey officially confirmed and recorded in ledger.',
            'inquiry' => $inquiry,
        ]);
    }

    public function pay(Request $request, $id)
    {
        $inquiry = Inquiry::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        
        if ($inquiry->status !== 'Awaiting Payment' && $inquiry->status !== 'Pending Payment') {
            return response()->json(['message' => 'This inquiry is not ready for payment.'], 400);
        }

        $coupon = $request->coupon;
        $is_coupon_valid = ($coupon === 'SOVEREIGN2026');

        $inquiry->update(['status' => 'Confirmed']);

        $transaction = Transaction::create([
            'user_id' => $inquiry->user_id,
            'inquiry_id' => $inquiry->id,
            'amount' => $is_coupon_valid ? 0 : $inquiry->quote_amount,
            'currency' => $inquiry->quote_currency,
            'status' => 'Completed',
            'method' => $request->method ?? ($is_coupon_valid ? 'Coupon Code' : 'Digital Settlement'),
            'notes' => $is_coupon_valid ? "Applied Coupon: $coupon" : "Digital Signature Verified via Portal",
            'user_signature' => $request->signature, // User signature
        ]);

        // Send Confirmation Email
        try {
            $dashboardUrl = env('FRONTEND_URL', 'http://localhost:3000') . '/dashboard?tab=Transactions';
            Mail::send([], [], function ($message) use ($inquiry, $transaction, $dashboardUrl) {
                $message->to($inquiry->email)
                    ->subject('Official Settlement: ' . ($inquiry->destination ?? 'Sovereign Expedition'))
                    ->html("
                        <div style='font-family: serif; color: #000; padding: 40px; border: 1px solid #eee;'>
                            <h1 style='text-transform: uppercase; letter-spacing: 0.2em; font-weight: 300;'>Sovereign Confirmation</h1>
                            <p>Your journey is now officially recorded in the elite ledger.</p>
                            <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
                            <p><strong>Transaction ID:</strong> SOV-{$transaction->id}</p>
                            <p><strong>Destination:</strong> " . ($inquiry->destination ?? 'Bespoke Expedition') . "</p>
                            <p><strong>Amount:</strong> {$transaction->currency} {$transaction->amount}</p>
                            <p><strong>Settlement Method:</strong> {$transaction->method}</p>
                            <br>
                            <a href='{$dashboardUrl}' style='display: inline-block; padding: 15px 30px; background: #000; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 10px; letter-spacing: 0.3em; font-weight: 900;'>View Official Receipt</a>
                        </div>
                    ");
            });
        } catch (\Exception $e) {
            \Log::error("Payment confirmation email failed for transaction {$transaction->id}: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Payment successful! Welcome to the Sovereign collection.',
            'inquiry' => $inquiry,
            'transaction_id' => $transaction->id,
            'redirect_url' => '/dashboard?tab=Transactions'
        ]);
    }

    public function index(Request $request)
    {
        $query = Inquiry::latest();
        
        if ($request->user() && !$request->user()->is_admin) {
            $query->where('user_id', $request->user()->id);
        }
        
        return response()->json($query->get());
    }
}
