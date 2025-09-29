<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BookController extends ResponseController
{
    public function index()
    {
        $books = \App\Models\Book::all();

        return $this->success(
            \App\Http\Resources\BookResource::collection($books),
            'Books retrieved successfully'
        );
    }

    public function search(Request $request)
    {
        $q = $request->input('q');
        $books = \App\Models\Book::where('title', 'LIKE', "%$q%")->get();

        return $this->success(
            \App\Http\Resources\BookResource::collection($books->load('author', 'genre')),
            'Books retrieved successfully'
        );
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'published_year' => 'required|integer|min:1000|max:' . date('Y'),
            'summary' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error',422,  $validator->errors());
        }

        $book = \App\Models\Book::create($request->all());

        return $this->success(
            new \App\Http\Resources\BookResource($book),
            'Book created successfully',
            201
        );
    }

    //delete a book
    public function destroy($id)
    {
        $book = \App\Models\Book::find($id);

        if (!$book) {
            return $this->error('Book not found', 404);
        }

        $book->delete();

        return $this->success(null, 'Book deleted successfully');
    }

    public function paginate(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $books = DB::table('books')
            ->join('authors', 'books.author_id', '=', 'authors.id')
            ->join('genres', 'books.genre_id', '=', 'genres.id')
            ->paginate($perPage);

        return $this->success(
            $books,
            'Books retrieved successfully'
        );
    }

    public function findByAuthor(Request $request, $authorId)
    {
        $books = \App\Models\Book::where('author_id', $authorId)->get();
        return $this->success(
            \App\Http\Resources\BookResource::collection($books),
            'Books retrieved successfully'
        );
    }

    public function findByGenre(REquest $request, $genreId)
    {
        $books = \App\Models\Book::where('genre_id', $genreId)->get();
        return $this->success(
            \App\Http\Resources\BookResource::collection($books),
            'Books retrieved successfully'
        );
    }
}
