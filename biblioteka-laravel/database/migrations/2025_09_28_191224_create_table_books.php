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
        Schema::create(\App\Models\Book::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('author_id');
            $table->year('published_year');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('genre_id');
            $table->string('reference_code')->unique();
            $table->foreign('author_id')->references('id')->on(\App\Models\Author::TABLE)->onDelete('cascade');
            $table->foreign('genre_id')->references('id')->on(\App\Models\Genre::TABLE)->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Book::TABLE);
    }
};
