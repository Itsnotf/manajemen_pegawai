import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Link, Head, router, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { BreadcrumbItem, Instansi, Role, User } from '@/types';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import perusahaan, { update } from '@/routes/perusahaan';
import { Textarea } from '@/components/ui/textarea';


interface Props {
    perusahaans: Instansi;
}



export default function PerusahaanEditPage({ perusahaans }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Perusahaan',
            href: perusahaan.index().url,
        },
        {
            title: 'Edit',
            href: perusahaan.edit(perusahaans.id).url,
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perusahaan" />
            <Form
                {...update.form(perusahaans.id)}
                className="flex flex-col gap-6 p-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nama_perusahaan">Nama Perusahaan</Label>
                                <Input
                                    id="nama_perusahaan"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="nama_perusahaan"
                                    defaultValue={perusahaans.nama_instansi}
                                    name="nama_perusahaan"
                                    placeholder="Nama Perusahaan"
                                />
                                <InputError
                                    message={errors.nama_perusahaan}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    defaultValue={perusahaans.email}
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="telepon">Telepon</Label>
                                <Input
                                    id="telepon"
                                    type="number"
                                    required
                                    maxLength={13}
                                    tabIndex={2}
                                    autoComplete="telepon"
                                    defaultValue={perusahaans.telepon}
                                    name="telepon"
                                    placeholder="08*********"
                                />
                                <InputError message={errors.telepon} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="alamat_perusahaan">Alamat</Label>
                                <Textarea
                                    id="alamat_perusahaan"
                                    name="alamat_perusahaan"
                                    placeholder="Masukkan alamat perusahaan"
                                    defaultValue={perusahaans.alamat_instansi}
                                    className='min-h-36'
                                />
                                <InputError message={errors.alamat_perusahaan} />
                            </div>

                            <div className='space-x-2'>
                                <Button type="submit" className="mt-2 w-fit">
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Edit Perusahaan'
                                    )}
                                </Button>
                                <Link href={'/perusahaan'}>
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
