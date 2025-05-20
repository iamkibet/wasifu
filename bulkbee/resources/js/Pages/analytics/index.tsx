import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BarChart, MessageSquare, Users } from 'lucide-react';

export default function AnalyticsIndex() {
    return (
        <>
            <Head title="Analytics" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={route('dashboard')} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold">Analytics</h1>
                    <p className="text-gray-600">View your campaign performance and statistics</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Messages Sent</p>
                                <p className="mt-2 text-3xl font-bold">0</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <MessageSquare className="text-primary h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                                <p className="mt-2 text-3xl font-bold">0</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <Users className="text-primary h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                                <p className="mt-2 text-3xl font-bold">0%</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <BarChart className="text-primary h-6 w-6" />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Recent Campaign Performance</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">No campaign data available</p>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
