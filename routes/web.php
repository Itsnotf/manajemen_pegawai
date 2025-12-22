<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Perusahaan\DashboardController as PerusahaanDashboardController;
use App\Http\Controllers\Perusahaan\DevisiController;
use App\Http\Controllers\Perusahaan\DokumenController;
use App\Http\Controllers\Perusahaan\JabatanController;
use App\Http\Controllers\Perusahaan\PegawaiController;
use App\Http\Controllers\Perusahaan\PribadiController;
use App\Http\Controllers\PerusahaanController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
   return redirect('/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('dashboard-perusahaan/{perusahaanId}', [PerusahaanDashboardController::class, 'index'])->name('dashboard.perusahaan');

    Route::get('dashboard-perusahaan/{perusahaanId}/devisi', [DevisiController::class, 'index'])->name('perusahaan.dashboard.devisi');
    Route::get('dashboard-perusahaan/{perusahaanId}/devisi/create', [DevisiController::class, 'create'])->name('perusahaan.dashboard.devisi.create');
    Route::post('dashboard-perusahaan/{perusahaanId}/devisi/store', [DevisiController::class, 'store'])->name('perusahaan.dashboard.devisi.store');
    Route::get('dashboard-perusahaan/{perusahaanId}/devisi/{devisiId}/edit', [DevisiController::class, 'edit'])->name('perusahaan.dashboard.devisi.edit');
    Route::put('dashboard-perusahaan/{perusahaanId}/devisi/{devisiId}/update', [DevisiController::class, 'update'])->name('perusahaan.dashboard.devisi.update');
    Route::delete('dashboard-perusahaan/{perusahaanId}/devisi/{devisiId}/delete', [DevisiController::class, 'destroy'])->name('perusahaan.dashboard.devisi.delete');

    Route::get('dashboard-perusahaan/{perusahaanId}/jabatan', [JabatanController::class, 'index'])->name('perusahaan.dashboard.jabatan');
    Route::get('dashboard-perusahaan/{perusahaanId}/jabatan/create', [JabatanController::class, 'create'])->name('perusahaan.dashboard.jabatan.create');
    Route::post('dashboard-perusahaan/{perusahaanId}/jabatan/store', [JabatanController::class, 'store'])->name('perusahaan.dashboard.jabatan.store');
    Route::get('dashboard-perusahaan/{perusahaanId}/jabatan/{jabatanId}/edit', [JabatanController::class, 'edit'])->name('perusahaan.dashboard.jabatan.edit');
    Route::put('dashboard-perusahaan/{perusahaanId}/jabatan/{jabatanId}/update', [JabatanController::class, 'update'])->name('perusahaan.dashboard.jabatan.update');
    Route::delete('dashboard-perusahaan/{perusahaanId}/jabatan/{jabatanId}/delete', [JabatanController::class, 'destroy'])->name('perusahaan.dashboard.jabatan.delete');

    Route::get('dashboard-perusahaan/{perusahaanId}/pegawai', [PegawaiController::class, 'index'])->name('perusahaan.dashboard.pegawai');
    Route::get('dashboard-perusahaan/{perusahaanId}/pegawai/create', [PegawaiController::class, 'create'])->name('perusahaan.dashboard.pegawai.create');
    Route::post('dashboard-perusahaan/{perusahaanId}/pegawai/store', [PegawaiController::class, 'store'])->name('perusahaan.dashboard.pegawai.store');
    Route::get('dashboard-perusahaan/{perusahaanId}/pegawai/{pegawaiId}/edit', [PegawaiController::class, 'edit'])->name('perusahaan.dashboard.pegawai.edit');
    Route::put('dashboard-perusahaan/{perusahaanId}/pegawai/{pegawaiId}/update', [PegawaiController::class, 'update'])->name('perusahaan.dashboard.pegawai.update');
    Route::delete('dashboard-perusahaan/{perusahaanId}/pegawai/{pegawaiId}/delete', [PegawaiController::class, 'destroy'])->name('perusahaan.dashboard.pegawai.delete');

    Route::prefix('dashboard-perusahaan/{perusahaanId}/pegawai/{pegawaiId}')->group(function () {
        Route::get('/pribadi', [PribadiController::class, 'index'])->name('perusahaan.dashboard.pribadi');
        Route::post('/pribadi', [PribadiController::class, 'store'])->name('perusahaan.dashboard.pribadi.store');
        Route::put('/pribadi', [PribadiController::class, 'update'])->name('perusahaan.dashboard.pribadi.update');
    });
    
    Route::prefix('dashboard-perusahaan/{perusahaanId}/pegawai/{pegawaiId}')->group(function () {
        Route::get('/dokumen', [DokumenController::class, 'index'])->name('perusahaan.dashboard.pegawai.dokumen');
        Route::get('/dokumen/create', [DokumenController::class, 'create'])->name('perusahaan.dashboard.pegawai.dokumen.create');
        Route::get('/dokumen/{dokumenId}/edit', [DokumenController::class, 'edit'])->name('perusahaan.dashboard.pegawai.dokumen.edit');
        Route::post('/dokumen', [DokumenController::class, 'store'])->name('perusahaan.dashboard.pegawai.dokumen.store');
        Route::put('/dokumen/{dokumenId}', [DokumenController::class, 'update'])->name('perusahaan.dashboard.pegawai.dokumen.update');
        Route::delete('/dokumen/{dokumenId}/delete', [DokumenController::class, 'destroy'])->name('perusahaan.dashboard.pegawai.dokumen.destroy');
    });



    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('perusahaan', PerusahaanController::class);
});

require __DIR__ . '/settings.php';
