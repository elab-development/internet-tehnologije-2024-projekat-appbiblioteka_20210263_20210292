<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LendResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'book_copy' => new BookCopyResource($this->whenLoaded('bookCopy')),
            'user' => new UserResource($this->whenLoaded('user')),
            'lend_date' => $this->lend_date,
            'return_date' => $this->return_date,
            'status' => $this->status,
        ];
    }
}
