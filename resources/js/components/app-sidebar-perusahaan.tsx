import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Building2, Folder, KeyIcon, LayoutGrid, User, User2, User2Icon, UserCheck, UserCircle2, UserCog2, UserCog2Icon } from 'lucide-react';
import AppLogo from './app-logo';
import devisi from '@/routes/perusahaan/dashboard/devisi';



export function AppSidebarPerusahaan({ perusahaanId }: { perusahaanId?: string |  number }) {

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: `/dashboard-perusahaan/${perusahaanId}`,
            icon: LayoutGrid,
        },
    ];


    const strukturManagement: NavItem[] = [
        {
            title: 'Divisi',
            href: `/dashboard-perusahaan/${perusahaanId}/devisi`,
            icon: Building2,
            permissions: ['devisi index'],
        },
        {
            title: 'Jabatan',
            href: `/dashboard-perusahaan/${perusahaanId}/jabatan`,
            icon: UserCog2,
            permissions: ['jabatan index'],
        },
    ];

    const pegawaiManagement: NavItem[] = [
        {
            title: 'Pegawai',
            href: `/dashboard-perusahaan/${perusahaanId}/pegawai`,
            icon: User2,
            permissions: ['pegawai index'],
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain section='Platform' items={mainNavItems} />
                <NavMain section='Manage Struktur' items={strukturManagement} />
                <NavMain section='Manage Pegawai' items={pegawaiManagement} />
            </SidebarContent>

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
