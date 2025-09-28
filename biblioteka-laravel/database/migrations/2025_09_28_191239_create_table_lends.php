<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(\App\Models\Lend::TABLE, function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('book_copy_id');
            $table->unsignedBigInteger('user_id');
            $table->date('lend_date');
            $table->date('return_date')->nullable();
            $table->enum('status', \App\Models\Lend::statuses())->default(\App\Models\Lend::STATUS_BORROWED);

            $table->foreign('book_copy_id')->references('id')->on(\App\Models\BookCopy::TABLE)->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Lend::TABLE);
    }
};
