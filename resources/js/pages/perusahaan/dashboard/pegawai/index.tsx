import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button-perusahaan';
import { Edit2Icon, File, FileUser, PlusCircle, Subscript } from 'lucide-react';
import { BreadcrumbItem, Jabatan, Pegawai, Instansi } from '@/types';
import { toast } from 'sonner';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import hasAnyPermission from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


interface Props {
    instansi: Instansi;
    pegawais: {
        data: Pegawai[];
        links: any[];
    };
    filters?: {
        search?: string;
    };
    flash?: {
        success?: string;
    };
}



export default function PegawaiPage({ instansi, pegawais, filters = {}, flash }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
        {
            title: 'Pegawai',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai`,
        },
    ];
    const [search, setSearch] = useState(filters.search || '');
    const [shownMessages] = useState(new Set());

    useEffect(() => {
        if (flash?.success && !shownMessages.has(flash.success)) {
            toast.success(flash.success);
            shownMessages.add(flash.success);
        }
    }, [flash?.success]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(`/dashboard-perusahaan/${instansi.id}/pegawai`, { search }, { preserveState: true });
    };

    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Pegawai" />

            <div className="p-4 space-y-4">

                {/* Search Bar */}
                <div className='flex space-x-1'>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                        <Input
                            placeholder="Search Pegawai..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant='outline' type="submit">Search</Button>
                    </form>
                    {hasAnyPermission(["pegawai create"]) && (
                        <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/create`} >
                            <Button variant='default' className='group flex items-center'>
                                <PlusCircle className='group-hover:rotate-90 transition-all' />
                                Add Pegawai
                            </Button>
                        </Link>
                    )}
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Pegawai</TableHead>
                            <TableHead>NIP</TableHead>
                            <TableHead>Nama Instansi</TableHead>
                            <TableHead>Nama Divisi</TableHead>
                            <TableHead>Nama Jabatan</TableHead>
                            <TableHead>Golongan</TableHead>
                            <TableHead>Tipe Pegawai</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {pegawais.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-[65vh]  text-center">
                                    Belum Ada Data Pegawai.
                                </TableCell>
                            </TableRow>
                        ) : (
                            pegawais.data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.nama_pegawai}</TableCell>
                                    <TableCell>{d.nip}</TableCell>
                                    <TableCell>{d.instansi?.nama_instansi}</TableCell>
                                    <TableCell>{d.divisi?.nama_divisi}</TableCell>
                                    <TableCell>{d.jabatan?.nama_jabatan}</TableCell>
                                    <TableCell>{d.golongan || '-'}</TableCell>
                                    <TableCell><Badge>{d.tipe_pegawai}</Badge></TableCell>
                                    <TableCell className="space-x-2">
                                        {hasAnyPermission(["dokumen index"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/${d.id}/dokumen`}>
                                                        <Button variant="outline" size="sm" className='hover:bg-blue-200 hover:text-blue-600'>
                                                            <File />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Dokumen Pegawai</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["pegawai pribadi"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/${d.id}/pribadi`}>
                                                        <Button variant="outline" size="sm" className='hover:bg-blue-200 hover:text-blue-600'>
                                                            <FileUser />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Data Pribadi</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["pegawai edit"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/${d.id}/edit`}>
                                                        <Button variant="outline" size="sm" className='hover:bg-blue-200 hover:text-blue-600'>
                                                            <Edit2Icon />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["pegawai delete"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DeleteButton perusahaanId={instansi.id} id={d.id} featured='pegawai' />
                                                </TooltipTrigger>
                                                <TooltipContent>Delete</TooltipContent>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <div className="flex gap-1">
                    {pegawais.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`px-3 py-1 flex justify-center items-center border rounded-md ${link.active ? 'bg-black text-white text-sm' : 'text-sm'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
