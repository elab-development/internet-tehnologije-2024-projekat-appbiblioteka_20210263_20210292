<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultImagePath = 'https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg';

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'phoneNumber' => '1234567890',
            'address' => '123 Admin St, Admin City, Admin Country',
            'date_of_birth' => '1990-01-01',
            'profile_photo_path' => $defaultImagePath,
        ]);

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => bcrypt('password'),
                'role' => 'member',
                'phoneNumber' => $faker->phoneNumber(),
                'address' => $faker->address(),
                'date_of_birth' => $faker->date(),
                'profile_photo_path' => $defaultImagePath,
            ]);
        }
    }
}
