<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    protected $guarded = ['id'];


    public function divisi()
    {
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }

    public function devisi()
    {
        return $this->belongsTo(Devisi::class, 'divisi_id');
    }
}
