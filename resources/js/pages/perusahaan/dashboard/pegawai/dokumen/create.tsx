import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Pegawai, Instansi } from '@/types';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/perusahaan/dashboard/pegawai/dokumen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    instansi: Instansi;
    pegawai: Pegawai;
}

export default function DokumenCreatePage({ instansi, pegawai }: Props) {
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
            title: pegawai.nama_pegawai,
            href: `/dashboard-perusahaan/${instansi.id}/pegawai`,
        },
        {
            title: 'Dokumen',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen`,
        },
        {
            title: 'Create',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen/create`,
        },
    ];

    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Tambah Dokumen" />

            <Card className="m-5">
                <CardHeader>
                    <CardTitle>Tambah Dokumen Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form
                        {...store.form({
                            perusahaanId: instansi.id,
                            pegawaiId: pegawai.id,
                        })}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    {/* Nama Dokumen */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="nama_dokumen">Nama Dokumen</Label>
                                        <Input
                                            id="nama_dokumen"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="nama_dokumen"
                                            name="nama_dokumen"
                                            placeholder="Contoh: Sertifikat, KTP, BPJS, dll"
                                        />
                                        <InputError
                                            message={errors.nama_dokumen}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* File Dokumen */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="file_dokumen">File Dokumen</Label>
                                        <Input
                                            id="file_dokumen"
                                            type="file"
                                            name="file_dokumen"
                                            accept="file/*"
                                            required
                                            tabIndex={2}
                                            onChange={(e) =>
                                                console.log(e.target.files?.[0])
                                            }
                                        />
                                        <p className="text-xs text-gray-500">
                                            Format yang diperbolehkan: PDF, JPG, JPEG, PNG (Max 2MB)
                                        </p>
                                        <InputError message={errors.file_dokumen} />
                                    </div>

                                    {/* Tombol */}
                                    <div className="flex space-x-2 mt-4">
                                        <Button type="submit" className="w-fit">
                                            {processing ? (
                                                <>
                                                    <Spinner className="mr-2" />
                                                    Creating...
                                                </>
                                            ) : (
                                                'Tambah Dokumen'
                                            )}
                                        </Button>
                                        <Link
                                            href={`/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen`}
                                        >
                                            <Button variant="outline" type="button" className="w-fit">
                                                Back
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
