import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface StripePaymentProps {
    amount: number;
    onSuccess?: () => void;
    disabled?: boolean;
}

export default function StripePayment({ amount, onSuccess, disabled }: StripePaymentProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { post } = useForm();

    const handlePayment = () => {
        setIsProcessing(true);

        post(route('stripe.checkout'), {
            preserveScroll: true,
            onError: (errors) => {
                toast.error(errors.message || 'Failed to create checkout session');
                setIsProcessing(false);
            },
        });
    };

    return (
        <div className="space-y-4">
            <div className="text-sm text-gray-600">You will be redirected to Stripe to complete your payment securely.</div>

            <Button onClick={handlePayment} disabled={disabled || isProcessing} className="w-full">
                {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
            </Button>
        </div>
    );
}
