<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Models\Instansi;
use App\Models\Pegawai;
use App\Models\Divisi;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(string $perusahaanId)
    {
        $instansi = Instansi::findOrFail($perusahaanId);
        
        // Total Statistics
        $totalPegawai = Pegawai::where('instansi_id', $perusahaanId)->count();
        $totalDivisi = Divisi::where('instansi_id', $perusahaanId)->count();
        $totalJabatan = Jabatan::whereIn('divisi_id', Divisi::where('instansi_id', $perusahaanId)->pluck('id'))->count();
        
        // Pegawai by Type
        $pegawaiByType = Pegawai::where('instansi_id', $perusahaanId)
            ->selectRaw('tipe_pegawai, COUNT(*) as count')
            ->groupBy('tipe_pegawai')
            ->get();
        
        // Pegawai by Divisi
        $pegawaiByDivisi = Pegawai::where('instansi_id', $perusahaanId)
            ->with('divisi')
            ->selectRaw('divisi_id, COUNT(*) as count')
            ->groupBy('divisi_id')
            ->get()
            ->map(function($item) {
                return [
                    'divisi_name' => $item->divisi->nama_divisi ?? 'Unknown',
                    'count' => $item->count
                ];
            });
        
        // Recent Pegawai
        $recentPegawai = Pegawai::where('instansi_id', $perusahaanId)
            ->with('divisi', 'jabatan')
            ->latest()
            ->take(5)
            ->get();
        
        // Divisi with Pegawai count
        $divisiWithCount = Divisi::where('instansi_id', $perusahaanId)
            ->withCount('jabatan')
            ->get();

        return inertia('perusahaan/dashboard/index', [
            'instansi' => $instansi,
            'statistics' => [
                'totalPegawai' => $totalPegawai,
                'totalDevisi' => $totalDivisi,
                'totalJabatan' => $totalJabatan,
            ],
            'pegawaiByType' => $pegawaiByType,
            'pegawaiByDevisi' => $pegawaiByDivisi,
            'recentPegawai' => $recentPegawai,
            'devisiList' => $divisiWithCount,
        ]);
    }
}
