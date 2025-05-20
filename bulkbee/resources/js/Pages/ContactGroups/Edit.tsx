import { Head } from '@inertiajs/react';
import Form from './Form';

interface ContactGroup {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    group: ContactGroup;
}

export default function Edit({ group }: Props) {
    return (
        <>
            <Head title="Edit Contact Group" />

            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Edit Contact Group</h1>
                </div>

                <Form group={group} />
            </div>
        </>
    );
}
