import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button-perusahaan-pegawai';
import { Edit2Icon, File, FileUser, PlusCircle, Subscript } from 'lucide-react';
import { BreadcrumbItem, Dokumen, Jabatan, Pegawai, Instansi } from '@/types';
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
    pegawai: Pegawai
    dokumens: {
        data: Dokumen[];
        links: any[];
    };
    filters?: {
        search?: string;
    };
    flash?: {
        success?: string;
    };
}



export default function PegawaiDokumenPage({ instansi, dokumens, filters = {}, flash, pegawai }: Props) {

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
            title: 'Dokumen',
            href: `/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen`,
        },
        {
            title: pegawai.nama_pegawai,
            href: `/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen`,
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
        router.get(`/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen`, { search }, { preserveState: true });
    };

    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Dokumen" />

            <div className="p-4 space-y-4">

                {/* Search Bar */}
                <div className='flex space-x-1'>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                        <Input
                            placeholder="Search Dokumen..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant='outline' type="submit">Search</Button>
                    </form>
                    {hasAnyPermission(["dokumen create"]) && (
                        <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/${pegawai.id}/dokumen/create`} >
                            <Button variant='default' className='group flex items-center'>
                                <PlusCircle className='group-hover:rotate-90 transition-all' />
                                Add Dokumen
                            </Button>
                        </Link>
                    )}
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Dokumen</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {dokumens.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-[65vh]  text-center">
                                    Belum Ada Data Dokumen Pegawai.
                                </TableCell>
                            </TableRow>
                        ) : (
                            dokumens.data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.nama_dokumen}</TableCell>
                                    <TableCell>
                                        <Button variant="link">
                                            <a href={`/storage/${d.file_dokumen}`} target="_blank" rel="noopener noreferrer">
                                                Link
                                            </a>
                                        </Button>
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        {hasAnyPermission(["dokumen edit"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${instansi.id}/pegawai/${d.pegawai_id}/dokumen/${d.id}/edit`}>
                                                        <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:text-foreground">
                                                            <Edit2Icon />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["dokumen delete"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DeleteButton perusahaanId={instansi.id} id={Number(d.pegawai_id)} featured='pegawai' childfeature='dokumen' childId={d.id} />
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
                    {dokumens.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`px-3 py-1 flex justify-center items-center border rounded-md ${link.active ? 'bg-primary text-primary-foreground text-sm' : 'text-sm'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
