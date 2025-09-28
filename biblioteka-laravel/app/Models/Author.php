<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{

    const TABLE = 'authors';

    protected $table = self::TABLE;

    protected $fillable = ['name'];

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
