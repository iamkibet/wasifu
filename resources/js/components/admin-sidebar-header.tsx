import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface AdminSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    user: User;
}

export function AdminSidebarHeader({ breadcrumbs = [], user }: AdminSidebarHeaderProps) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-3">
                <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                    <Shield className="h-3 w-3" />
                    Admin
                </Badge>
                <h2 className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
                    Welcome back, {user.name}
                </h2>
            </div>
        </header>
    );
}
