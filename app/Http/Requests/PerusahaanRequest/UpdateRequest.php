<?php

namespace App\Http\Requests\PerusahaanRequest;

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
            "nama_perusahaan" => "required_without:nama_instansi|string|max:255",
            "nama_instansi" => "required_without:nama_perusahaan|string|max:255",
            "alamat_perusahaan" => "required_without:alamat_instansi|string|max:255",
            "alamat_instansi" => "required_without:alamat_perusahaan|string|max:255",
            "email" => "required|email|max:255",
            "telepon" => "required",
        ];
    }
}
