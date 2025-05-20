import { Pagination } from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ContactGroup {
    id: number;
    name: string;
    description: string | null;
    contacts_count: number;
}

interface Props {
    groups: {
        data: ContactGroup[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function Index({ groups }: Props) {
    return (
        <>
            <Head title="Contact Groups" />

            <div className="container mx-auto py-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Contact Groups</h1>
                    <Link href={route('contact-groups.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Group
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Groups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Contacts</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {groups.data.map((group) => (
                                    <TableRow key={group.id}>
                                        <TableCell>{group.name}</TableCell>
                                        <TableCell>{group.description}</TableCell>
                                        <TableCell>{group.contacts_count}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('contact-groups.edit', group.id)}>
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="mt-4">
                    <Pagination links={groups.links} />
                </div>
            </div>
        </>
    );
}
