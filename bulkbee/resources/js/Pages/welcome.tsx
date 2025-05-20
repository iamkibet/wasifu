import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Clock, Mail, MessageSquare, Shield, Smartphone, Users, Zap } from 'lucide-react';

const features = [
    {
        title: 'Bulk SMS',
        description: 'Send messages to thousands of recipients instantly with our reliable SMS gateway.',
        icon: Smartphone,
    },
    {
        title: 'Email Marketing',
        description: 'Create and send beautiful email campaigns with our easy-to-use email builder.',
        icon: Mail,
    },
    {
        title: 'Contact Management',
        description: 'Organize and manage your contacts efficiently with smart grouping and segmentation.',
        icon: Users,
    },
    {
        title: 'Scheduled Campaigns',
        description: 'Plan and schedule your campaigns in advance for optimal delivery times.',
        icon: Clock,
    },
    {
        title: 'Real-time Analytics',
        description: 'Track campaign performance with detailed analytics and reporting.',
        icon: BarChart,
    },
    {
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security and 99.9% uptime guarantee for your peace of mind.',
        icon: Shield,
    },
];

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-r" />
                    <div className="relative container mx-auto px-4 py-24">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <div className="flex items-center space-x-3">
                                <MessageSquare className="text-primary h-10 w-10" />
                                <h1 className="text-5xl font-bold">BulkBee</h1>
                            </div>
                            <h2 className="max-w-3xl text-4xl leading-tight font-bold">Powerful Bulk SMS & Email Marketing Platform for Kenya</h2>
                            <p className="max-w-2xl text-xl text-gray-600">
                                Reach your audience effectively with our all-in-one marketing platform. Send bulk SMS and emails at just 1 KES per
                                message.
                            </p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button size="lg" variant="outline">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-4 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold">Everything You Need to Reach Your Audience</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Our platform provides all the tools you need to create, manage, and track your marketing campaigns.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="group relative overflow-hidden p-8 transition-all hover:shadow-lg">
                                <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <div className="mb-6 flex items-center space-x-4">
                                        <div className="bg-primary/10 rounded-lg p-3">
                                            <feature.icon className="text-primary h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-gray-50 py-24">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
                            <p className="mx-auto max-w-2xl text-gray-600">Pay only for what you use with our pay-as-you-go pricing model.</p>
                        </div>
                        <div className="mx-auto max-w-2xl">
                            <Card className="relative overflow-hidden p-8">
                                <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br" />
                                <div className="relative z-10">
                                    <div className="text-center">
                                        <h3 className="mb-2 text-2xl font-bold">Pay-as-you-go</h3>
                                        <p className="mb-4 text-4xl font-bold">
                                            1 KES <span className="text-lg text-gray-600">per message</span>
                                        </p>
                                        <ul className="mb-8 space-y-4 text-left">
                                            <li className="flex items-center space-x-2">
                                                <Zap className="text-primary h-5 w-5" />
                                                <span>Bulk SMS & Email Marketing</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <Zap className="text-primary h-5 w-5" />
                                                <span>Contact Management</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <Zap className="text-primary h-5 w-5" />
                                                <span>Campaign Scheduling</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <Zap className="text-primary h-5 w-5" />
                                                <span>Real-time Analytics</span>
                                            </li>
                                        </ul>
                                        <Link href={route('register')}>
                                            <Button size="lg" className="w-full">
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="container mx-auto px-4 py-24">
                    <div className="bg-primary relative overflow-hidden rounded-lg p-8 text-center text-white">
                        <div className="from-primary/90 to-secondary/90 absolute inset-0 bg-gradient-to-br" />
                        <div className="relative z-10">
                            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl">
                                Join thousands of businesses using BulkBee to reach their customers effectively.
                            </p>
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary" className="text-primary hover:bg-white/90">
                                    Create Free Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
