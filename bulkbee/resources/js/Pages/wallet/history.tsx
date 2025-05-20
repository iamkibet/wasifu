import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, History } from 'lucide-react';

export default function WalletHistory() {
    return (
        <>
            <Head title="Transaction History" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={route('wallet.index')} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Wallet
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold">Transaction History</h1>
                    <p className="text-gray-600">View your past transactions</p>
                </div>

                <Card className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <History className="text-primary mr-2 h-5 w-5" />
                            <h2 className="text-xl font-semibold">All Transactions</h2>
                        </div>
                        <Button variant="outline">Export</Button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">No transactions found</p>
                    </div>
                </Card>
            </div>
        </>
    );
}
