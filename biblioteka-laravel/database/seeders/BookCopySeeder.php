<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookCopySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = \App\Models\Book::all();

        $faker = \Faker\Factory::create();

        foreach ($books as $book) {
            $numCopies = rand(1, 5);
            for ($i = 0; $i < $numCopies; $i++) {
                \App\Models\BookCopy::create([
                    'book_id' => $book->id,
                    'status' => $faker->randomElement(['available', 'borrowed', 'reserved']),
                    'location' => $faker->randomElement(['Main Library', 'Branch A', 'Branch B']),
                ]);
            }
        }
    }
}
