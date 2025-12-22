<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $guarded = ['id'];

    public function perusahaan()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }

    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'instansi_id');
    }

    public function divisi()
    {
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }

    public function pribadi()
    {
        return $this->hasOne(Pribadi::class);
    }

    public function dokumen()
    {
        return $this->hasMany(Dokumen::class);
    }
}
