import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function AdminNavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // For admin dashboard, check if we're on the admin dashboard
                    let isActive = false;
                    
                    if (item.href === '/admin-dashboard') {
                        // Overview tab - active when no tab parameter or tab=overview
                        isActive = page.url === '/admin-dashboard' || page.url === '/admin-dashboard?tab=overview';
                    } else if (item.href.includes('?tab=')) {
                        // Tab-specific navigation
                        const tabParam = item.href.split('?tab=')[1];
                        isActive = page.url.includes(`?tab=${tabParam}`) || 
                                  (tabParam === 'users' && page.url.includes('?tab=users'));
                    } else {
                        isActive = page.url.startsWith(item.href);
                    }
                    
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton  
                                asChild 
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
