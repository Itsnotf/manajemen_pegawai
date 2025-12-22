<?php

namespace App\Http\Requests\PegawaiRequest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "devisi_id"     => "required|exists:divisis,id",
            "jabatan_id"    => "required|exists:jabatans,id",
            "nama_pegawai"  => "required|string|max:255",
            "nip"           => "required|digits_between:8,16",
            "image"         => "nullable|image|mimes:jpg,jpeg,png|max:2048",
            "tipe_pegawai"  => "required|string",
            "golongan"      => "nullable|string|max:255",
        ];
    }
}
