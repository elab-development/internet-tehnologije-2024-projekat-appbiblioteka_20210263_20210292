<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LendController extends ResponseController
{
    public function index()
    {
        $lends = \App\Models\Lend::all();
        return $this->success(
            \App\Http\Resources\LendResource::collection($lends),
            'Lends retrieved successfully'
        );
    }

    public function findLendsByUser(Request $request, $userId)
    {
        $lends = \App\Models\Lend::where('user_id', $userId)->get();
        return $this->success(
            \App\Http\Resources\LendResource::collection($lends->load('bookCopy.book', 'user')),
            'Lends retrieved successfully'
        );
    }

    public function findLendsByStatus(Request $request, $status)
    {
        $lends = \App\Models\Lend::where('status', $status)->get();
        return $this->success(
            \App\Http\Resources\LendResource::collection($lends),
            'Lends retrieved successfully'
        );
    }

    public function store(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'book_copy_id' => 'required|exists:book_copies,id',
            'lend_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:lend_date'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', 422, $validator->errors());
        }

        $lend = \App\Models\Lend::create($request->all());
        return $this->success(
            new \App\Http\Resources\LendResource($lend),
            'Lend created successfully',
            201
        );
    }

    public function destroy(Request $request, $id)
    {
        $lend = \App\Models\Lend::find($id);
        if (!$lend) {
            return $this->error('Lend not found', 404);
        }

        $lend->delete();
        return $this->success(null, 'Lend deleted successfully');
    }

    public function markAsReturned(Request $request, $id)
    {
        $lend = \App\Models\Lend::find($id);
        if (!$lend) {
            return $this->error('Lend not found', 404);
        }

        $lend->status = \App\Models\Lend::STATUS_RETURNED;
        $lend->return_date = now();
        $lend->save();

        $bookCopy = $lend->bookCopy;
        $bookCopy->status = \App\Models\BookCopy::STATUS_AVAILABLE;
        $bookCopy->save();

        return $this->success(
            new \App\Http\Resources\LendResource($lend),
            'Lend marked as returned successfully'
        );
    }
}
