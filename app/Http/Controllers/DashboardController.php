<?php

namespace App\Http\Controllers;

use App\Models\Instansi;
use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Total Statistics
        $totalInstansi = Instansi::count();
        $totalPegawai = Pegawai::count();
        $totalUser = User::count();

        // Instansi with division count
        $instansiList = Instansi::withCount('divisis')
            ->get()
            ->map(function ($instansi) {
                return [
                    'id' => $instansi->id,
                    'nama_instansi' => $instansi->nama_instansi,
                    'alamat_instansi' => $instansi->alamat_instansi,
                    'email' => $instansi->email,
                    'telepon' => $instansi->telepon,
                    'divisis_count' => $instansi->divisis_count,
                    'pegawai_count' => Pegawai::where('instansi_id', $instansi->id)->count(),
                ];
            });

        // Recent Instansi
        $recentInstansi = Instansi::latest()
            ->take(5)
            ->withCount('divisis')
            ->get()
            ->map(function ($instansi) {
                return [
                    'id' => $instansi->id,
                    'nama_instansi' => $instansi->nama_instansi,
                    'email' => $instansi->email,
                    'telepon' => $instansi->telepon,
                    'divisis_count' => $instansi->divisis_count,
                    'pegawai_count' => Pegawai::where('instansi_id', $instansi->id)->count(),
                    'created_at' => $instansi->created_at,
                ];
            });

        // Top Instansi by Pegawai Count
        $topInstansi = Instansi::get()
            ->map(function ($instansi) {
                return [
                    'nama_instansi' => $instansi->nama_instansi,
                    'pegawai_count' => Pegawai::where('instansi_id', $instansi->id)->count(),
                ];
            })
            ->sortByDesc('pegawai_count')
            ->take(5)
            ->values();

        return inertia('dashboard', [
            'statistics' => [
                'totalInstansi' => $totalInstansi,
                'totalPegawai' => $totalPegawai,
                'totalUser' => $totalUser,
            ],
            'perusahaanList' => $instansiList,
            'recentPerusahaan' => $recentInstansi,
            'topPerusahaan' => $topInstansi,
        ]);
    }
}
