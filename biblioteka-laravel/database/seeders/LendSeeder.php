<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $userIds = \App\Models\User::where('role', 'member')->pluck('id')->toArray();
        $bookCopyIds = \App\Models\BookCopy::pluck('id')->toArray();

        for ($i = 0; $i < 100; $i++) {
            $borrowDate = $faker->dateTimeBetween('-1 year', 'now');
            $returnDate = (rand(0, 1) == 1) ? $faker->dateTimeBetween($borrowDate, 'now') : null;
            \App\Models\Lend::create([
                'user_id' => $faker->randomElement($userIds),
                'book_copy_id' => $faker->randomElement($bookCopyIds),
                'lend_date' => $borrowDate,
                'return_date' => $returnDate,
                'status' => $returnDate ? 'returned' : 'borrowed',
            ]);
        }
    }
}
