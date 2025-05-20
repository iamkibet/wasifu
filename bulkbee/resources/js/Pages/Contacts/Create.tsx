import { Head } from '@inertiajs/react';
import Form from './Form';

interface Group {
    id: number;
    name: string;
}

interface Props {
    groups: Group[];
}

export default function Create({ groups }: Props) {
    return (
        <>
            <Head title="Create Contact" />

            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Create Contact</h1>
                </div>

                <Form groups={groups} />
            </div>
        </>
    );
}
