<?php

namespace App\Http\Requests\PribadiRequest;

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
            "pegawai_id"=> "required",
            "nama_lengkap" => "required|string|max:255",
            "tempat_lahir" => "required|string|max:255",
            "tanggal_lahir" => "required|date|date_format:Y-m-d",
            "agama" => "required|string|max:50",
            "status_pernikahan" => "required|string|max:20",
            "alamat" => "required|string|max:255",
            "telepon" => "required|string",
            "nik" => "required|string",
        ];
    }
}
