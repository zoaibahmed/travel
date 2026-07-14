<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\PasswordResetOTP;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_first_login' => false, // New users create their own password
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            // We return success even if user doesn't exist for security
            return response()->json(['message' => 'If an account with that email exists, an OTP has been sent.']);
        }

        // Generate a 6-digit OTP
        $otp = (string) random_int(100000, 999999);

        // Delete old tokens for this email
        DB::table('password_resets')->where('email', $request->email)->delete();

        // Insert new OTP
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $otp, // For an OTP, storing plain text temporarily is often acceptable, or hash it.
            'created_at' => now()
        ]);

        // Send Email
        Mail::to($request->email)->send(new PasswordResetOTP($otp, $user));

        return response()->json(['message' => 'If an account with that email exists, an OTP has been sent.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $resetRecord = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetRecord) {
            throw ValidationException::withMessages([
                'token' => ['The provided OTP is invalid or expired.']
            ]);
        }

        // Check expiration (e.g., 15 minutes)
        if (now()->diffInMinutes($resetRecord->created_at) > 15) {
            DB::table('password_resets')->where('email', $request->email)->delete();
            throw ValidationException::withMessages([
                'token' => ['The provided OTP has expired.']
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        }

        // Delete token
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password has been successfully reset.']);
    }
}
