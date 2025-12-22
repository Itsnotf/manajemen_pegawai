import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Instansi } from '@/types';

import InputError from '@/components/input-error';

import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/perusahaan/dashboard/devisi';


interface Props {
    instansi: Instansi
}


export default function DivisiCreatePage({ instansi }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
        {
            title: 'Divisi',
            href: `/dashboard-perusahaan/${instansi.id}/divisi`,
        },
        {
            title: 'Create',
            href: `/dashboard-perusahaan/${instansi.id}/divisi/create`,
        },
    ];


    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Divisi" />
            <Form
                {...store.form(instansi.id)}
                resetOnSuccess={['nama_divisi']}
                disableWhileProcessing
                className="flex flex-col gap-6 p-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nama_divisi">Nama Divisi</Label>
                                <Input
                                    id="nama_divisi"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="nama_divisi"
                                    name="nama_divisi"
                                    placeholder="Nama Divisi"
                                />
                                <InputError
                                    message={errors.nama_divisi}
                                    className="mt-2"
                                />
                            </div>


                            <div className='space-x-2'>
                                <Button type="submit" className="mt-2 w-fit">
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Divisi'
                                    )}
                                </Button>
                                <Link href={
                                    `/dashboard-perusahaan/${instansi.id}/devisi`
                                }>
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
