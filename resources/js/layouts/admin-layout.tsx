import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AdminLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}

export default function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AdminSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AdminSidebarLayout>
    );
}
