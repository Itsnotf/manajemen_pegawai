<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Alias for Instansi model - kept for backward compatibility
class Perusahaan extends Instansi
{
    protected $table = 'instansis';
}
}
