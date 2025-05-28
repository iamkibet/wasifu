import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Auth } from './index.d';

export interface User {
    id: number;
    name: string;
    email: string;
    onFreePlan: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}
