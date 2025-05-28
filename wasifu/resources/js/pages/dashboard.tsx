import ActivityTable from '@/components/dashboard/activity-table';
import LoaderSequence from '@/components/dashboard/loader-sequence';
import QuickCarousel from '@/components/dashboard/quick-carousel';
import UsageGrid from '@/components/dashboard/usage-grid';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Download, Edit, FileText, Plus, Share2 } from 'lucide-react';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

    if (isLoading) {
        return <LoaderSequence onComplete={() => setIsLoading(false)} />;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} profileCompletion={stats.profileCompletion}>
            {/* Main Content Grid */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 shadow-2xl">
                    <CardContent className="relative p-6">
                        <div className="relative z-10 flex flex-col items-start justify-between md:flex-row md:items-center">
                            <div className="flex items-start space-x-4">
                                <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />

                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                                        Welcome back, <span className="text-amber-300">{user.name}</span>
                                    </h2>

                                    <div className="flex items-center">
                                        <span
                                            className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                                user.subscription.isPro
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                                                    : 'bg-gray-800 text-gray-300'
                                            }`}
                                        >
                                            {user.subscription.isPro ? 'PRO PLAN' : 'FREE PLAN'}
                                        </span>

                                        <div className="ml-3 flex items-center">
                                            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                                            <span className="text-sm text-gray-300">Active now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile completion with progress bar */}
                            <div className="mt-4 min-w-[200px] rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg md:mt-0">
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">Profile Strength</span>
                                    <span className="text-sm font-bold text-amber-400">{stats.profileCompletion}%</span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 ease-out"
                                        style={{ width: `${stats.profileCompletion}%` }}
                                    ></div>
                                </div>

                                <p className="mt-2 text-right text-xs text-gray-400">Complete your profile</p>
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
                                {stats.generationsThisMonth}/{stats.maxGenerations}
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

                        <Button className="w-full" variant="default">
                            Upgrade Plan
                        </Button>
                    </CardContent>
                </Card>
                {/* Activity Stream */}
                <ActivityTable recentDocuments={recentDocuments} />
            </div>
        </AppLayout>
    );
}
