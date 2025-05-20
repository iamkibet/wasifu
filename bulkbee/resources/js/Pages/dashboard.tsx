import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, MessageSquare, Users, Wallet } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's an overview of your account.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                                <p className="mt-2 text-3xl font-bold">KES 0.00</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <Wallet className="text-primary h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href={route('wallet.index')}>
                                <Button variant="outline" className="w-full">
                                    Top Up
                                </Button>
                            </Link>
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
                        <div className="mt-4">
                            <Link href={route('contacts.index')}>
                                <Button variant="outline" className="w-full">
                                    Manage Contacts
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                                <p className="mt-2 text-3xl font-bold">0</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <MessageSquare className="text-primary h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href={route('campaigns.index')}>
                                <Button variant="outline" className="w-full">
                                    View Campaigns
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Message Analytics</p>
                                <p className="mt-2 text-3xl font-bold">0%</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <BarChart className="text-primary h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href={route('analytics.index')}>
                                <Button variant="outline" className="w-full">
                                    View Analytics
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Recent Campaigns</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">No recent campaigns</p>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">No recent transactions</p>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
