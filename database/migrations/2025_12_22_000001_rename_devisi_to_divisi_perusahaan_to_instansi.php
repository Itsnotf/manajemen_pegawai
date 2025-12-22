<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Rename perusahaans table to instansis
        Schema::rename('perusahaans', 'instansis');
        
        // Rename devisis table to divisis
        Schema::rename('devisis', 'divisis');
        
        // Update pegawais table
        Schema::table('pegawais', function (Blueprint $table) {
            $table->renameColumn('perusahaan_id', 'instansi_id');
            $table->renameColumn('devisi_id', 'divisi_id');
        });
        
        // Update divisis table
        Schema::table('divisis', function (Blueprint $table) {
            $table->renameColumn('perusahaan_id', 'instansi_id');
            $table->renameColumn('nama_devisi', 'nama_divisi');
        });
        
        // Update instansis table
        Schema::table('instansis', function (Blueprint $table) {
            $table->renameColumn('nama_perusahaan', 'nama_instansi');
            $table->renameColumn('alamat_perusahaan', 'alamat_instansi');
        });
        
        // Update jabatans table
        Schema::table('jabatans', function (Blueprint $table) {
            $table->renameColumn('devisi_id', 'divisi_id');
        });
        
        // Update pribadis table - may not have perusahaan_id, but if it does
        if (Schema::hasColumn('pribadis', 'perusahaan_id')) {
            Schema::table('pribadis', function (Blueprint $table) {
                $table->renameColumn('perusahaan_id', 'instansi_id');
            });
        }
        
        // Update dokumens table - may not have perusahaan_id, but if it does
        if (Schema::hasColumn('dokumens', 'perusahaan_id')) {
            Schema::table('dokumens', function (Blueprint $table) {
                $table->renameColumn('perusahaan_id', 'instansi_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse order
        if (Schema::hasColumn('dokumens', 'instansi_id')) {
            Schema::table('dokumens', function (Blueprint $table) {
                $table->renameColumn('instansi_id', 'perusahaan_id');
            });
        }
        
        if (Schema::hasColumn('pribadis', 'instansi_id')) {
            Schema::table('pribadis', function (Blueprint $table) {
                $table->renameColumn('instansi_id', 'perusahaan_id');
            });
        }
        
        Schema::table('jabatans', function (Blueprint $table) {
            $table->renameColumn('divisi_id', 'devisi_id');
        });
        
        Schema::table('instansis', function (Blueprint $table) {
            $table->renameColumn('nama_instansi', 'nama_perusahaan');
            $table->renameColumn('alamat_instansi', 'alamat_perusahaan');
        });
        
        Schema::table('divisis', function (Blueprint $table) {
            $table->renameColumn('instansi_id', 'perusahaan_id');
            $table->renameColumn('nama_divisi', 'nama_devisi');
        });
        
        Schema::table('pegawais', function (Blueprint $table) {
            $table->renameColumn('instansi_id', 'perusahaan_id');
            $table->renameColumn('divisi_id', 'devisi_id');
        });
        
        Schema::rename('divisis', 'devisis');
        Schema::rename('instansis', 'perusahaans');
    }
};
