import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout-perusahaan';
import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button-perusahaan';
import { Edit2Icon, PlusCircle } from 'lucide-react';
import { BreadcrumbItem, Divisi, Instansi } from '@/types';
import { toast } from 'sonner';
import users from '@/routes/users';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import hasAnyPermission from '@/lib/utils';
import divisi from '@/routes/perusahaan/dashboard/devisi';


interface Props {
    perusahaanId: number;
    instansi : Instansi;
    divisis: {
        data: Divisi[];
        links: any[];
    };
    filters?: {
        search?: string;
    };
    flash?: {
        success?: string;
    };
}



export default function DivisiPage({ instansi ,perusahaanId, divisis, filters = {}, flash }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: instansi.nama_instansi,
            href: `/dashboard-perusahaan/${perusahaanId}`,
        },
        {
            title: 'Divisi',
            href: `/dashboard-perusahaan/${perusahaanId}/divisi`,
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
        router.get(`/dashboard-perusahaan/${perusahaanId}/devisi`, { search }, { preserveState: true });
    };

    return (
        <AppLayout perusahaanId={perusahaanId} breadcrumbs={breadcrumbs}>
            <Head title="Divisi" />

            <div className="p-4 space-y-4">

                {/* Search Bar */}
                <div className='flex space-x-1'>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                        <Input
                            placeholder="Search Divisi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant='outline' type="submit">Search</Button>
                    </form>
                    {hasAnyPermission(["devisi create"]) && (
                        <Link href={divisi.create(perusahaanId)} >
                            <Button variant='default' className='group flex items-center'>
                                <PlusCircle className='group-hover:rotate-90 transition-all' />
                                Add Divisi
                            </Button>
                        </Link>
                    )}
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Instansi</TableHead>
                            <TableHead>Nama Divisi</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {divisis.data.length === 0 ? (
                            <TableRow>
                                 <TableCell colSpan={8} className="h-[65vh]  text-center">
                                    Belum Ada Data Divisi.
                                </TableCell>
                            </TableRow>
                        ) : (
                            divisis.data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.instansi?.nama_instansi}</TableCell>
                                    <TableCell>{d.nama_divisi}</TableCell>
                                    <TableCell className="space-x-2">
                                        {hasAnyPermission(["devisi edit"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={divisi.edit({ perusahaanId: d.instansi_id, devisiId: d.id })}>
                                                        <Button variant="outline" size="sm" className='hover:bg-blue-200 hover:text-blue-600'>
                                                            <Edit2Icon />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["devisi delete"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DeleteButton perusahaanId={d.instansi_id} id={d.id} featured='devisi' />
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
                    {divisis.links.map((link, i) => (
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
