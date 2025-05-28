import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Portal() {
    return (
        <AppLayout>
            <Head title="Subscription Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription Management</CardTitle>
                            <CardDescription>Manage your Pro subscription</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-green-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">Active Subscription</h3>
                                            <div className="mt-2 text-sm text-green-700">
                                                <p>You are currently on the Pro plan.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <h4 className="mb-2 font-medium">Subscription Details</h4>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Plan</dt>
                                            <dd className="font-medium">Pro</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Price</dt>
                                            <dd className="font-medium">$9.99/month</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Status</dt>
                                            <dd className="font-medium text-green-600">Active</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h4 className="mb-2 font-medium text-red-800">Danger Zone</h4>
                                    <p className="mb-4 text-sm text-red-700">
                                        Once you cancel your subscription, you'll still have access to Pro features until the end of your billing
                                        period.
                                    </p>
                                    <Button >Cancel Subscription</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
