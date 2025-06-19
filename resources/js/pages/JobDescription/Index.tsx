import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText, Plus, Trash2 } from 'lucide-react';

interface Props {
    jobDescriptions: Array<{
        id: number;
        job_title: string;
        company: string;
        created_at: string;
    }>;
}

export default function Index({ jobDescriptions }: Props) {
    return (
        <AppLayout>
            <Head title="Job Descriptions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Job Descriptions</h1>
                        <Button asChild>
                            <Link href={route('job-descriptions.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Job Description
                            </Link>
                        </Button>
                    </div>

                    <Card>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="hover:bg-muted/50 border-b transition-colors">
                                        <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Job Title</th>
                                        <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Company</th>
                                        <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">Created</th>
                                        <th className="text-muted-foreground h-12 w-[100px] px-4 text-left align-middle font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {jobDescriptions.length === 0 ? (
                                        <tr className="hover:bg-muted/50 border-b transition-colors">
                                            <td colSpan={4} className="h-24 p-4 text-center align-middle">
                                                No job descriptions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        jobDescriptions.map((job) => (
                                            <tr key={job.id} className="hover:bg-muted/50 border-b transition-colors">
                                                <td className="p-4 align-middle font-medium">{job.job_title}</td>
                                                <td className="p-4 align-middle">{job.company}</td>
                                                <td className="p-4 align-middle">{new Date(job.created_at).toLocaleDateString()}</td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="default" asChild>
                                                            <Link href={route('job-descriptions.show', job.id)}>
                                                                <FileText className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Link>
                                                        </Button>
                                                        <Button variant="default" asChild>
                                                            <Link href={route('job-descriptions.edit', job.id)}>
                                                                <Edit className="h-4 w-4" />
                                                                <span className="sr-only">Edit</span>
                                                            </Link>
                                                        </Button>
                                                        <Button variant="default" asChild>
                                                            <Link
                                                                href={route('job-descriptions.destroy', job.id)}
                                                                method="delete"
                                                                as="button"
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                <span className="sr-only">Delete</span>
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
