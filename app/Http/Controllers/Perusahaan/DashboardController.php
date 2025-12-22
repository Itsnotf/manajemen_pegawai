<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Models\Perusahaan;
use App\Models\Pegawai;
use App\Models\Devisi;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(string $perusahaanId)
    {
        $perusahaan = Perusahaan::findOrFail($perusahaanId);
        
        // Total Statistics
        $totalPegawai = Pegawai::where('perusahaan_id', $perusahaanId)->count();
        $totalDevisi = Devisi::where('perusahaan_id', $perusahaanId)->count();
        $totalJabatan = Jabatan::whereIn('devisi_id', Devisi::where('perusahaan_id', $perusahaanId)->pluck('id'))->count();
        
        // Pegawai by Type
        $pegawaiByType = Pegawai::where('perusahaan_id', $perusahaanId)
            ->selectRaw('tipe_pegawai, COUNT(*) as count')
            ->groupBy('tipe_pegawai')
            ->get();
        
        // Pegawai by Devisi
        $pegawaiByDevisi = Pegawai::where('perusahaan_id', $perusahaanId)
            ->with('devisi')
            ->selectRaw('devisi_id, COUNT(*) as count')
            ->groupBy('devisi_id')
            ->get()
            ->map(function($item) {
                return [
                    'devisi_name' => $item->devisi->nama_devisi ?? 'Unknown',
                    'count' => $item->count
                ];
            });
        
        // Recent Pegawai
        $recentPegawai = Pegawai::where('perusahaan_id', $perusahaanId)
            ->with('devisi', 'jabatan')
            ->latest()
            ->take(5)
            ->get();
        
        // Devisi with Pegawai count
        $devisiWithCount = Devisi::where('perusahaan_id', $perusahaanId)
            ->withCount('jabatan')
            ->get();

        return inertia('perusahaan/dashboard/index', [
            'perusahaan' => $perusahaan,
            'statistics' => [
                'totalPegawai' => $totalPegawai,
                'totalDevisi' => $totalDevisi,
                'totalJabatan' => $totalJabatan,
            ],
            'pegawaiByType' => $pegawaiByType,
            'pegawaiByDevisi' => $pegawaiByDevisi,
            'recentPegawai' => $recentPegawai,
            'devisiList' => $devisiWithCount,
        ]);
    }
}
