import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUp, FileText, LineChart, User } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface UsageGridProps {
    stats: {
        generationsThisMonth: number;
        maxGenerations: number;
        recentDocuments: number;
        profileCompletion: number;
        jobDescriptionsCount: number;
    };
}

export default function UsageGrid({ stats }: UsageGridProps) {
    const statsConfig = [
        {
            title: 'Profile Completion',
            value: `${stats.profileCompletion}%`,
            progress: stats.profileCompletion,
            icon: <User />,
            footer: <Link href={route('profile.index')}>Complete Profile</Link>,
            color: 'from-indigo-500 to-purple-500',
            type: 'profile',
        },
        {
            title: 'Monthly Generations',
            value: `${stats.generationsThisMonth}/${stats.maxGenerations}`,
            progress: (stats.generationsThisMonth / stats.maxGenerations) * 100,
            icon: <LineChart />,
            footer: <Link href={route('billing.index')}>Upgrade Plan</Link>,
            color: 'from-blue-500 to-cyan-500',
            type: 'generation',
        },
        {
            title: 'Recent Documents',
            value: stats.recentDocuments,
            progress: 100,
            icon: <FileText />,
            footer: <Link href={route('documents.index')}>View All</Link>,
            color: 'from-pink-500 to-rose-500',
            type: 'documents',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {statsConfig.map((stat, idx) => (
                <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                >
                    {/* Dynamic background based on stat type */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        {stat.type === 'profile' && (
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 blur-2xl"></div>
                        )}
                        {stat.type === 'generation' && (
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-300 blur-2xl"></div>
                        )}
                        {stat.type === 'documents' && (
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-8 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-300 blur-2xl"></div>
                        )}
                    </div>

                    <div className="relative z-10 flex h-full flex-col p-6">
                        <div className="mb-6 flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{stat.title}</h3>

                            <div
                                className={`rounded-full p-3 ${
                                    stat.type === 'profile'
                                        ? 'bg-blue-100 dark:bg-blue-900/50'
                                        : stat.type === 'generation'
                                          ? 'bg-green-100 dark:bg-green-900/50'
                                          : 'bg-purple-100 dark:bg-purple-900/50'
                                }`}
                            >
                                {React.cloneElement(stat.icon, {
                                    className: `h-6 w-6 ${
                                        stat.type === 'profile'
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : stat.type === 'generation'
                                              ? 'text-green-600 dark:text-green-400'
                                              : 'text-purple-600 dark:text-purple-400'
                                    }`,
                                })}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div
                                className={`mb-2 text-3xl font-bold ${
                                    stat.type === 'profile'
                                        ? 'text-blue-700 dark:text-blue-400'
                                        : stat.type === 'generation'
                                          ? 'text-green-700 dark:text-green-400'
                                          : 'text-purple-700 dark:text-purple-400'
                                }`}
                            >
                                {stat.value}
                            </div>

                            {/* Conditional rendering based on stat type */}
                            {stat.type === 'profile' ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Profile strength</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{stat.progress}%</span>
                                    </div>
                                    <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700`}
                                            style={{ width: `${stat.progress}%` }}
                                        />
                                    </div>
                                </div>
                            ) : stat.type === 'generation' ? (
                                <div className="flex items-center text-sm">
                                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                                    <span className="font-medium text-green-600 dark:text-green-400">+12.5%</span>
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">3 new files</span> added this week
                                </div>
                            )}
                        </div>

                        <div className="mt-auto">
                            <Button asChild variant="ghost" className="group w-full justify-between px-0 hover:bg-transparent">
                                <Link href={stat.footer.props.href}>
                                    <span className="text-gray-600 transition-colors group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400">
                                        {stat.footer.props.children}
                                    </span>
                                    <div className="rounded-full p-1 transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
                                        <ArrowRight className="h-4 w-4 text-gray-400 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
