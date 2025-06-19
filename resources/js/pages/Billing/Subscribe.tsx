import PaymentMethods from '@/components/PaymentMethods';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Subscribe() {
    const [showPayment, setShowPayment] = useState(false);
    const { post, processing, setData } = useForm({
        paymentMethodId: '',
    });

    const handlePaymentSuccess = (paymentMethodId: string) => {
        setData('paymentMethodId', paymentMethodId);
        post(route('billing.process'), {
            onSuccess: () => {
                toast.success('Subscription activated successfully!');
                window.location.href = route('dashboard');
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to process subscription');
                setShowPayment(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Subscribe to Pro" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>Get access to all premium features</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-inside list-disc space-y-2">
                                <li>Unlimited document generations</li>
                                <li>PDF downloads</li>
                                <li>Priority support</li>
                                <li>Advanced customization options</li>
                            </ul>
                            <p className="mt-4 text-2xl font-bold">$9.99/month</p>
                        </CardContent>
                        <CardFooter>
                            {!showPayment ? (
                                <Button className="w-full" onClick={() => setShowPayment(true)}>
                                    Choose Payment Method
                                </Button>
                            ) : (
                                <PaymentMethods amount={999} onSuccess={handlePaymentSuccess} disabled={processing} />
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
