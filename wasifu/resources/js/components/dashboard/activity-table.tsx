import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Download, Eye, FileText, MoreVertical } from 'lucide-react';

interface ActivityTableProps {
    recentDocuments: Array<{
        id: number;
        job_title: string;
        created_at: string;
        document_type: string;
        status: 'published' | 'draft' | 'archived';
    }>;
}

type DocumentStatus = 'published' | 'draft' | 'archived';

const STATUS_CONFIG: Record<DocumentStatus, { label: string; className: string }> = {
    published: {
        label: 'Published',
        className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    },
    draft: {
        label: 'Draft',
        className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    },
    archived: {
        label: 'Archived',
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
    },
};

export default function ActivityTable({ recentDocuments }: ActivityTableProps) {
    const getStatusConfig = (status: DocumentStatus | undefined) => {
        return status && status in STATUS_CONFIG ? STATUS_CONFIG[status] : STATUS_CONFIG.archived;
    };

    return (
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Card header with subtle gradient */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900">
                <CardHeader className="pt-5 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-gray-100 dark:text-gray-100">Recent Activity</CardTitle>
                        <Button variant="ghost" className="group text-gray-300 hover:text-white">
                            View all
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </CardHeader>
            </div>

            <CardContent className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                    {recentDocuments.map((doc) => {
                        const timeAgo = getTimeAgo(doc.created_at);
                        const statusConfig = getStatusConfig(doc.status);

                        return (
                            <div key={doc.id} className="group relative px-6 py-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                <div className="flex items-start">
                                    {/* Document icon with subtle styling */}
                                    <div className="relative mr-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                            <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="truncate font-medium text-gray-800 dark:text-gray-200">{doc.job_title}</h3>
                                            <span
                                                className={`${statusConfig.className} ml-2 flex-shrink-0 rounded-md px-2.5 py-0.5 text-xs font-medium`}
                                            >
                                                {statusConfig.label}
                                            </span>
                                        </div>

                                        <div className="mt-1 flex items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">{doc.document_type}</span>
                                            <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                                            <span
                                                className="text-gray-500 dark:text-gray-400"
                                                title={new Date(doc.created_at).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            >
                                                {timeAgo}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="ml-4 flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {recentDocuments.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                            <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium text-gray-800 dark:text-gray-200">No recent activity</h3>
                        <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
                            Your created documents will appear here once you start generating resumes.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Helper function to format relative time
function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
        return 'Yesterday';
    }

    if (diffInDays < 7) {
        return `${diffInDays}d ago`;
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
