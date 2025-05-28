import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download, Edit } from 'lucide-react';

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
    return (
        <>
            <Head title={`${document.job_description.job_title} at ${document.job_description.company}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('documents.index')}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to List
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-semibold">
                                {document.job_description.job_title} at {document.job_description.company}
                            </h1>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Resume</h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('documents.edit', document.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                    {!auth.user.onFreePlan && (
                                        <Button variant="outline" asChild>
                                            <Link href={route('documents.download.resume', document.id)}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download PDF
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: document.resume_html.replace(/```html/g, '').replace(/```/g, ''),
                                }}
                            />
                        </Card>

                        <Card className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Cover Letter</h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={route('documents.edit', document.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                    {!auth.user.onFreePlan && (
                                        <Button variant="outline" asChild>
                                            <Link href={route('documents.download.cover_letter', document.id)}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download PDF
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: document.cover_letter_html.replace(/```html/g, '').replace(/```/g, ''),
                                }}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
