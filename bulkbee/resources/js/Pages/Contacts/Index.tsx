import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Plus, Users } from 'lucide-react';

export default function ContactsIndex() {
    return (
        <>
            <Head title="Contacts" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={route('dashboard')} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Contacts</h1>
                            <p className="text-gray-600">Manage your contacts and groups</p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('contacts.groups')}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Groups
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('contacts.create')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Contact
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <Card className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Users className="mr-2 h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">All Contacts</h2>
                        </div>
                        <Button variant="outline">Import</Button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">No contacts found</p>
                    </div>
                </Card>
            </div>
        </>
    );
}
