<?php

namespace App\Http\Controllers\Perusahaan;

use App\Http\Controllers\Controller;
use App\Http\Requests\DevisiRequest\StoreRequest;
use App\Http\Requests\DevisiRequest\UpdateRequest;
use App\Models\Divisi;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class DevisiController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('permission:devisi index', only: ['index']),
            new Middleware('permission:devisi create', only: ['create', 'store']),
            new Middleware('permission:devisi edit', only: ['edit', 'update   ']),
            new Middleware('permission:devisi delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $perusahaanId, Request $request)
    {
        $divisis = Divisi::with('instansi')->where('instansi_id', $perusahaanId)
            ->when($request->search, function ($query, $search) {
                $query->where('nama_divisi', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();

        $instansi = Instansi::findOrFail($perusahaanId);
        return inertia('perusahaan/dashboard/devisi/index', [
            'divisis' => $divisis,
            'perusahaanId' => $perusahaanId,
            'filters' => $request->only('search'),
            'flash' => [
                'success' => session('success'),
            ],
            'instansi' => $instansi
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $perusahaanId)
    {
        $instansi = Instansi::findOrFail($perusahaanId);
        return Inertia::render('perusahaan/dashboard/devisi/create', [
            'instansi' => $instansi
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $perusahaanId, StoreRequest $request)
    {
        Divisi::create([
            'nama_divisi' => $request->nama_divisi,
            'instansi_id' => $perusahaanId,
        ]);
        return redirect()->route('perusahaan.dashboard.devisi', ['perusahaanId' => $perusahaanId])->with('success', 'Divisi created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Divisi $devisi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $perusahaanId, string $devisiId)
    {
        $devisi = Divisi::with('instansi')->findOrFail($devisiId);
        return Inertia::render('perusahaan/dashboard/devisi/edit', [
            'divisi' => $devisi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $perusahaanId, string $devisiId)
    {
        $devisi = Divisi::findOrFail($devisiId);
        $devisi->update($request->validated());
        return redirect()->route('perusahaan.dashboard.devisi', ['perusahaanId' => $perusahaanId])->with('success', 'Divisi updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $perusahaanId, string $devisiId)
    {
        $devisi = Divisi::findOrFail($devisiId);
        $devisi->delete();

        return redirect()->route('perusahaan.dashboard.devisi', ['perusahaanId' => $perusahaanId,])->with('success', 'Divisi deleted successfully.');
    }
}
