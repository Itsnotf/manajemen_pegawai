<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users index',
            'users create',
            'users edit',
            'users delete',
            'roles index',
            'roles create',
            'roles edit',
            'roles delete',
            'perusahaan index',
            'perusahaan create',
            'perusahaan edit',
            'perusahaan delete',
            'perusahaan dashboard',
            'devisi index',
            'devisi create',
            'devisi edit',
            'devisi delete',
            'jabatan index',
            'jabatan create',
            'jabatan edit',
            'jabatan delete',
            'pegawai index',
            'pegawai create',
            'pegawai edit',
            'pegawai delete',
            'pegawai pribadi',
            'dokumen index',
            'dokumen create',
            'dokumen edit',
            'dokumen delete',
        ];
        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission]);
        }
    }
}
