import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Props {
    auth: {
        user: {
            onFreePlan: boolean;
        };
    };
}

export default function Index({ auth }: Props) {
    return (
        <>
            <Head title="Subscription Plans" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
                        <p className="text-gray-600">Select the plan that best fits your needs</p>
                    </div>

                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Free Plan */}
                        <Card className="p-8">
                            <div className="text-center">
                                <h2 className="mb-2 text-2xl font-semibold">Free</h2>
                                <p className="mb-4 text-4xl font-bold">$0</p>
                                <p className="mb-6 text-gray-600">Perfect for trying out our service</p>
                            </div>

                            <ul className="mb-8 space-y-4">
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    2 generations per month
                                </li>
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Basic resume templates
                                </li>
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    AI-powered content
                                </li>
                            </ul>

                            <Button className="w-full" variant={auth.user.onFreePlan ? 'outline' : 'default'} disabled={auth.user.onFreePlan}>
                                {auth.user.onFreePlan ? 'Current Plan' : 'Get Started'}
                            </Button>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="border-primary border-2 p-8">
                            <div className="text-center">
                                <h2 className="mb-2 text-2xl font-semibold">Pro</h2>
                                <p className="mb-4 text-4xl font-bold">$9.99</p>
                                <p className="mb-6 text-gray-600">For professionals who need more</p>
                            </div>

                            <ul className="mb-8 space-y-4">
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Unlimited generations
                                </li>
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Premium templates
                                </li>
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    PDF downloads
                                </li>
                                <li className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Priority support
                                </li>
                            </ul>

                            <div className="space-y-4">
                                <Button className="w-full" variant={!auth.user.onFreePlan ? 'outline' : 'default'} asChild={!auth.user.onFreePlan}>
                                    {!auth.user.onFreePlan ? 'Current Plan' : <Link href={route('billing.subscribe')}>Upgrade to Pro</Link>}
                                </Button>

                                {auth.user.onFreePlan && (
                                    <div className="text-center text-sm text-gray-500">
                                        <p>Available payment methods:</p>
                                        <div className="mt-2 flex justify-center space-x-4">
                                            <img src="/images/stripe.svg" alt="Stripe" className="h-6" />
                                            <img src="/images/paypal.svg" alt="PayPal" className="h-6" />
                                            <img src="/images/mpesa.svg" alt="M-Pesa" className="h-6" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
