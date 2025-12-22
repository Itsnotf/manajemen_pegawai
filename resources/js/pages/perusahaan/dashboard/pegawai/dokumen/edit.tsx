import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Dokumen, Pegawai, Perusahaan } from '@/types';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/perusahaan/dashboard/pegawai/dokumen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    perusahaan: Perusahaan;
    pegawai: Pegawai;
    dokumen: Dokumen;
}

export default function DokumenEditPage({ perusahaan, pegawai, dokumen }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: perusahaan.nama_perusahaan,
            href: `/dashboard-perusahaan/${perusahaan.id}`,
        },
        {
            title: 'Pegawai',
            href: `/dashboard-perusahaan/${perusahaan.id}/pegawai`,
        },
        {
            title: pegawai.nama_pegawai,
            href: `/dashboard-perusahaan/${perusahaan.id}/pegawai`,
        },
        {
            title: 'Dokumen',
            href: `/dashboard-perusahaan/${perusahaan.id}/pegawai/${pegawai.id}/dokumen`,
        },
        {
            title: 'Edit',
            href: `/dashboard-perusahaan/${perusahaan.id}/pegawai/${pegawai.id}/dokumen/${dokumen.id}/edit`,
        },
    ];

    return (
        <AppLayout perusahaanId={perusahaan.id} breadcrumbs={breadcrumbs}>
            <Head title="Edit Dokumen" />

            <Card className="m-5">
                <CardHeader>
                    <CardTitle>Edit Dokumen</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form
                        {...update.form({
                            perusahaanId: perusahaan.id,
                            pegawaiId: pegawai.id,
                            dokumenId: dokumen.id,
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
                                            defaultValue={dokumen.nama_dokumen}
                                            tabIndex={1}
                                            autoComplete="nama_dokumen"
                                            name="nama_dokumen"
                                            placeholder="Nama Dokumen"
                                        />
                                        <InputError message={errors.nama_dokumen} className="mt-2" />
                                    </div>

                                    {/* File Dokumen */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="file">File Dokumen</Label>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">File saat ini:</p>
                                            <Button variant="link" className="p-0">
                                                <a
                                                    href={`/storage/${dokumen.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat File
                                                </a>
                                            </Button>
                                            <p className="text-xs text-gray-500">
                                                Biarkan kosong jika tidak ingin mengubah file
                                            </p>
                                        </div>
                                        <Input
                                            id="file"
                                            type="file"
                                            name="file"
                                            accept="file/*"
                                            tabIndex={2}
                                            onChange={(e) => console.log(e.target.files?.[0])}
                                        />
                                        <InputError message={errors.file} />
                                    </div>

                                    {/* Tombol */}
                                    <div className="flex space-x-2 mt-4">
                                        <Button type="submit" className="w-fit">
                                            {processing ? (
                                                <>
                                                    <Spinner className="mr-2" />
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Dokumen'
                                            )}
                                        </Button>
                                        <Link
                                            href={`/dashboard-perusahaan/${perusahaan.id}/pegawai/${pegawai.id}/dokumen`}
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
