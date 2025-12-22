import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Divisi, Instansi } from '@/types';

import InputError from '@/components/input-error';

import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/perusahaan/dashboard/devisi';


interface Props {
    divisi : Divisi
}


export default function DivisiEditPage({ divisi }: Props) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: divisi.instansi?.nama_instansi ?? 'Instansi',
            href: `/dashboard-perusahaan/${divisi.instansi_id}`,
        },
        {
            title: 'Divisi',
            href: `/dashboard-perusahaan/${divisi.instansi_id}/divisi`,
        },
        {
            title: 'Edit',
            href: `/dashboard-perusahaan/${divisi.instansi_id}/divisi/edit`,
        },
    ];


    return (
        <AppLayout perusahaanId={divisi.instansi_id} breadcrumbs={breadcrumbs}>
            <Head title="Divisi" />
            <Form
                {...update.form({ perusahaanId: divisi.instansi_id, devisiId: divisi.id })}
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
                                    defaultValue={divisi.nama_divisi}
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
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Divisi'
                                    )}
                                </Button>
                                <Link href={`/dashboard-perusahaan/${divisi.instansi_id}/devisi`}>
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
