import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button-perusahaan';
import { Edit2Icon, PlusCircle } from 'lucide-react';
import { BreadcrumbItem, Jabatan, Instansi } from '@/types';
import { toast } from 'sonner';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import hasAnyPermission from '@/lib/utils';
import devisi from '@/routes/perusahaan/dashboard/devisi';


interface Props {
    instansi : Instansi;
    jabatans: {
        data: Jabatan[];
        links: any[];
    };
    filters?: {
        search?: string;
    };
    flash?: {
        success?: string;
    };
}



export default function DevisiPage({ instansi , jabatans, filters = {}, flash }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
        {
            title: 'Jabatan',
            href: `/dashboard-perusahaan/${instansi.id}/jabatan`,
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
        router.get(`/dashboard-perusahaan/${instansi.id}/jabatan`, { search }, { preserveState: true });
    };

    return (
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Jabatan" />

            <div className="p-4 space-y-4">

                {/* Search Bar */}
                <div className='flex space-x-1'>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                        <Input
                            placeholder="Search Jabatan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant='outline' type="submit">Search</Button>
                    </form>
                    {hasAnyPermission(["jabatan create"]) && (
                        <Link href={`/dashboard-perusahaan/${instansi.id}/jabatan/create`} >
                            <Button variant='default' className='group flex items-center'>
                                <PlusCircle className='group-hover:rotate-90 transition-all' />
                                Add jabatan
                            </Button>
                        </Link>
                    )}
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Divisi</TableHead>
                            <TableHead>Nama Jabatan</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {jabatans.data.length === 0 ? (
                            <TableRow>
                               <TableCell colSpan={8} className="h-[65vh]  text-center">
                                    Belum Ada Data Jabatan.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jabatans.data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.divisi?.nama_divisi}</TableCell>
                                    <TableCell>{d.nama_jabatan}</TableCell>
                                    <TableCell className="space-x-2">
                                        {hasAnyPermission(["jabatan edit"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${instansi.id}/jabatan/${d.id}/edit`}>
                                                        <Button variant="actionEdit" size="sm">
                                                            <Edit2Icon />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["jabatan delete"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DeleteButton perusahaanId={instansi.id} id={d.id} featured='jabatan' />
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
                    {jabatans.links.map((link, i) => (
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
