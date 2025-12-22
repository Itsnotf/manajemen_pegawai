<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Alias for Divisi model - kept for backward compatibility
class Devisi extends Model
{
    protected $table = 'divisis';
    protected $guarded = ['id'];

    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }

    public function perusahaan()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }

    public function jabatan(){
        return $this->hasMany(Jabatan::class, 'divisi_id');
    }

    public function pegawai()
    {
        return $this->hasMany(Pegawai::class, 'divisi_id');
    }
}
