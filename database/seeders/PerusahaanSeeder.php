<?php

namespace Database\Seeders;

use App\Models\Instansi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerusahaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Instansi::create([
            'nama_instansi' => 'PT INDO BAHAGIA',
            'alamat_instansi' => 'Pelembang',
            'telepon' => '081122223333',
            'email' => 'indobahagia@gmail.com'
        ]);
    }
}
    