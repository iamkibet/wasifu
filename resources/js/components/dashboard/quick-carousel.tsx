import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Download, Edit, FileText, Share2 } from 'lucide-react';
import React from 'react';

const actions = [
    {
        title: 'Publish Resume',
        description: 'Export and share your professional resume',
        icon: <Download />,
        color: 'from-blue-500 to-cyan-500',
        hover: 'hover:shadow-blue-500/20',
        link: route('home'),
    },
    {
        title: 'Cover Letter',
        description: 'Create a tailored cover letter',
        icon: <Edit />,
        color: 'from-purple-500 to-fuchsia-500',
        hover: 'hover:shadow-purple-500/20',
        link: route('home'),
    },
    {
        title: 'Resume Website',
        description: 'Publish your personal resume site',
        icon: <Share2 />,
        color: 'from-rose-500 to-pink-500',
        hover: 'hover:shadow-rose-500/20',
        link: route('home'),
    },
    {
        title: 'Custom Template',
        description: 'Design your own resume template',
        icon: <FileText />,
        color: 'from-teal-500 to-emerald-500',
        hover: 'hover:shadow-teal-500/20',
        link: route('home'),
    },
];

export default function QuickCarousel() {
    return (
        <div className="dark:to-gray-750 relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 p-6 shadow-xl dark:border-gray-700 dark:from-gray-800">
            {/* Sophisticated background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
            </div>

            {/* Header with premium typography */}
            <div className="relative z-10 mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Access</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Your productivity shortcuts</p>
                </div>
                <Button
                    variant="ghost"
                    className="group flex items-center text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                    View all
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            {/* Premium action cards */}
            <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        {/* Card background */}
                        <div className="absolute inset-0 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"></div>

                        {/* Animated hover layer */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${action.color} rounded-xl`}
                        ></div>

                        {/* Card content */}
                        <Button
                            asChild
                            className="relative h-full w-full flex-col items-start justify-start gap-4 bg-transparent p-6 hover:bg-transparent"
                        >
                            <Link href={action.link}>
                                {/* Icon with elegant styling */}
                                <div
                                    className={`mb-4 rounded-xl bg-gradient-to-br ${action.color} flex h-12 w-12 items-center justify-center p-3 transition-all group-hover:scale-110 group-hover:shadow-md ${action.hover}`}
                                >
                                    {React.cloneElement(action.icon, {
                                        className: 'h-6 w-6 text-white',
                                    })}
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-white dark:text-white">
                                        {action.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 transition-colors group-hover:text-gray-200 dark:text-gray-400">
                                        {action.description}
                                    </p>
                                </div>

                                {/* Hover indicator - subtle arrow */}
                                <div className="absolute right-5 bottom-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-white dark:bg-gray-700/50">
                                    <ArrowRight className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-400" />
                                </div>
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>

            {/* Subtle accent elements */}
            <div className="absolute -right-20 -bottom-20 z-0 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-200/30 to-blue-300/30 blur-[80px] dark:from-cyan-500/10 dark:to-blue-500/10"></div>
            <div className="absolute -top-20 -left-20 z-0 h-48 w-48 rounded-full bg-gradient-to-r from-purple-200/20 to-pink-300/20 blur-[80px] dark:from-purple-500/10 dark:to-pink-500/10"></div>
        </div>
    );
}
