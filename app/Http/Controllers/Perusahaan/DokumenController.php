<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Http\Requests\DokumenRequest\StoreRequest;
use App\Http\Requests\DokumenRequest\UpdateRequest;
use App\Models\Dokumen;
use App\Models\Pegawai;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DokumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $perusahaanId, string $pegawaiId, Request $request)
    {
        $dokumens = Dokumen::with('pegawai')->where('pegawai_id', $pegawaiId)
            ->when($request->search, function ($query, $search) {
                $query->where('nama_dokumen', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();

        $pegawai = Pegawai::findOrFail($pegawaiId);
        $instansi = Instansi::findOrFail($perusahaanId);
        return inertia('perusahaan/dashboard/pegawai/dokumen/index', [
            'pegawai' => $pegawai,
            'dokumens' => $dokumens,
            'instansi' => $instansi,
            'filters' => $request->only('search'),
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $perusahaanId, string $pegawaiId)
    {
        $instansi = Instansi::findOrFail($perusahaanId);
        $pegawai = Pegawai::findOrFail($pegawaiId);
        return Inertia::render('perusahaan/dashboard/pegawai/dokumen/create', [
            'instansi' => $instansi,
            'pegawai' => $pegawai,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $perusahaanId, string $pegawaiId, StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('dokumen', 'public');
        }

        $data['pegawai_id'] = $pegawaiId;
        Dokumen::create($data);
        return redirect()
            ->route('perusahaan.dashboard.pegawai.dokumen', ['perusahaanId' => $perusahaanId, 'pegawaiId' => $pegawaiId])
            ->with('success', 'Dokumen created successfully.');
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
    public function edit(string $perusahaanId, string $pegawaiId, string $dokumenId)
    {
        $dokumen = Dokumen::findOrFail($dokumenId);
        $pegawai = Pegawai::findOrFail($pegawaiId);
        $instansi = Instansi::findOrFail($perusahaanId);

        return Inertia::render('perusahaan/dashboard/pegawai/dokumen/edit', [
            'instansi' => $instansi,
            'pegawai' => $pegawai,
            'dokumen' => $dokumen,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $perusahaanId, string $pegawaiId, string $dokumenId)
    {
        $dokumen = Dokumen::findOrFail($dokumenId);
        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($dokumen->file && Storage::disk('public')->exists($dokumen->file)) {
                Storage::disk('public')->delete($dokumen->file);
            }
            $data['file'] = $request->file('file')->store('dokumen', 'public');
        }

        $dokumen->update($data);

        return redirect()
            ->route('perusahaan.dashboard.pegawai.dokumen', ['perusahaanId' => $perusahaanId, 'pegawaiId' => $pegawaiId])
            ->with('success', 'Dokumen updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $perusahaanId, string $pegawaiId, string $dokumenId)
    {
        $dokumen = Dokumen::findOrFail($dokumenId);
        
        if ($dokumen->file && Storage::disk('public')->exists($dokumen->file)) {
            Storage::disk('public')->delete($dokumen->file);
        }
        
        $dokumen->delete();

        return redirect()->route('perusahaan.dashboard.pegawai.dokumen', ['perusahaanId' => $perusahaanId, 'pegawaiId' => $pegawaiId])->with('success', 'Dokumen deleted successfully.');
    }
}
