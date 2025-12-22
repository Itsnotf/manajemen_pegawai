import AppLayout from '@/layouts/app-layout-perusahaan';
import { Head, Link } from '@inertiajs/react';
import { BreadcrumbItem, Instansi, Pegawai, Divisi } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Props {
    instansi: Instansi;
    statistics: {
        totalPegawai: number;
        totalDevisi: number;
        totalJabatan: number;
    };
    pegawaiByType: Array<{ tipe_pegawai: string; count: number }>;
    pegawaiByDevisi: Array<{ devisi_name: string; count: number }>;
    recentPegawai: Pegawai[];
    devisiList: (Divisi & { jabatan_count: number })[];
}

export default function DashboardPage({
    instansi,
    statistics,
    pegawaiByType,
    pegawaiByDevisi,
    recentPegawai,
    devisiList,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Utama',
            href: `/dashboard`,
        },
        {
            title: 'Dashboard Perusahaan',
            href: `/dashboard-perusahaan/${instansi.id}`,
        },
    ];

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
        <AppLayout perusahaanId={instansi.id} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{instansi.nama_instansi}</h1>
                        <p className="text-gray-500 mt-1">{instansi.alamat_instansi}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="font-medium">{instansi.email}</p>
                        <p className="text-sm text-gray-500 mt-2">Telepon:</p>
                        <p className="font-medium">{instansi.telepon}</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={Users}
                        title="Total Pegawai"
                        value={statistics.totalPegawai}
                        description="Seluruh pegawai di perusahaan"
                        color="text-blue-500"
                    />
                    <StatCard
                        icon={Building2}
                        title="Total Devisi"
                        value={statistics.totalDevisi}
                        description="Jumlah divisi yang ada"
                        color="text-green-500"
                    />
                    <StatCard
                        icon={Briefcase}
                        title="Total Jabatan"
                        value={statistics.totalJabatan}
                        description="Posisi yang tersedia"
                        color="text-purple-500"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="Rasio Pegawai"
                        value={statistics.totalDevisi > 0 ? Math.round(statistics.totalPegawai / statistics.totalDevisi) : 0}
                        description="Pegawai per devisi"
                        color="text-orange-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pegawai by Type */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pegawai berdasarkan Tipe</CardTitle>
                            <CardDescription>Distribusi tipe pegawai</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pegawaiByType.length > 0 ? (
                                    pegawaiByType.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium capitalize">{item.tipe_pegawai}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{
                                                            width: `${(item.count / statistics.totalPegawai) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="ml-4 font-bold">{item.count}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pegawai by Devisi */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pegawai berdasarkan Devisi</CardTitle>
                            <CardDescription>Distribusi per divisi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pegawaiByDevisi.length > 0 ? (
                                    pegawaiByDevisi.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium">{item.devisi_name}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full"
                                                        style={{
                                                            width: `${(item.count / statistics.totalPegawai) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="ml-4 font-bold">{item.count}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">Tidak ada data</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Devisi List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Devisi</CardTitle>
                        <CardDescription>Semua divisi dalam perusahaan ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {devisiList.length > 0 ? (
                                devisiList.map((devisi) => (
                                    <div
                                        key={devisi.id}
                                        className="p-4 border rounded-lg cursor-pointer transition"
                                    >
                                        <h3 className="font-semibold">{devisi.nama_divisi}</h3>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Jabatan: {devisi.jabatan_count}
                                        </p>
                                        <Link href={`/dashboard-perusahaan/${instansi.id}/divisi`}>
                                            <Button variant="outline" size="sm" className="mt-3 w-full">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center">Tidak ada devisi</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Pegawai */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pegawai Terbaru</CardTitle>
                        <CardDescription>5 pegawai yang paling baru ditambahkan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>NIP</TableHead>
                                    <TableHead>Devisi</TableHead>
                                    <TableHead>Jabatan</TableHead>
                                    <TableHead>Tipe</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentPegawai.length > 0 ? (
                                    recentPegawai.map((pegawai) => (
                                        <TableRow key={pegawai.id}>
                                            <TableCell className="font-medium">{pegawai.nama_pegawai}</TableCell>
                                            <TableCell>{pegawai.nip}</TableCell>
                                            <TableCell>{pegawai.divisi?.nama_divisi}</TableCell>
                                            <TableCell>{pegawai.jabatan?.nama_jabatan}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    pegawai.tipe_pegawai === 'tetap'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {pegawai.tipe_pegawai}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                            Tidak ada pegawai
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
