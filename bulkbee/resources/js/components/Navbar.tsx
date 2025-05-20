import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, InfoIcon, LogOutIcon, MailIcon, MenuIcon, UserIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const defaultNavigationItems: NavItem[] = [
    { href: route('home'), label: 'Home', icon: HomeIcon },
    { href: route('dashboard'), label: 'Dashboard', icon: HomeIcon },
    { href: route('contacts.index'), label: 'Contacts', icon: UserIcon },
    { href: route('campaigns.index'), label: 'Campaigns', icon: MailIcon },
    { href: route('templates.index'), label: 'Templates', icon: InfoIcon },
];

const adminNavigationItems: NavItem[] = [
    { href: route('admin.users'), label: 'Users', icon: UserIcon },
    { href: route('admin.payments'), label: 'Payments', icon: InfoIcon },
    { href: route('admin.settings'), label: 'Settings', icon: MenuIcon },
];

function Navbar() {
    const { auth } = usePage().props;

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile navigation */}
                    <Sheet>
                        <SheetTrigger className="md:hidden">
                            <MenuIcon className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                            <nav className="flex h-full flex-col">
                                <div className="flex-1 space-y-2 px-2 py-4">
                                    {defaultNavigationItems.map((item) => (
                                        <NavItem key={item.href} item={item} mobile />
                                    ))}

                                    {auth.user?.is_admin && (
                                        <>
                                            <div className="bg-border mx-2 my-3 h-px" />
                                            {adminNavigationItems.map((item) => (
                                                <NavItem key={item.href} item={item} mobile />
                                            ))}
                                        </>
                                    )}
                                </div>

                                <div className="border-t p-4">{auth.user ? <UserSection mobile /> : <AuthSection mobile />}</div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Desktop navigation */}
                    <div className="hidden flex-1 items-center md:flex">
                        <MainNav items={defaultNavigationItems} />

                        {auth.user?.is_admin && (
                            <div className="ml-4 border-l pl-4">
                                <MainNav items={adminNavigationItems} />
                            </div>
                        )}
                    </div>

                    {/* User/Auth section */}
                    <div className="flex items-center gap-2">{auth.user ? <UserSection /> : <AuthSection />}</div>
                </div>
            </div>
        </header>
    );
}

// Sub-components for better organization
function MainNav({ items }: { items: NavItem[] }) {
    return (
        <nav className="flex items-center gap-1">
            {items.map((item) => (
                <NavItem key={item.href} item={item} />
            ))}
        </nav>
    );
}

function NavItem({ item, mobile = false }: { item: NavItem; mobile?: boolean }) {
    const currentRoute = route().current();
    const isActive = currentRoute === item.href.split('/')[1]; // Basic route matching

    return (
        <Link
            href={item.href}
            className={cn(
                'flex items-center px-3 py-2 text-sm font-medium transition-colors',
                mobile ? 'hover:bg-accent hover:text-accent-foreground rounded-lg' : 'hover:bg-accent/50 rounded-md',
                isActive ? 'bg-accent text-accent-foreground' : 'text-foreground/60 hover:text-foreground',
            )}
        >
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.label}
        </Link>
    );
}

function UserSection({ mobile = false }: { mobile?: boolean }) {
    const { auth } = usePage().props;
    return (
        <div className={cn('flex items-center', mobile ? 'flex-col gap-2' : 'gap-3')}>
            <Button variant="ghost" size={mobile ? 'default' : 'sm'} className="gap-2" asChild>
                <Link href={route('profile.edit')}>
                    <UserIcon className="h-4 w-4" />
                    <span>{auth.user.name}</span>
                </Link>
            </Button>

            <Button variant="outline" size={mobile ? 'default' : 'sm'} className="gap-2" asChild>
                <Link href={route('logout')} method="post">
                    <LogOutIcon className="h-4 w-4" />
                    <span>Logout</span>
                </Link>
            </Button>
        </div>
    );
}

function AuthSection({ mobile = false }: { mobile?: boolean }) {
    return (
        <div className={cn('flex', mobile ? 'flex-col gap-2' : 'gap-2')}>
            <Button variant="outline" size={mobile ? 'default' : 'sm'} asChild>
                <Link href={route('login')}>Sign In</Link>
            </Button>
            <Button size={mobile ? 'default' : 'sm'} asChild>
                <Link href={route('register')}>Get Started</Link>
            </Button>
        </div>
    );
}

export default Navbar;
