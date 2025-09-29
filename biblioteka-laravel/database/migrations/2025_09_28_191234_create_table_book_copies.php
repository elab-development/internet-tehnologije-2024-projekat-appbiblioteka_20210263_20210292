<?php

use App\Models\BookCopy;
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
        Schema::create(\App\Models\BookCopy::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_id');
            $table->enum('status', \App\Models\BookCopy::statuses())->default(BookCopy::STATUS_AVAILABLE);
            $table->string('location')->nullable();

            $table->foreign('book_id')->references('id')->on(\App\Models\Book::TABLE)->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\BookCopy::TABLE);
    }
};
