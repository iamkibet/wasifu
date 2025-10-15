
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    FileText, 
    Plus, 
    Download, 
    Eye, 
    Calendar,
    Building,
    Sparkles,
    ArrowRight
} from 'lucide-react';

interface Props {
    auth: {
        user: User;
    };
    documents: Array<{
        id: number;
        job_description: {
            job_title: string;
            company: string;
        };
        created_at: string;
    }>;
}

export default function Index({ auth, documents }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Documents', href: '/documents' }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Generated Documents" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-900/10">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-tight text-orange-600 backdrop-blur-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300">
                                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-400/20 stroke-orange-500" />
                                    <span>AI-Generated Documents</span>
                                </div>
                                <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Your Generated Documents
                                </h1>
                                <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
                                    View and download your AI-generated resumes and cover letters
                                </p>
                            </div>
                            
                            <Link
                                href={route('generate.create')}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 sm:px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                <Plus className="h-4 w-4" />
                                Generate New Documents
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                                        <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{documents.length}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{documents.length * 2}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Generated Files</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {new Set(documents.map(d => d.job_description.company)).size}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Companies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    {documents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No documents yet</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Generate your first resume and cover letter to get started.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('generate.create')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                                >
                                    <Plus className="h-4 w-4" />
                                    Generate Your First Documents
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {documents.map((document) => (
                                <div
                                    key={document.id}
                                    className="rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 flex-shrink-0">
                                                        <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {document.job_description.job_title}
                                                        </h3>
                                                        <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                            <div className="flex items-center gap-1.5">
                                                                <Building className="h-4 w-4" />
                                                                <span>{document.job_description.company}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{formatDate(document.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Link
                                                    href={route('documents.show', document.id)}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </Link>
                                                
                                                {!auth.user.onFreePlan && (
                                                    <>
                                                        <Link
                                                            href={route('documents.download.resume', document.id)}
                                                            className="inline-flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-2 text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Resume
                                                        </Link>
                                                        <Link
                                                            href={route('documents.download.cover_letter', document.id)}
                                                            className="inline-flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-3 py-2 text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Cover Letter
                                                        </Link>
                                                    </>
                                                )}
                                                
                                                {auth.user.onFreePlan && (
                                                    <div className="inline-flex items-center gap-2 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 px-3 py-2">
                                                        <Download className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                                            Upgrade for PDFs
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
