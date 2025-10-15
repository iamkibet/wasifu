import { NavFooter } from '@/components/nav-footer';
import { AdminNavMain } from '@/components/admin-nav-main';
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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    BarChart3, 
    Users, 
    CreditCard, 
    FileText, 
    Mail, 
    Settings, 
    Shield,
    Database,
    Activity
} from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: '/admin-dashboard',
        icon: BarChart3,
    },
    {
        title: 'Users',
        href: '/admin-dashboard?tab=users',
        icon: Users,
    },
    {
        title: 'Payments',
        href: '/admin-dashboard?tab=payments',
        icon: CreditCard,
    },
    {
        title: 'Documents',
        href: '/admin-dashboard?tab=documents',
        icon: FileText,
    },
    {
        title: 'Email Templates',
        href: '/admin-dashboard?tab=emails',
        icon: Mail,
    },
    {
        title: 'System',
        href: '/admin-dashboard?tab=system',
        icon: Settings,
    },
];

const adminFooterNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings', // Use existing settings route
        icon: Settings,
    },
    {
        title: 'System Health',
        href: '/admin-dashboard', // Placeholder until route is created
        icon: Activity,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-orange-200 dark:border-orange-800">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin-dashboard" prefetch>
                                <div className="flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                                        <Shield className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">Admin</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Panel</span>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <AdminNavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={adminFooterNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
