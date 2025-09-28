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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'member', 'librarian'])->default('member')->after('password');
            $table->string('phoneNumber')->nullable()->after('role');
            $table->string('address')->nullable()->after('phoneNumber');
            $table->date('date_of_birth')->nullable()->after('address');
            $table->string('profile_photo_path')->nullable()->after('date_of_birth');
            $table->index('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phoneNumber', 'address', 'date_of_birth', 'profile_photo_path']);
            $table->dropIndex(['role']);
        });
    }
};
