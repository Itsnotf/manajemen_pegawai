import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Divisi, Instansi } from '@/types';
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
import { store } from '@/routes/perusahaan/dashboard/jabatan';
import { useState } from 'react';


interface Props {
    instansi: Instansi
    devisis: Divisi[];
}


export default function DevisiCreatePage({ instansi, devisis }: Props) {
    const [selectedDevisi, setSelectedDevisi] = useState("");


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
        {
            title: 'Jabatan',
            href: `/dashboard-perusahaan/${instansi.id}/jabatan`,
        },
        {
            title: 'Create',
            href: `/dashboard-perusahaan/${instansi.id}/jabatan/create`,
        },
    ];


    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Jabatan" />
            <Form
                {...store.form(instansi.id)}
                resetOnSuccess={['nama_devisi']}
                disableWhileProcessing
                className="flex flex-col gap-6 p-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nama_jabatan">Nama Jabatan</Label>
                                <Input
                                    id="nama_jabatan"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="nama_jabatan"
                                    name="nama_jabatan"
                                    placeholder="Nama Jabatan"
                                />
                                <InputError
                                    message={errors.nama_jabatan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="devisi_id">Devisi</Label>
                                <Select
                                    name="devisi_id"
                                    required
                                    value={selectedDevisi}
                                    onValueChange={(value) => setSelectedDevisi(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Devisi" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {devisis.map((devisi) => (
                                            <SelectItem key={devisi.id} value={devisi.id.toString()}>
                                                {devisi.nama_divisi}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.devisi_id} />
                            </div>


                            <div className='space-x-2'>
                                <Button type="submit" className="mt-2 w-fit">
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Jabatan'
                                    )}
                                </Button>
                                <Link href={`/dashboard-perusahaan/${instansi.id}/jabatan`}>
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
