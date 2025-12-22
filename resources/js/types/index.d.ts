import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    permissions: Permission[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    permissions?: string[];
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    [key: string]: boolean;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
}

export interface Perusahaan {
    id: number;
    nama_perusahaan: string;
    alamat_perusahaan: string;
    email: string;
    telepon: string;
    created_at: string;
    updated_at: string;
}

export interface Instansi {
    id: number;
    nama_instansi: string;
    alamat_instansi: string;
    email: string;
    telepon: string;
    created_at: string;
    updated_at: string;
}

export interface Divisi {
    id: number;
    instansi_id: string | number;
    nama_divisi: string;
    created_at: string;
    updated_at: string;
    instansi?: Instansi;
}

export interface Devisi {
    id: number;
    perusahaan_id: string | number;
    nama_divisi: string;
    created_at: string;
    updated_at: string;
    perusahaan?: Perusahaan;
}

export interface Jabatan {
    id: number;
    divisi_id: string | number;
    nama_jabatan: string;
    created_at: string;
    updated_at: string;
    divisi?: Divisi;
}

export interface Pegawai {
    id: number;
    nama_pegawai: string;
    instansi_id: string | number;
    divisi_id: string | number;
    jabatan_id: string | number;
    golongan: string;
    image: file | null;
    tipe_pegawai: string;
    nip: string;
    perusahaan_id?: string | number;
    perusahaan?: Perusahaan;
    instansi?: Instansi;
    divisi?: Divisi;
    jabatan?: Jabatan;
    created_at: string;
    updated_at: string;
}

export interface Pribadi {
    id: number;
    pegawai_id: string | number;
    nama_lengkap: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    status_pernikahan: string;
    alamat: string;
    telepon: string;
    created_at: string;
    updated_at: string;
}

export interface Dokumen {
    id: number;
    pegawai_id: string | number;
    nama_dokumen: string;
    file: string | null;
    created_at: string;
    updated_at: string;
    pegawai? : Pegawai
}