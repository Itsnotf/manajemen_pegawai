<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    protected $table = 'instansis';
    protected $guarded = ["id"];

    public function divisis()
    {
        return $this->hasMany(Divisi::class, 'instansi_id');
    }
}
