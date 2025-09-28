<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->get('https://gutendex.com/books');
        $content = json_decode($response->getBody()->getContents(), true);
        $books = $content['results'];
        $nextPage = $content['next'];
        $counter = 0;
        while ($nextPage && $counter < 5) {
            $response = $client->get($nextPage);
            $content = json_decode($response->getBody()->getContents(), true);
            $books = array_merge($books, $content['results']);
            $nextPage = $content['next'];
            $counter++;
        }

        $bookArray = [];
        $authorArray = [];
        $genreArray = [];

        $faker = \Faker\Factory::create();

        foreach ($books as $book) {
            $authorName = 'Unknown';
            if (isset($book['authors'][0]['name'])) {
                $authorName = $book['authors'][0]['name'];
            }
            if (!in_array($authorName, $authorArray)) {
                $authorArray[] = $authorName;
            }
            $genreName = 'Unknown';
            if (isset($book['subjects'][0])) {
                $genreName = $book['subjects'][0];
            }
            if (!in_array($genreName, $genreArray)) {
                $genreArray[] = $genreName;
            }

            //knjige sa apija znaju da budu duze od 255 karaktera, a to je limit za title u bazi
            $title = substr($book['title'], 0, 255);

            $bookArray[] = [
                'title' => $title,
                'author_name' => $authorName,
                'published_year' => $faker->year(),
                'description' => isset($book['summaries'][0]) ? $book['summaries'][0] : null,
                'genre_name' => $genreName,
            ];
        }

        $authorIds = [];
        foreach ($authorArray as $authorName) {
            $author = \App\Models\Author::firstOrCreate(['name' => $authorName]);
            $authorIds[$authorName] = $author->id;
        }

        $genreIds = [];
        foreach ($genreArray as $genreName) {
            $genre = \App\Models\Genre::firstOrCreate(['genre_name' => $genreName]);
            $genreIds[$genreName] = $genre->id;
        }

        foreach ($bookArray as $book) {
            \App\Models\Book::create([
                'title' => $book['title'],
                'author_id' => $authorIds[$book['author_name']],
                'published_year' => $book['published_year'],
                'description' => $book['description'],
                'genre_id' => $genreIds[$book['genre_name']],
            ]);
        }
    }
}
