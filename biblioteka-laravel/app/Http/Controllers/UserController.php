<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends ResponseController
{
    //login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error.',422,  $validator->errors());
        }

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->success([
                'token' => $token,
                'user' => new UserResource(
                    $user
                )
            ], 'User logged in successfully.');
        } else {
            return $this->error('Unauthorized',401, ['error' => 'Invalid credentials']);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success(null, 'User logged out successfully.');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phoneNumber' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error.',422,  $validator->errors());
        }

        $data = $request->only('name', 'email', 'password', 'phoneNumber', 'address', 'date_of_birth');
        $data['password'] = bcrypt($data['password']);
        $data['role'] = 'member';
        $data['profile_photo_path'] = 'https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg';
        $user = \App\Models\User::create($data);

        return $this->success(new UserResource($user), 'User registered successfully.', 201);
    }

    public function editProfilePhoto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'photo_file' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error.',422,  $validator->errors());
        }

        $user = $request->user();
        $slika = $request->file('photo_file');
        $slikaIme = time() . '.' . $slika->getClientOriginalExtension();
        $slika->move(public_path('profile_photos'), $slikaIme);
        $imageUrl = url('profile_photos/' . $slikaIme);

        $user->profile_photo_path = $imageUrl;
        $user->save();

        return $this->success(new UserResource($user), 'Profile photo updated successfully.');
    }

    public function members(Request $request)
    {

        $members = \App\Models\User::where('role', 'member')->get();
        return $this->success(
            UserResource::collection($members),
            'Members retrieved successfully'
        );
    }
}
