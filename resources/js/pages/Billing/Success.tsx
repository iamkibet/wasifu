import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

interface Props {
    message: string;
}

export default function Success({ message }: Props) {
    return (
        <AppLayout>
            <Head title="Payment Successful" />

            <div className="container py-8">
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <div className="flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <CardTitle className="text-center">Payment Successful!</CardTitle>
                        <CardDescription className="text-center">{message}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center">
                            <a
                                href={route('dashboard')}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
                            >
                                Go to Dashboard
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
