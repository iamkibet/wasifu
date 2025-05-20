import { Head } from '@inertiajs/react';
import Form from './Form';

interface Group {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    custom_fields: Record<string, string>;
    groups: Group[];
}

interface Props {
    contact: Contact;
    groups: Group[];
}

export default function Edit({ contact, groups }: Props) {
    return (
        <>
            <Head title="Edit Contact" />

            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Edit Contact</h1>
                </div>

                <Form contact={contact} groups={groups} />
            </div>
        </>
    );
}
