import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Divisi, Jabatan, Pegawai, Instansi } from '@/types';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store, update } from '@/routes/perusahaan/dashboard/pegawai';
import { useState } from 'react';


interface Props {
    instansi: Instansi
    divisis: Divisi[];
    jabatans: Jabatan[];
    pegawai: Pegawai;
}


export default function PegawaiEditPage({ instansi, divisis, jabatans, pegawai }: Props) {
    const [selectedDivisi, setSelectedDivisi] = useState(pegawai.divisi_id);
    const [selectedJabatan, setSelectedJabatan] = useState(pegawai.jabatan_id);
    const [selectedTipe, setSelectedTipe] = useState(pegawai.tipe_pegawai);

    const filteredJabatans = jabatans.filter(
        (jabatan) => jabatan.divisi_id.toString() === selectedDivisi.toString()
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
        {
            title: 'Pegawai',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai`,
        },
        {
            title: 'Edit',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai/edit`,
        },
    ];





    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Pegawai" />
            <Form
                {...update.form({ perusahaanId: instansi.id, pegawaiId: pegawai.id })}
                disableWhileProcessing
                className="flex flex-col gap-6 p-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nama_pegawai">Nama Pegawai</Label>
                                <Input
                                    id="nama_pegawai"
                                    type="text"
                                    required
                                    autoFocus
                                    defaultValue={pegawai.nama_pegawai}
                                    tabIndex={1}
                                    autoComplete="nama_pegawai"
                                    name="nama_pegawai"
                                    placeholder="Nama Pegawai"
                                />
                                <InputError
                                    message={errors.nama_pegawai}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nip">NIP</Label>
                                <Input
                                    id="nip"
                                    type="number"
                                    required
                                    autoFocus
                                    defaultValue={pegawai.nip}
                                    maxLength={16}
                                    tabIndex={1}
                                    autoComplete="nip"
                                    name="nip"
                                    placeholder="NIP"
                                />
                                <InputError
                                    message={errors.nip}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="divisi_id">Divisi</Label>
                                <Select
                                    name="divisi_id"
                                    required
                                    value={selectedDivisi.toString()}
                                    onValueChange={(value) => {
                                        setSelectedDivisi(value);
                                        setSelectedJabatan(""); // Reset jabatan ketika divisi berubah
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Divisi" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {divisis.map((divisi) => (
                                            <SelectItem key={divisi.id} value={divisi.id.toString()}>
                                                {divisi.nama_divisi}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.divisi_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="jabatan_id">Jabatan</Label>
                                <Select
                                    name="jabatan_id"
                                    required
                                    value={selectedJabatan.toString()}
                                    onValueChange={(value) => setSelectedJabatan(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Jabatan" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {filteredJabatans.map((jabatan) => (
                                            <SelectItem key={jabatan.id} value={jabatan.id.toString()}>
                                                {jabatan.nama_jabatan}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.jabatan_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="tipe_pegawai">Tipe Pegawai</Label>
                                <Select
                                    name="tipe_pegawai"
                                    required
                                    value={selectedTipe}
                                    onValueChange={(value) => setSelectedTipe(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Tipe Pegawai" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value='magang'>Magang</SelectItem>
                                        <SelectItem value='tetap'>Tetap</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.tipe_pegawai} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="golongan">Golongan</Label>
                                <Input
                                    id="golongan"
                                    type="text"
                                    tabIndex={1}
                                    defaultValue={pegawai.golongan}
                                    autoComplete="golongan"
                                    name="golongan"
                                    placeholder="Contoh: I/A, II/B, III/C"
                                />
                                <InputError
                                    message={errors.golongan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Foto Pegawai </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => console.log(e.target.files?.[0])}
                                />
                                <InputError message={errors.image} />
                            </div>



                            <div className='space-x-2'>
                                <Button type="submit" className="mt-2 w-fit">
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Pegawai'
                                    )}
                                </Button>
                                <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai`}>
                                    <Button variant='outline' type="button" className="mt-2 w-fit">
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </AppLayout>
    );
}
