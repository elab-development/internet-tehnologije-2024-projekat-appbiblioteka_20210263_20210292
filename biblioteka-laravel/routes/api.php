<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/authors', [\App\Http\Controllers\AuthorsController::class, 'index']);
Route::get('/authors/search', [\App\Http\Controllers\AuthorsController::class, 'search']);
Route::get('/numbers', [\App\Http\Controllers\AuthorsController::class, 'numbers']);

Route::get('/genres', [\App\Http\Controllers\GenreController::class, 'index']);
Route::get('/genres/search', [\App\Http\Controllers\GenreController::class, 'search']);

Route::get('/books', [\App\Http\Controllers\BookController::class, 'index']);
Route::get('/books/search', [\App\Http\Controllers\BookController::class, 'search']);

Route::get('/books/paginate', [\App\Http\Controllers\BookController::class, 'paginate']);
Route::get('/author/{authorId}/books', [\App\Http\Controllers\BookController::class, 'findByAuthor']);
Route::get('/genre/{genreId}/books', [\App\Http\Controllers\BookController::class, 'findByGenre']);

Route::get('/book-copies', [\App\Http\Controllers\BookCopyController::class, 'index']);
Route::get('/books/{bookId}/copies', [\App\Http\Controllers\BookCopyController::class, 'findCopiesByBook']);

Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\UserController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\UserController::class, 'logout']);
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'editProfilePhoto']);
    Route::get('/members', [\App\Http\Controllers\UserController::class, 'members']);

    Route::get('/lends', [\App\Http\Controllers\LendController::class, 'index']);
    Route::get('/users/{userId}/lends', [\App\Http\Controllers\LendController::class, 'findLendsByUser']);
    Route::get('/lends/status/{status}', [\App\Http\Controllers\LendController::class, 'findLendsByStatus']);
    Route::post('/lends', [\App\Http\Controllers\LendController::class, 'store'])->middleware('role:admin');
    Route::delete('/lends/{id}', [\App\Http\Controllers\LendController::class, 'destroy'])->middleware('role:admin');;
    Route::patch('/lends/{id}/return', [\App\Http\Controllers\LendController::class, 'markAsReturned'])->middleware('role:admin');;

    Route::post('/book-copies', [\App\Http\Controllers\BookCopyController::class, 'store'])->middleware('role:admin');;
    Route::delete('/book-copies/{id}', [\App\Http\Controllers\BookCopyController::class, 'destroy'])->middleware('role:admin');;
    Route::patch('/book-copies/{id}/status', [\App\Http\Controllers\BookCopyController::class, 'changeStatus'])->middleware('role:admin');;

    Route::get('/available-book-copies', [\App\Http\Controllers\BookCopyController::class, 'availableBookCopies']);
    Route::get('/book-copies-per-status', [\App\Http\Controllers\BookCopyController::class, 'bookCopyPerStatus']);

    Route::post('/books', [\App\Http\Controllers\BookController::class, 'store'])->middleware('role:admin');;
    Route::delete('/books/{id}', [\App\Http\Controllers\BookController::class, 'destroy'])->middleware('role:admin');;

});
