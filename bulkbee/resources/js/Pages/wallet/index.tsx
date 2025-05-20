import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CreditCard, History } from 'lucide-react';

export default function WalletIndex() {
    return (
        <>
            <Head title="Wallet" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={route('dashboard')} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold">Wallet</h1>
                    <p className="text-gray-600">Manage your wallet balance and transactions</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                                <p className="mt-2 text-3xl font-bold">KES 0.00</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <CreditCard className="text-primary h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full">Top Up Wallet</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Transaction History</p>
                                <p className="mt-2 text-3xl font-bold">0</p>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-3">
                                <History className="text-primary h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full">
                                View History
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">No recent transactions</p>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
