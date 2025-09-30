<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookCopyController extends ResponseController
{
    public function index()
    {
        $bookCopies = \App\Models\BookCopy::all();
        return $this->success(
            \App\Http\Resources\BookCopyResource::collection($bookCopies),
            'Book copies retrieved successfully'
        );
    }

    public function findCopiesByBook(Request $request, $bookId)
    {

        $bookCopies = \App\Models\BookCopy::where('book_id', $bookId)->get();
        return $this->success(
            \App\Http\Resources\BookCopyResource::collection($bookCopies),
            'Book copies retrieved successfully'
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,id',
            'status' => 'required|in:available,borrowed,reserved,maintenance,damaged,lost',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', 422, $validator->errors());
        }

        $bookCopy = \App\Models\BookCopy::create($request->all());
        return $this->success(
            new \App\Http\Resources\BookCopyResource($bookCopy),
            'Book copy created successfully',
            201
        );
    }

    public function destroy($id)
    {
        $bookCopy = \App\Models\BookCopy::find($id);
        if (!$bookCopy) {
            return $this->error('Book copy not found', 404);
        }

        $bookCopy->delete();
        return $this->success(null, 'Book copy deleted successfully');
    }

    public function changeStatus(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:available,borrowed,reserved,maintenance,damaged,lost',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', 422, $validator->errors());
        }

        $bookCopy = \App\Models\BookCopy::find($id);
        if (!$bookCopy) {
            return $this->error('Book copy not found', 404);
        }

        $bookCopy->status = $request->input('status');
        $bookCopy->save();

        return $this->success(
            new \App\Http\Resources\BookCopyResource($bookCopy),
            'Book copy status updated successfully'
        );
    }
    public function availableBookCopies(Request $request)
    {
        $bookCopies = \App\Models\BookCopy::where('status', 'available')->get();
        return $this->success(
            \App\Http\Resources\BookCopyResource::collection($bookCopies->load('book')),
            'Available book copies retrieved successfully'
        );
    }

    public function bookCopyPerStatus(Request $request)
    {
        $data = DB::table('book_copies')
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        return $this->success($data, 'Book copies per status retrieved successfully');
    }
}
