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
    public function up()
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->integer('nights')->nullable();
            $table->integer('group_size')->nullable();
            $table->string('currency')->default('PKR');
            $table->text('overview')->nullable();
            $table->text('narrative')->nullable();
            $table->string('accommodation')->nullable();
            $table->string('transport')->nullable();
            $table->string('best_season')->nullable();
            $table->string('difficulty')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('excludes')->nullable();
            $table->json('luxury_features')->nullable();
            $table->json('highlights')->nullable();
            $table->string('booking_button_text')->default('Book Expedition');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn([
                'nights', 'group_size', 'currency', 'overview', 'narrative', 
                'accommodation', 'transport', 'best_season', 'difficulty', 
                'hero_image', 'excludes', 'luxury_features', 'highlights', 
                'booking_button_text'
            ]);
        });
    }
};
