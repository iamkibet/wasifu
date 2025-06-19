import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type User } from '@/types';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    user: User;
}

export function AppSidebarHeader({ breadcrumbs = [], user }: AppSidebarHeaderProps) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div>
                <h2 className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
                    Welcome back, {user.name}
                </h2>
            </div>
        </header>
    );
}
