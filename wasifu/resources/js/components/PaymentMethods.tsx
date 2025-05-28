import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import MpesaPayment from './MpesaPayment';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PaymentMethodsProps {
    amount: number;
    onSuccess?: (paymentMethodId: string) => void;
    disabled?: boolean;
}

export default function PaymentMethods({ amount, onSuccess, disabled }: PaymentMethodsProps) {
    const [activeTab, setActiveTab] = useState('stripe');
    const { post } = useForm({
        amount: amount,
    });

    const handleStripePayment = () => {
        post(route('stripe.checkout'), {
            onSuccess: (page) => {
                const url = (page.props as { url: string }).url;
                window.location.href = url;
            },
        });
    };

    const handlePayPalPayment = () => {
        post(route('paypal.checkout'), {
            onSuccess: (page) => {
                const url = (page.props as { url: string }).url;
                window.location.href = url;
            },
        });
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="stripe">Stripe</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    </TabsList>
                    <TabsContent value="stripe">
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Pay securely with your credit card</p>
                            <Button className="w-full" onClick={handleStripePayment}>
                                Pay with Stripe
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="paypal">
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                            <Button className="w-full" onClick={handlePayPalPayment}>
                                Pay with PayPal
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="mpesa">
                        <MpesaPayment amount={amount} onSuccess={() => onSuccess?.('mpesa')} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
