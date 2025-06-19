import MpesaPayment from '@/components/MpesaPayment';
import StripePayment from '@/components/StripePayment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    auth: {
        user: {
            name: string;
            onFreePlan: boolean;
        };
    };
}

export default function Billing({ auth }: Props) {
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const plans = {
        pro: {
            name: 'Pro Plan',
            price: 4.99, // $4.99
            features: ['Unlimited AI generations', 'Priority support', 'Advanced features', 'Custom styles'],
        },
    };

    return (
        <AppLayout>
            <Head title="Billing" />

            <div className="container py-8">
                <h1 className="mb-8 text-2xl font-bold">Billing & Subscription</h1>

                <Tabs defaultValue="pro" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="pro">Pro Plan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pro">
                        <Card>
                            <CardHeader>
                                <CardTitle>{plans.pro.name}</CardTitle>
                                <CardDescription>${(plans.pro.price / 100).toFixed(2)}/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <ul className="space-y-2">
                                        {plans.pro.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <svg
                                                    className="mr-2 h-5 w-5 text-green-500"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {auth.user.onFreePlan && (
                                        <div className="space-y-4">
                                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="stripe">Credit Card (Stripe)</SelectItem>
                                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {paymentMethod === 'stripe' && (
                                                <StripePayment
                                                    amount={plans.pro.price}
                                                    onSuccess={() => {
                                                        window.location.reload();
                                                    }}
                                                />
                                            )}

                                            {paymentMethod === 'mpesa' && (
                                                <MpesaPayment
                                                    amount={plans.pro.price}
                                                    onSuccess={() => {
                                                        window.location.reload();
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
