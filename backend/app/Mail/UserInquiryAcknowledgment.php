<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserInquiryAcknowledgment extends Mailable
{
    use Queueable, SerializesModels;

    public $inquiry;
    public $concierge;
    public $recommendations;

    public function __construct(Inquiry $inquiry, string $concierge, $recommendations)
    {
        $this->inquiry = $inquiry;
        $this->concierge = $concierge;
        $this->recommendations = $recommendations;
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'We have received your inquiry - Sovereign Elite',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.inquiries.acknowledgment',
        );
    }
}
