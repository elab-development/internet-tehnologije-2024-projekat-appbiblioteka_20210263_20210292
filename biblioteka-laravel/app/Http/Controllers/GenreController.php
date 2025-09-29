<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GenreController extends ResponseController
{
    public function index()
    {
        $genres = \App\Models\Genre::all();
        return $this->success(
            \App\Http\Resources\GenreResource::collection($genres),
            'Genres retrieved successfully'
        );
    }

    public function search(Request $request)
    {
        $q = $request->input('q');
        $genres = \App\Models\Genre::where('genre_name', 'LIKE', "%$q%")->get();

        return $this->success(
            \App\Http\Resources\GenreResource::collection($genres),
            'Genres retrieved successfully'
        );
    }
}
