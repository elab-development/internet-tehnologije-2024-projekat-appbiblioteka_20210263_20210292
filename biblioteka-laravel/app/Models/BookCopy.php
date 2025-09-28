<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookCopy extends Model
{
    const TABLE = 'book_copies';

    const STATUS_AVAILABLE = 'available';
    const STATUS_BORROWED = 'borrowed';
    const STATUS_RESERVED = 'reserved';
    const STATUS_MAINTENANCE = 'maintenance';
    const STATUS_DAMAGED = 'damaged';
    const STATUS_LOST = 'lost';

    protected $table = self::TABLE;

    protected $fillable = ['book_id', 'status', 'location'];

    public static function statuses(): array
    {
        return [
            self::STATUS_AVAILABLE,
            self::STATUS_BORROWED,
            self::STATUS_RESERVED,
            self::STATUS_MAINTENANCE,
            self::STATUS_DAMAGED,
            self::STATUS_LOST,
        ];
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
