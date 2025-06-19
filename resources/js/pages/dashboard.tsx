import ActivityTable from '@/components/dashboard/activity-table';
import LoaderSequence from '@/components/dashboard/loader-sequence';
import QuickCarousel from '@/components/dashboard/quick-carousel';
import UsageGrid from '@/components/dashboard/usage-grid';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Download, Edit, FileText, Plus, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toast } from 'sonner';

interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

interface DashboardProps {
    user: {
        name: string;
        subscription: {
            name: string;
            isPro: boolean;
        };
    };
    stats: {
        generationsThisMonth: number;
        maxGenerations: number;
        recentDocuments: number;
        profileCompletion: number;
        jobDescriptionsCount: number;
        weeklyStats: Array<{
            name: string;
            resumes: number;
            coverLetters: number;
        }>;
    };
    recentDocuments: Array<{
        id: number;
        job_title: string;
        created_at: string;
        document_type: string;
        status: 'published' | 'draft' | 'archived';
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ user, stats, recentDocuments }: DashboardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    if (isLoading) {
        return <LoaderSequence onComplete={() => setIsLoading(false)} />;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} profileCompletion={stats.profileCompletion}>
            {/* Main Content Grid */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />

                    <CardContent className="relative z-10 p-6">
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                            {/* User info with avatar */}
                            <div className="flex items-center space-x-5">
                                <div className="relative">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 shadow-lg">
                                        <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        Welcome back, <span className="text-amber-300">{user.name}</span>
                                    </h2>
                                    <p className="mt-1 text-gray-300">
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            {/* Plan status with progress */}
                            <div className="flex flex-col items-end">
                                <div
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                        user.subscription.isPro
                                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                                            : 'border border-amber-500/30 bg-gray-800/50 text-amber-300 backdrop-blur-md'
                                    }`}
                                >
                                    {user.subscription.isPro ? 'PRO PLAN' : 'FREE PLAN'}
                                </div>
                                {user.subscription.isPro && <p className="mt-2 text-sm text-gray-300">Unlimited generations available</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Stats Section */}

                <UsageGrid stats={stats} />

                <div className="space-y-6">
                    {/* Quick Actions */}
                    <QuickCarousel />
                </div>

                {/* Document Creation Hub - Premium Redesign */}
                <Card className="dark:to-gray-850 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 p-0 shadow-xl dark:from-gray-800">
                    {/* Card header with subtle gradient */}
                    <CardHeader className="px-6 pt-6 pb-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create New Document</CardTitle>
                                <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
                                    Start from scratch or choose a template
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: 'Publish Resume',
                                    icon: Download,
                                    color: 'from-blue-500 to-cyan-500',
                                    hover: 'hover:shadow-blue-500/20',
                                },
                                {
                                    title: 'Cover Letter',
                                    icon: Edit,
                                    color: 'from-purple-500 to-fuchsia-500',
                                    hover: 'hover:shadow-purple-500/20',
                                },
                                {
                                    title: 'Resume Website',
                                    icon: Share2,
                                    color: 'from-rose-500 to-pink-500',
                                    hover: 'hover:shadow-rose-500/20',
                                },
                                {
                                    title: 'Custom Template',
                                    icon: FileText,
                                    color: 'from-teal-500 to-emerald-500',
                                    hover: 'hover:shadow-teal-500/20',
                                },
                            ].map((action, idx) => (
                                <div
                                    key={idx}
                                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Card background */}
                                    <div className="absolute inset-0 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"></div>

                                    {/* Hover gradient overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${action.color} rounded-xl`}
                                    ></div>

                                    <Button
                                        asChild
                                        className="relative h-full w-full flex-col items-center justify-center gap-3 bg-transparent p-6 hover:bg-transparent"
                                    >
                                        <Link href={route('home')}>
                                            {/* Icon with dual-layer effect */}
                                            <div className="relative z-10">
                                                <div
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${action.color} opacity-30 blur-md transition-opacity group-hover:opacity-60`}
                                                ></div>
                                                <div
                                                    className={`relative rounded-xl ${action.color} flex h-12 w-12 items-center justify-center p-3 transition-all group-hover:scale-110 ${action.hover}`}
                                                >
                                                    <action.icon className="h-6 w-6 text-white" />
                                                </div>
                                            </div>

                                            <span className="relative z-10 text-sm font-medium text-gray-900 transition-colors group-hover:text-white dark:text-white">
                                                {action.title}
                                            </span>

                                            {/* Subtle plus icon on hover */}
                                            <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="rounded-full bg-white p-1 dark:bg-gray-800">
                                                    <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                                </div>
                                            </div>
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Divider with "or" */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="dark:bg-gray-850 bg-white px-3 text-sm text-gray-500 dark:text-gray-400">Happy Hacking</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Insights */}
                <Card className="border-none bg-gradient-to-br from-gray-50 to-white shadow-xl dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold">Document Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Monthly Generations</span>
                            <span className="font-medium text-indigo-600">
                                {stats.generationsThisMonth}/{user.subscription.isPro ? '∞' : stats.maxGenerations}
                            </span>
                        </div>

                        {/* Chart Container */}
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.weeklyStats} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        className="text-xs text-gray-500 dark:text-gray-400"
                                        tick={{ fill: 'currentColor' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        className="text-xs text-gray-500 dark:text-gray-400"
                                        tick={{ fill: 'currentColor' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        }}
                                        labelStyle={{
                                            color: 'var(--foreground)',
                                            fontWeight: 500,
                                            marginBottom: '0.5rem',
                                        }}
                                        formatter={(value: number, name: string) => [`${value} documents`, name]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="resumes"
                                        name="Resumes"
                                        stroke="var(--chart-1)"
                                        strokeWidth={2}
                                        dot={{ fill: 'var(--chart-1)', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: 'var(--chart-1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="coverLetters"
                                        name="Cover Letters"
                                        stroke="var(--chart-2)"
                                        strokeWidth={2}
                                        dot={{ fill: 'var(--chart-2)', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: 'var(--chart-2)' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {!user.subscription.isPro && (
                            <Button className="w-full" variant="default" asChild>
                                <Link href={route('billing.index')}>Upgrade to Pro</Link>
                            </Button>
                        )}
                    </CardContent>
                </Card>
                {/* Activity Stream */}
                <ActivityTable recentDocuments={recentDocuments} />
            </div>
        </AppLayout>
    );
}
