import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head } from '@inertiajs/react';
import { Mail, MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function CampaignsCreate() {
    const [type, setType] = useState<'sms' | 'email'>('sms');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission
    };

    return (
        <>
            <Head title="Create Campaign" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Create Campaign</h1>
                    <p className="text-gray-600">Create a new SMS or email campaign</p>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Campaign Name</Label>
                                <Input id="name" placeholder="Enter campaign name" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Campaign Type</Label>
                                <Select value={type} onValueChange={(value: 'sms' | 'email') => setType(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select campaign type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sms">
                                            <div className="flex items-center">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                SMS Campaign
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="email">
                                            <div className="flex items-center">
                                                <Mail className="mr-2 h-4 w-4" />
                                                Email Campaign
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder={`Enter your ${type === 'sms' ? 'SMS' : 'email'} message`} rows={6} />
                            {type === 'sms' && (
                                <p className="text-sm text-gray-500">
                                    SMS messages are limited to 160 characters. Longer messages will be split into multiple parts.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="scheduled_at">Schedule Campaign</Label>
                                <Input id="scheduled_at" type="datetime-local" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_group">Contact Group</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select contact group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Contacts</SelectItem>
                                        <SelectItem value="customers">Customers</SelectItem>
                                        <SelectItem value="subscribers">Subscribers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline">
                                Save as Draft
                            </Button>
                            <Button type="submit">Create Campaign</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
