<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Http\Requests\PribadiRequest\StoreRequest;
use App\Models\Pegawai;
use App\Models\Instansi;
use App\Models\Pribadi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PribadiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $perusahaanId, string $pegawaiId)
    {
        $pegawai = Pegawai::with('instansi')->findOrFail($pegawaiId);
        $pribadi = $pegawai->pribadi;
        $instansi = Instansi::findOrFail($perusahaanId);

        return Inertia::render('perusahaan/dashboard/pegawai/pribadi/index', [
            'pegawai' => $pegawai,
            'pribadi' => $pribadi,
            'perusahaan' => $instansi,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, $perusahaanId, $pegawaiId)
    {
        $pegawai = Pegawai::findOrFail($pegawaiId);

        Pribadi::create(array_merge(
            $request->validated(),
            ['pegawai_id' => $pegawai->id]
        ));

        return redirect()
            ->route('perusahaan.dashboard.pegawai', ['perusahaanId' => $pegawai->instansi_id])
            ->with('success', 'Data pribadi berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pribadi $pribadi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pribadi $pribadi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, $perusahaanId, $pegawaiId)
    {
        $pegawai = Pegawai::findOrFail($pegawaiId);
        $pribadi = $pegawai->pribadi;

        $pribadi->update($request->validated());

        return redirect()
            ->route('perusahaan.dashboard.pegawai', ['perusahaanId' => $pegawai->instansi_id])
            ->with('success', 'Data pribadi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pribadi $pribadi)
    {
        //
    }
}
