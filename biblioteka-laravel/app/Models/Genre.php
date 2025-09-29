<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    const TABLE = 'genres';

    protected $table = self::TABLE;

    protected $fillable = ['genre_name'];

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
