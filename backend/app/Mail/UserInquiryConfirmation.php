<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserInquiryConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $inquiry;
    public $password;

    public function __construct(Inquiry $inquiry, $password = null)
    {
        $this->inquiry = $inquiry;
        $this->password = $password;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sovereign Elite: Inquiry Confirmation',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.user-inquiry-confirmation',
        );
    }
}
