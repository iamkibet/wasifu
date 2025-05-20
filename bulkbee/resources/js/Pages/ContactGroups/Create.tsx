import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
    return (
        <>
            <Head title="Create Contact Group" />

            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Create Contact Group</h1>
                </div>

                <Form />
            </div>
        </>
    );
}
