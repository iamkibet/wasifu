import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MpesaPaymentProps {
    amount: number;
    onSuccess?: (paymentMethodId: string) => void;
    disabled?: boolean;
}

export default function MpesaPayment({ amount, onSuccess, disabled }: MpesaPaymentProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
    const { post } = useForm();
    const { flash } = usePage().props as any;

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            if (flash.success.includes('Payment initiated successfully')) {
                setCheckoutRequestId('pending');
                startPolling();
            }
        }
        if (flash?.error) {
            toast.error(flash.error);
            setIsProcessing(false);
        }
    }, [flash]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        post(route('mpesa.initiate'), {
            phoneNumber,
            preserveScroll: true,
            onSuccess: () => {
                // Flash messages will be handled by the useEffect
            },
            onError: (errors) => {
                toast.error(errors.message || 'Failed to initiate payment');
                setIsProcessing(false);
            },
        });
    };

    const startPolling = () => {
        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(route('mpesa.check-status'));
                const data = await response.json();

                if (data.success) {
                    if (data.status === 'completed') {
                        clearInterval(pollInterval);
                        toast.success('Payment successful!');
                        onSuccess?.('mpesa');
                    } else if (data.status === 'failed') {
                        clearInterval(pollInterval);
                        toast.error(data.message || 'Payment failed');
                        setIsProcessing(false);
                    }
                } else {
                    clearInterval(pollInterval);
                    toast.error(data.message || 'Failed to check payment status');
                    setIsProcessing(false);
                }
            } catch (error) {
                clearInterval(pollInterval);
                toast.error('Failed to check payment status');
                setIsProcessing(false);
            }
        }, 5000); // Poll every 5 seconds

        // Stop polling after 5 minutes
        setTimeout(() => {
            clearInterval(pollInterval);
            if (isProcessing) {
                toast.error('Payment timeout. Please try again.');
                setIsProcessing(false);
            }
        }, 300000);
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>M-Pesa Payment</CardTitle>
                <CardDescription>Enter your M-Pesa phone number to proceed with the payment</CardDescription>
            </CardHeader>
            <CardContent>
                {!checkoutRequestId ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">M-Pesa Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="e.g., 254712345678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={isProcessing || disabled}
                                required
                            />
                            <p className="text-sm text-gray-500">Enter the phone number registered with M-Pesa</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Amount to Pay</p>
                            <p className="text-2xl font-bold">KES {Math.ceil(amount / 100)}</p>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4 text-center">
                        <div className="animate-pulse">
                            <p className="text-lg font-semibold">Waiting for payment confirmation...</p>
                            <p className="text-sm text-gray-500">Please complete the payment on your phone</p>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                {!checkoutRequestId ? (
                    <Button className="w-full" type="submit" disabled={isProcessing || disabled || !phoneNumber}>
                        {isProcessing ? 'Processing...' : 'Pay with M-Pesa'}
                    </Button>
                ) : (
                    <Button className="w-full" variant="outline" onClick={() => setCheckoutRequestId(null)}>
                        Cancel Payment
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
