<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->date('travel_date')->nullable();
            $table->integer('travelers')->nullable();
            $table->string('phone')->nullable();
            $table->json('proposal_data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn(['travel_date', 'travelers', 'phone', 'proposal_data']);
        });
    }
};
