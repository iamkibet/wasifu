import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
    return (
        <>
            <Head title="Generated Documents" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">Generated Documents</h1>
                            <Button asChild>
                                <Link href={route('generate.create')}>Generate New</Link>
                            </Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Generated On</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.map((document) => (
                                    <TableRow key={document.id}>
                                        <TableCell>{document.job_description.job_title}</TableCell>
                                        <TableCell>{document.job_description.company}</TableCell>
                                        <TableCell>{new Date(document.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" asChild>
                                                    <Link href={route('documents.show', document.id)}>View</Link>
                                                </Button>
                                                {!auth.user.onFreePlan && (
                                                    <>
                                                        <Button variant="outline" asChild>
                                                            <Link href={route('documents.download.resume', document.id)}>Download Resume</Link>
                                                        </Button>
                                                        <Button variant="outline" asChild>
                                                            <Link href={route('documents.download.cover-letter', document.id)}>
                                                                Download Cover Letter
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </>
    );
}
