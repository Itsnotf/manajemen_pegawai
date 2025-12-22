<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Http\Requests\JabataRequest\StoreRequest;
use App\Http\Requests\JabataRequest\UpdateRequest;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class JabatanController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('permission:jabatan index', only: ['index']),
            new Middleware('permission:jabatan create', only: ['create', 'store']),
            new Middleware('permission:jabatan edit', only: ['edit', 'update   ']),
            new Middleware('permission:jabatan delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $perusahaanId, Request $request)
    {
        $jabatans = Jabatan::with('divisi')
            ->whereHas('divisi', function ($query) use ($perusahaanId) {
                $query->where('instansi_id', $perusahaanId);
            })
            ->when($request->search, function ($query, $search) {
                $query->where('nama_jabatan', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();


        $instansi = Instansi::findOrFail($perusahaanId);
        return inertia('perusahaan/dashboard/jabatan/index', [
            'jabatans' => $jabatans,
            'perusahaan' => $instansi,
            'filters' => $request->only('search'),
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $perusahaanId)
    {
        $divisis = Divisi::where('instansi_id', $perusahaanId)->get();
        $instansi = Instansi::findOrFail($perusahaanId);
        return Inertia::render('perusahaan/dashboard/jabatan/create', [
            'perusahaan' => $instansi,
            'devisis' => $divisis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $perusahaanId, StoreRequest $request)
    {
        Jabatan::create($request->validated());
        return redirect()->route('perusahaan.dashboard.jabatan', ['perusahaanId' => $perusahaanId])->with('success', 'Jabatan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $perusahaanId, string $jabatanId)
    {
        $jabatan = Jabatan::findOrFail($jabatanId);
        $divisis = Divisi::where('instansi_id', $perusahaanId)->get();
        $instansi = Instansi::findOrFail($perusahaanId);
        return Inertia::render('perusahaan/dashboard/jabatan/edit', [
            'devisis' => $divisis,
            'perusahaan' => $instansi,
            'jabatan' => $jabatan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $perusahaanId, string $jabatanId)
    {
        $jabatan = Jabatan::findOrFail($jabatanId);
        $jabatan->update($request->validated());
        return redirect()->route('perusahaan.dashboard.jabatan', ['perusahaanId' => $perusahaanId])->with('success', 'Devisi updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $perusahaanId, string $jabatanId)
    {
        $jabatan = Jabatan::findOrFail($jabatanId);
        $jabatan->delete();

        return redirect()->route('perusahaan.dashboard.jabatan', ['perusahaanId' => $perusahaanId,])->with('success', 'Devisi deleted successfully.');
    }
}
