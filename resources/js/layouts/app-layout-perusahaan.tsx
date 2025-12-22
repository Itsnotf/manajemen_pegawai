import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout-perusahaan';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    perusahaanId?: string | number;
}

export default ({ perusahaanId, children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate perusahaanId={perusahaanId} breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster position="top-right" />
    </AppLayoutTemplate>
);
