
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Download,
    Edit,
    FileText,
    Mail,
    Calendar,
    Building,
    CheckCircle,
    Eye,
    Printer
} from 'lucide-react';

interface Props {
    auth: {
        user: User;
    };
    document: {
        id: number;
        resume_html: string;
        cover_letter_html: string;
        job_description: {
            job_title: string;
            company: string;
        };
        created_at: string;
    };
}

export default function Show({ auth, document }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Documents', href: '/documents' },
        { title: `${document.job_description.job_title} at ${document.job_description.company}`, href: `/documents/${document.id}` }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div className="mx-auto px-4 py-6 sm:px-6 ">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('documents.index')}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Documents
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href={route('documents.edit', document.id)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Edit className="h-4 w-4" />
                                Edit Documents
                            </Link>

                            {!auth.user.onFreePlan && (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Link
                                        href={route('documents.download.resume', document.id)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Resume
                                    </Link>
                                    <Link
                                        href={route('documents.download.cover_letter', document.id)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Cover Letter
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Document Info */}
                    <div className="mt-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                        {document.job_description.job_title}
                                    </h1>
                                    <div className="mt-2 flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            <span className="text-sm">{document.job_description.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">Generated {formatDate(document.created_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-3 py-1.5">
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            <button className="whitespace-nowrap border-b-2 border-orange-500 py-2 px-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                                Resume
                            </button>
                            <button className="whitespace-nowrap border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">
                                Cover Letter
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Resume Document */}
                <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resume</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional resume tailored for this position</p>
                                </div>
                            </div>

                            {!auth.user.onFreePlan && (
                                <Link
                                    href={route('documents.download.resume', document.id)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-2 text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="mx-auto max-w-4xl">
                                    <div
                                        className="prose prose-sm dark:prose-invert max-w-none w-full [&>*]:max-w-none [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_h1]:text-gray-900 dark:[&_h1]:text-white [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h3]:text-gray-900 dark:[&_h3]:text-white"
                                        dangerouslySetInnerHTML={{
                                            __html: document.resume_html.replace(/```html/g, '').replace(/```/g, ''),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cover Letter Document */}
                <div className="mt-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                    <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cover Letter</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Compelling cover letter for this application</p>
                                </div>
                            </div>

                            {!auth.user.onFreePlan && (
                                <Link
                                    href={route('documents.download.cover_letter', document.id)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-2 text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="mx-auto max-w-4xl">
                                    <div
                                        className="prose prose-sm dark:prose-invert max-w-none w-full [&>*]:max-w-none [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_h1]:text-gray-900 dark:[&_h1]:text-white [&_h2]:text-gray-900 dark:[&_h2]:text-white [&_h3]:text-gray-900 dark:[&_h3]:text-white"
                                        dangerouslySetInnerHTML={{
                                            __html: document.cover_letter_html.replace(/```html/g, '').replace(/```/g, ''),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                    <div className="p-4 sm:p-6">
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ready to Apply?</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Your documents are ready! Download them and customize as needed before submitting your application.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                            {auth.user.onFreePlan ? (
                                <div className="flex items-center justify-center gap-2 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 px-4 py-3">
                                    <Eye className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                        Upgrade to download PDFs
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href={route('documents.download.resume', document.id)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Resume PDF
                                    </Link>
                                    <Link
                                        href={route('documents.download.cover_letter', document.id)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Cover Letter PDF
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
