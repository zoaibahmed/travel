<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetOTP extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;
    public $user;

    public function __construct(string $otp, User $user)
    {
        $this->otp = $otp;
        $this->user = $user;
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'Your Secure Access Code - Sovereign Elite',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.auth.password-reset',
        );
    }
}
