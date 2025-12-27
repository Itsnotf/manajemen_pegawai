import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Link, Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button';
import { Building, Edit2Icon, PlusCircle } from 'lucide-react';
import { BreadcrumbItem, Instansi, SharedData, User } from '@/types';
import { toast } from 'sonner';
import users from '@/routes/users';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import hasAnyPermission from '@/lib/utils';
import perusahaan from '@/routes/perusahaan';


interface Props {
    perusahaans: {
        data: Instansi[];
        links: any[];
    };
    filters: {
        search?: string;
    };
    flash?: {
        success?: string;
    };
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instansi',
        href: perusahaan.index().url,
    },
];

export default function PerusahaanPage({ perusahaans, filters, flash }: Props) {
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
        router.get('/perusahaan', { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Instansi" />

            <div className="p-4 space-y-4">

                {/* Search Bar */}
                <div className='flex space-x-1'>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/3">
                        <Input
                            placeholder="Search instansi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant='outline' type="submit">Search</Button>
                    </form>
                    {hasAnyPermission(["perusahaan create"]) && (
                        <Link href="/perusahaan/create">
                            <Button variant='default' className='group flex items-center'>
                                <PlusCircle className='group-hover:rotate-90 transition-all' />
                                Add Instansi
                            </Button>
                        </Link>
                    )}
                </div>

                {/* User Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Instansi</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telepon</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {perusahaans.data.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="h-[65vh]  text-center">
                                    Belum Ada Data Instansi.
                                </TableCell>
                            </TableRow>
                        ) : (
                            perusahaans.data.map((perusahaan) => (
                                <TableRow key={perusahaan.id}>
                                    <TableCell>{perusahaan.nama_instansi}</TableCell>
                                    <TableCell>{perusahaan.alamat_instansi}</TableCell>
                                    <TableCell>{perusahaan.email}</TableCell>
                                    <TableCell>{perusahaan.telepon}</TableCell>
                                    <TableCell className="space-x-2">
                                        {hasAnyPermission(["perusahaan dashboard"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard-perusahaan/${perusahaan.id}`}>
                                                        <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:text-foreground">
                                                            <Building />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Dashboard</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["perusahaan edit"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/perusahaan/${perusahaan.id}/edit`}>
                                                        <Button variant="outline" size="sm" className="hover:bg-primary/20 hover:text-foreground">
                                                            <Edit2Icon />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                        )}
                                        {hasAnyPermission(["perusahaan delete"]) && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DeleteButton id={perusahaan.id} featured='perusahaan' />
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
                    {perusahaans.links.map((link, i) => (
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
