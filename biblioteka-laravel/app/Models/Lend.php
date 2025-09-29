<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lend extends Model
{
    const TABLE = 'lends';

    const STATUS_BORROWED = 'borrowed';
    const STATUS_RETURNED = 'returned';
    const STATUS_OVERDUE = 'overdue';


    protected $table = self::TABLE;

    protected $fillable = ['book_copy_id', 'user_id', 'lend_date', 'return_date', 'status'];

    public static function statuses(): array
    {
        return [
            self::STATUS_BORROWED,
            self::STATUS_RETURNED,
            self::STATUS_OVERDUE,
        ];
    }

    public function bookCopy()
    {
        return $this->belongsTo(BookCopy::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
