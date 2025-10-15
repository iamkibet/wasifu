import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminSidebarHeader } from '@/components/admin-sidebar-header';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function AdminSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppShell variant="sidebar">
            <Toaster position="top-right" />
            <AdminSidebar />
            <AppContent variant="sidebar">
                <AdminSidebarHeader breadcrumbs={breadcrumbs} user={auth.user} />
                {children}
            </AppContent>
        </AppShell>
    );
}
