import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

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
    };
}

export default function Edit({ auth, document }: Props) {
    const { data, setData, put, processing } = useForm({
        resume_html: document.resume_html,
        cover_letter_html: document.cover_letter_html,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('documents.update', document.id), {
            onSuccess: () => {
                toast.success('Document updated successfully!');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to update document');
            },
        });
    };

    return (
        <>
            <Head title={`Edit ${document.job_description.job_title} at ${document.job_description.company}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center gap-4">
                        <Button variant="outline" asChild>
                            <Link href={route('documents.show', document.id)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Document
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold">
                            Edit {document.job_description.job_title} at {document.job_description.company}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Resume</h2>
                            <textarea
                                value={data.resume_html}
                                onChange={(e) => setData('resume_html', e.target.value)}
                                className="h-96 w-full rounded-md border border-gray-300 p-4 font-mono text-sm"
                            />
                        </Card>

                        <Card className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Cover Letter</h2>
                            <textarea
                                value={data.cover_letter_html}
                                onChange={(e) => setData('cover_letter_html', e.target.value)}
                                className="h-96 w-full rounded-md border border-gray-300 p-4 font-mono text-sm"
                            />
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
