import HomeLayout from '@/Layouts/HomeLayout';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Plans() {
    return (
        <HomeLayout title="Pricing Plans">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Choose the perfect plan for your needs
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Start with our free plan and upgrade as you grow. All plans include our core features.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                        {/* Free Plan */}
                        <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 xl:p-10">
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">Free</h3>
                                    <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                                        Most popular
                                    </p>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Perfect for getting started</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">$0</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">/month</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                    {[
                                        'Basic resume templates',
                                        'AI-powered suggestions',
                                        'Limited downloads (3/month)',
                                        'Basic cover letter templates',
                                        'Email support',
                                    ].map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckCircle2 className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href="/register"
                                className="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Get started
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="flex flex-col justify-between rounded-3xl bg-gray-900 p-8 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 xl:p-10">
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
                                    <p className="rounded-full bg-blue-400/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-400">
                                        Best value
                                    </p>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-300">For serious job seekers</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-white">$19</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                                    {[
                                        'All Free features',
                                        'Unlimited downloads',
                                        'Premium templates',
                                        'Advanced AI features',
                                        'Priority support',
                                        'Custom branding',
                                        'Resume analytics',
                                        'Cover letter variations',
                                    ].map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckCircle2 className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href="/subscribe"
                                className="mt-8 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Subscribe now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-100/10">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">Frequently asked questions</h2>
                        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-100/10">
                            {[
                                {
                                    question: 'What payment methods do you accept?',
                                    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
                                },
                                {
                                    question: 'Can I cancel my subscription?',
                                    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
                                },
                                {
                                    question: 'Do you offer refunds?',
                                    answer: 'We offer a 14-day money-back guarantee for all paid plans.',
                                },
                                {
                                    question: 'Can I switch plans later?',
                                    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
                                },
                            ].map((faq) => (
                                <div key={faq.question} className="pt-6">
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{faq.question}</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to boost your job search?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Start creating professional resumes and cover letters that get you noticed.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/register"
                                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </Link>
                            <Link href="/contact" className="text-base font-semibold leading-6 text-white">
                                Contact sales <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
} 