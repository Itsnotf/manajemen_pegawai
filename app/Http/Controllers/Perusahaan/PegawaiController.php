<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Http\Requests\PegawaiRequest\StoreRequest;
use App\Http\Requests\PegawaiRequest\UpdateRequest;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\Pegawai;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PegawaiController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:pegawai index', only: ['index']),
            new Middleware('permission:pegawai create', only: ['create', 'store']),
            new Middleware('permission:pegawai edit', only: ['edit', 'update   ']),
            new Middleware('permission:pegawai delete', only: ['destroy']),
        ];
    }


    /**
     * Display a listing of the resource.
     */
    public function index(string $perusahaanId, Request $request)
    {
        $pegawais = Pegawai::with('divisi', 'jabatan', 'instansi')
            ->where('instansi_id', $perusahaanId)
            ->when($request->search, function ($query, $search) {
                $query->where('nama_pegawai', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();


        $instansi = Instansi::findOrFail($perusahaanId);
        return inertia('perusahaan/dashboard/pegawai/index', [
            'pegawais' => $pegawais,
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
        $divisiIds = $divisis->pluck('id');
        $jabatan = Jabatan::whereIn('divisi_id', $divisiIds)->get();
        $instansi = Instansi::findOrFail($perusahaanId);

        return Inertia::render('perusahaan/dashboard/pegawai/create', [
            'perusahaan' => $instansi,
            'devisis' => $divisis,
            'jabatans' => $jabatan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $perusahaanId, StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('pegawai', 'public');
            // hasil contoh: pegawai/Ma87hs8asD9s.png
        }

        $data['instansi_id'] = $perusahaanId;
        Pegawai::create($data);
        return redirect()
            ->route('perusahaan.dashboard.pegawai', ['perusahaanId' => $perusahaanId])
            ->with('success', 'Pegawai created successfully.');
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
    public function edit(string $perusahaanId, string $pegawaiId)
    {
        $divisis = Divisi::where('instansi_id', $perusahaanId)->get();
        $divisiIds = $divisis->pluck('id');
        $jabatan = Jabatan::whereIn('divisi_id', $divisiIds)->get();
        $instansi = Instansi::findOrFail($perusahaanId);
        $pegawai = Pegawai::findOrFail($pegawaiId);

        return Inertia::render('perusahaan/dashboard/pegawai/edit', [
            'perusahaan' => $instansi,
            'devisis' => $divisis,
            'jabatans' => $jabatan,
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $perusahaanId, string $pegawaiId)
    {
        $pegawai = Pegawai::findOrFail($pegawaiId);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($pegawai->image && Storage::disk('public')->exists($pegawai->image)) {
                Storage::disk('public')->delete($pegawai->image);
            }
            $data['image'] = $request->file('image')->store('pegawai', 'public');
        }

        $pegawai->update($data);

        return redirect()
            ->route('perusahaan.dashboard.pegawai', ['perusahaanId' => $perusahaanId])
            ->with('success', 'Pegawai updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $perusahaanId, string $pegawaiId)
    {
        $pegawai = Pegawai::findOrFail($pegawaiId);
        $pegawai->delete();

        return redirect()->route('perusahaan.dashboard.pegawai', ['perusahaanId' => $perusahaanId,])->with('success', 'Pegawai deleted successfully.');
    }
}
