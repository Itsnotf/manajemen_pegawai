import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, UserCheck, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Props {
    statistics: {
        totalPerusahaan: number;
        totalPegawai: number;
        totalUser: number;
    };
    perusahaanList: Array<{
        id: number;
        nama_perusahaan: string;
        alamat_perusahaan: string;
        email: string;
        telepon: string;
        devisis_count: number;
        pegawai_count: number;
    }>;
    recentPerusahaan: Array<{
        id: number;
        nama_perusahaan: string;
        email: string;
        telepon: string;
        devisis_count: number;
        pegawai_count: number;
        created_at: string;
    }>;
    topPerusahaan: Array<{
        nama_perusahaan: string;
        pegawai_count: number;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Utama',
        href: '/dashboard',
    },
];

export default function Dashboard({
    statistics,
    perusahaanList,
    recentPerusahaan,
    topPerusahaan,
}: Props) {
    const StatCard = ({
        icon: Icon,
        title,
        value,
        description,
        color,
    }: {
        icon: any;
        title: string;
        value: number;
        description: string;
        color: string;
    }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-gray-500">{description}</p>
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-4 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Utama</h1>
                    <p className="text-gray-500 mt-1">Overview semua perusahaan dan karyawan</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={Building2}
                        title="Total Perusahaan"
                        value={statistics.totalPerusahaan}
                        description="Jumlah perusahaan aktif"
                        color="text-blue-500"
                    />
                    <StatCard
                        icon={Users}
                        title="Total Pegawai"
                        value={statistics.totalPegawai}
                        description="Seluruh pegawai di sistem"
                        color="text-green-500"
                    />
                    <StatCard
                        icon={UserCheck}
                        title="Total User"
                        value={statistics.totalUser}
                        description="User yang terdaftar"
                        color="text-purple-500"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="Rasio Pegawai"
                        value={statistics.totalPerusahaan > 0 ? Math.round(statistics.totalPegawai / statistics.totalPerusahaan) : 0}
                        description="Pegawai per perusahaan"
                        color="text-orange-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Perusahaan by Pegawai */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Perusahaan</CardTitle>
                            <CardDescription>Perusahaan dengan pegawai terbanyak</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPerusahaan.length > 0 ? (
                                    topPerusahaan.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium">{item.nama_perusahaan}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{
                                                            width: `${(item.pegawai_count / (topPerusahaan[0]?.pegawai_count || 1)) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="ml-4 font-bold">{item.pegawai_count}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Perusahaan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Perusahaan Terbaru</CardTitle>
                            <CardDescription>5 perusahaan yang baru ditambahkan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentPerusahaan.length > 0 ? (
                                    recentPerusahaan.map((perusahaan) => (
                                        <div key={perusahaan.id} className="flex justify-between items-start p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <p className="font-medium">{perusahaan.nama_perusahaan}</p>
                                                <p className="text-sm text-gray-500">{perusahaan.email}</p>
                                                <div className="flex gap-4 mt-2">
                                                    <span className="text-xs text-gray-600">
                                                        Divisi: <span className="font-bold">{perusahaan.devisis_count}</span>
                                                    </span>
                                                    <span className="text-xs text-gray-600">
                                                        Pegawai: <span className="font-bold">{perusahaan.pegawai_count}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/dashboard-perusahaan/${perusahaan.id}`}>
                                                <Button variant="outline" size="sm">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* All Perusahaan Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Semua Instansi</CardTitle>
                        <CardDescription>Informasi lengkap semua instansi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Instansi</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead className="text-center">Divisi</TableHead>
                                        <TableHead className="text-center">Pegawai</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {perusahaanList.length > 0 ? (
                                        perusahaanList.map((perusahaan) => (
                                            <TableRow key={perusahaan.id}>
                                                <TableCell className="font-medium">{perusahaan.nama_perusahaan}</TableCell>
                                                <TableCell className="max-w-xs truncate">{perusahaan.alamat_perusahaan}</TableCell>
                                                <TableCell>{perusahaan.email}</TableCell>
                                                <TableCell>{perusahaan.telepon}</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                                        {perusahaan.devisis_count}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                                        {perusahaan.pegawai_count}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={`/dashboard-perusahaan/${perusahaan.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            Buka
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-gray-500">
                                                Tidak ada perusahaan
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
