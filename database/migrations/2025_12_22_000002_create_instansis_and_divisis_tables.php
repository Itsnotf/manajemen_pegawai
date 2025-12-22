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
        // Drop existing tables that depend on perusahaan and devisi
        Schema::dropIfExists('dokumens');
        Schema::dropIfExists('pribadis');
        Schema::dropIfExists('jabatans');
        Schema::dropIfExists('pegawais');
        Schema::dropIfExists('devisis');
        Schema::dropIfExists('perusahaans');

        // Create Instansi Table
        Schema::create('instansis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_instansi');
            $table->string('alamat_instansi');
            $table->string('email');
            $table->string('telepon');
            $table->timestamps();
        });

        // Create Divisi Table
        Schema::create('divisis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instansi_id')->constrained('instansis')->cascadeOnDelete();
            $table->string('nama_divisi');
            $table->timestamps();
        });

        // Create Jabatan Table
        Schema::create('jabatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('divisi_id')->constrained('divisis')->cascadeOnDelete();
            $table->string('nama_jabatan');
            $table->timestamps();
        });

        // Create Pegawai Table
        Schema::create('pegawais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instansi_id')->constrained('instansis')->cascadeOnDelete();
            $table->foreignId('divisi_id')->constrained('divisis')->cascadeOnDelete();
            $table->foreignId('jabatan_id')->constrained('jabatans')->cascadeOnDelete();
            $table->string('nama_pegawai');
            $table->string('image');
            $table->string('nip');
            $table->string('tipe_pegawai');
            $table->string('golongan')->nullable();
            $table->timestamps();
        });

        // Create Pribadi Table
        Schema::create('pribadis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais')->cascadeOnDelete();
            $table->foreignId('instansi_id')->constrained('instansis')->cascadeOnDelete();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('nama_lengkap')->nullable();
            $table->string('status_pernikahan')->nullable();
            $table->string('nik')->nullable();
            $table->string('telepon')->nullable();
            $table->string('agama')->nullable();
            $table->string('jenis_kelamin')->nullable();
            $table->string('alamat')->nullable();
            $table->timestamps();
        });

        // Create Dokumen Table
        Schema::create('dokumens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pegawai_id')->constrained('pegawais')->cascadeOnDelete();
            $table->foreignId('instansi_id')->constrained('instansis')->cascadeOnDelete();
            $table->string('nama_dokumen');
            $table->string('file_dokumen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumens');
        Schema::dropIfExists('pribadis');
        Schema::dropIfExists('pegawais');
        Schema::dropIfExists('jabatans');
        Schema::dropIfExists('divisis');
        Schema::dropIfExists('instansis');
    }
};
