import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    url: string;
}

export default function Redirect({ url }: Props) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return (
        <AppLayout>
            <Head title="Redirecting to Payment" />
            <div className="container py-8">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold">Redirecting to Payment...</h1>
                    <p className="text-gray-600">Please wait while we redirect you to the payment page.</p>
                </div>
            </div>
        </AppLayout>
    );
}
