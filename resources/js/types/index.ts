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

export interface Profile {
    id: number;
    user_id: number;
    full_name: string;
    professional_summary: string;
    work_experience: {
        company: string;
        position: string;
        start_date: string;
        end_date: string;
        description: string;
    }[];
    education: {
        institution: string;
        degree: string;
        field: string;
        graduation_date: string;
    }[];
    skills: string[];
    certifications: string[];
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}
