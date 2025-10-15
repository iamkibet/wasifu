<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@wasifu.com',
            'password' => 'password', // Let Laravel handle the hashing via the 'hashed' cast
            'role' => Role::ADMIN,
        ]);

        // Create normal user
        User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@wasifu.com',
            'password' => 'password', // Let Laravel handle the hashing via the 'hashed' cast
            'role' => Role::USER,
        ]);
    }
}
