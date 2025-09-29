<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    const TABLE = 'books';

    protected $table = self::TABLE;

    protected $fillable = ['title', 'author_id', 'published_year', 'description', 'genre_id'];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
