import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface Props {
    jobDescription: {
        id: number;
        job_title: string;
        company: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
}

export default function Show({ jobDescription }: Props) {
    return (
        <AppLayout>
            <Head title={`${jobDescription.job_title} at ${jobDescription.company}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('job-descriptions.index')}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to List
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-semibold">
                                {jobDescription.job_title} at {jobDescription.company}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="default" asChild>
                                <Link href={route('job-descriptions.edit', jobDescription.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="default" asChild>
                                <Link
                                    href={route('job-descriptions.destroy', jobDescription.id)}
                                    method="delete"
                                    as="button"
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <Card className="p-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Job Details</h2>
                                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{jobDescription.job_title}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{jobDescription.company}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{new Date(jobDescription.created_at).toLocaleDateString()}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{new Date(jobDescription.updated_at).toLocaleDateString()}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Job Description</h2>
                                <div className="mt-4 text-sm whitespace-pre-wrap text-gray-900">{jobDescription.description}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
