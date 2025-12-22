<?php

namespace App\Http\Controllers;

use App\Http\Requests\PerusahaanRequest\StoreRequest;
use App\Http\Requests\PerusahaanRequest\UpdateRequest;
use App\Models\Perusahaan;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class PerusahaanController extends Controller implements HasMiddleware
{

     public static function middleware()
    {
        return [
            new Middleware('permission:perusahaan index', only: ['index']),
            new Middleware('permission:perusahaan create', only: ['create', 'store']),
            new Middleware('permission:perusahaan edit', only: ['edit', 'update']),
            new Middleware('permission:perusahaan delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perusahaans = Instansi::when($request->search, function ($query, $search) {
                $query->where('nama_instansi', 'like', "%{$search}%")
                    ->orWhere('alamat_instansi', 'like', "%{$search}%");
            })
            ->paginate(8)
            ->withQueryString();

        return inertia('perusahaan/index', [
            'perusahaans' => $perusahaans,
            'filters' => $request->only('search'),
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("perusahaan/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        Instansi::create($request->validated());

        return redirect()->route('perusahaan.index')->with('success', 'Instansi created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Instansi $perusahaan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $perusahaan = Instansi::findOrFail($id);

        return Inertia::render('perusahaan/edit', [
            'perusahaans' => $perusahaan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $perusahaan = Instansi::findOrFail($id);
        $perusahaan->update($request->validated());

        return redirect()->route('perusahaan.index')->with('success', 'Instansi updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $perusahaan = Instansi::findOrFail($id);
        $perusahaan->delete();

        return redirect()->route('perusahaan.index')->with('success', 'Perusahaan deleted successfully.');
    }
}
