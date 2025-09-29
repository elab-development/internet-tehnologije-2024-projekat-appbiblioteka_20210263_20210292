<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorsController extends ResponseController
{
    public function index()
    {
        $authors = \App\Models\Author::all();

        return $this->success(
            AuthorResource::collection($authors),
            'Authors retrieved successfully'
        );
    }

    public function search(Request $request)
    {
        $q = $request->input('q');
        $authors = \App\Models\Author::where('name', 'LIKE', "%$q%")->get();

        return $this->success(
            AuthorResource::collection($authors),
            'Authors retrieved successfully'
        );
    }

    public function numbers(Request $request)
    {
        $books = \App\Models\Book::all();
        $authors = Author::all();
        $genres = \App\Models\Genre::all();
        $members = \App\Models\User::where('role', 'member')->get();

        return $this->success([
            'books' => $books->count(),
            'authors' => $authors->count(),
            'genres' => $genres->count(),
            'members' => $members->count(),
        ], 'Numbers retrieved successfully');
    }
}
