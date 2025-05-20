import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Plus } from 'lucide-react';

export default function CampaignsIndex() {
    return (
        <>
            <Head title="Campaigns" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link href={route('dashboard')} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Campaigns</h1>
                            <p className="text-gray-600">Manage your email and SMS campaigns</p>
                        </div>
                        <Button asChild>
                            <Link href={route('campaigns.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Campaign
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Mail className="mr-2 h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">All Campaigns</h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">No campaigns found</p>
                    </div>
                </Card>
            </div>
        </>
    );
}
