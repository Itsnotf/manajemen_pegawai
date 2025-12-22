import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout-perusahaan";
import { Head, Form, Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { BreadcrumbItem, Pegawai, Pribadi } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    pegawai: Pegawai,
    pribadi: Pribadi
}

export default function PegawaiPribadiPage({ pegawai, pribadi }: Props) {
    const isEdit = Boolean(pribadi);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: pegawai.perusahaan?.nama_perusahaan ?? "Perusahaan",
            href: `/dashboard-perusahaan/${pegawai.perusahaan?.id}`,
        },
        {
            title: 'Pegawai',
            href: `/dashboard-perusahaan/${pegawai.perusahaan?.id}/pegawai`,
        },
        {
            title: 'Pribadi',
            href: `/dashboard-perusahaan/${pegawai.perusahaan?.id}/pegawai/${pegawai.id}/pribadi`,
        },
    ];

    const [agama, setAgama] = useState(pribadi?.agama || "")
    const [status, setStatus] = useState(pribadi?.status_pernikahan || "")

    return (
        <AppLayout perusahaanId={pegawai.perusahaan_id} breadcrumbs={breadcrumbs}>
            <Head title="Data Pribadi Pegawai" />

            <div className="p-6">
                <Form
                    method={isEdit ? "put" : "post"}
                    action={`/dashboard-perusahaan/${pegawai.perusahaan_id}/pegawai/${pegawai.id}/pribadi`}
                    className="space-y-8"
                >
                    {({ processing, errors }) => (
                        <>

                            {!isEdit && (
                                <input type="hidden" name="pegawai_id" value={pegawai.id} />
                            )}

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Nama Lengkap */}
                                <div className="grid gap-2">
                                    <Label>Nama Lengkap</Label>
                                    <Input
                                        name="nama_lengkap"
                                        defaultValue={pribadi?.nama_lengkap}
                                        required
                                        placeholder="Nama lengkap"
                                    />
                                    <InputError message={errors.nama_lengkap} />
                                </div>

                                {/* NIK */}
                                <div className="grid gap-2">
                                    <Label>NIK</Label>
                                    <Input
                                        name="nik"
                                        type="number"
                                        defaultValue={pribadi?.nik}
                                        required
                                        placeholder="NIK (16 digit)"
                                    />
                                    <InputError message={errors.nik} />
                                </div>

                                {/* Tempat Lahir */}
                                <div className="grid gap-2">
                                    <Label>Tempat Lahir</Label>
                                    <Input
                                        name="tempat_lahir"
                                        defaultValue={pribadi?.tempat_lahir}
                                        required
                                        placeholder="Tempat lahir"
                                    />
                                    <InputError message={errors.tempat_lahir} />
                                </div>

                                {/* Tanggal Lahir */}
                                <div className="grid gap-2">
                                    <Label>Tanggal Lahir</Label>
                                    <Input
                                        name="tanggal_lahir"
                                        type="date"
                                        defaultValue={pribadi?.tanggal_lahir}
                                        required
                                    />
                                    <InputError message={errors.tanggal_lahir} />
                                </div>

                                {/* Agama */}
                                <div className="grid gap-2">
                                    <Label>Agama</Label>
                                    <Select
                                        name="agama"
                                        required
                                        value={agama}
                                        onValueChange={(value) => setAgama(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Agama" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value='islam'>Islam</SelectItem>
                                            <SelectItem value='protestan'>Protestan</SelectItem>
                                            <SelectItem value='khatolik'>Khatolik</SelectItem>
                                            <SelectItem value='hindu'>Hindu</SelectItem>
                                            <SelectItem value='budha'>Budha</SelectItem>
                                            <SelectItem value='konghucu'>Konghucu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.agama} />
                                </div>

                                {/* Status Pernikahan */}
                                <div className="grid gap-2">
                                    <Label>Status Pernikahan</Label>
                                    <Select
                                        name="status_pernikahan"
                                        required
                                        value={status}
                                        onValueChange={(value) => setStatus(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value='singel'>Singel</SelectItem>
                                            <SelectItem value='menikah'>Menikah</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status_pernikahan} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Telepon</Label>
                                    <Input
                                        name="telepon"
                                        type="number"
                                        defaultValue={pribadi?.telepon}
                                        required
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    <InputError message={errors.telepon} />
                                </div>

                                {/* Alamat */}
                                <div className="grid gap-2 md:col-span-2">
                                    <Label>Alamat</Label>
                                    <Textarea
                                        id="alamat"
                                        name="alamat"
                                        defaultValue={pribadi?.alamat}
                                        placeholder="Masukkan alamat perusahaan"
                                        className='min-h-36'
                                    />
                                    <InputError message={errors.alamat} />
                                </div>
                            </div>

                            {/* Submit + Back */}
                            <div className="flex items-center gap-4">
                                <Button type="submit" className="w-fit">
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Saving...
                                        </>
                                    ) : isEdit ? (
                                        "Update Data"
                                    ) : (
                                        "Save Data"
                                    )}
                                </Button>

                                <Link href={`/dashboard-perusahaan/${pegawai.perusahaan_id}/pegawai`}>
                                    <Button variant="outline">Back</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
