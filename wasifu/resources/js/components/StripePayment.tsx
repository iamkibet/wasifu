import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface StripePaymentProps {
    amount: number;
    onSuccess?: () => void;
    disabled?: boolean;
}

export default function StripePayment({ amount, onSuccess, disabled }: StripePaymentProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        try {
            setIsProcessing(true);
            
            const response = await fetch(route('stripe.checkout'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Invalid response from server');
            }

        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to process payment. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-sm text-gray-600">
                You will be redirected to Stripe to complete your payment securely.
            </div>
            
            <Button
                onClick={handlePayment}
                disabled={disabled || isProcessing}
                className="w-full"
            >
                {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
            </Button>
        </div>
    );
}
