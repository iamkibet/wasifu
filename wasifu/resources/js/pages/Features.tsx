import HomeLayout from '@/Layouts/HomeLayout';
import { Sparkles, FileText, Download, Target,  Zap, Shield, } from 'lucide-react';

export default function Features() {
    return (
        <HomeLayout title="Features">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Powerful features to boost your job search
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our AI-powered platform provides everything you need to create professional resumes and cover letters that stand out.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Features */}
            <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: 'AI-Powered Generation',
                                    description: 'Our advanced AI analyzes job descriptions and creates tailored resumes and cover letters that highlight your most relevant experience.',
                                    icon: Sparkles,
                                },
                                {
                                    name: 'Smart Templates',
                                    description: 'Choose from a variety of professional templates designed to make your application stand out.',
                                    icon: FileText,
                                },
                                {
                                    name: 'PDF Export',
                                    description: 'Download your documents in professional PDF format, ready to submit to any employer.',
                                    icon: Download,
                                },
                                {
                                    name: 'Job Targeting',
                                    description: 'Optimize your documents for specific job descriptions to increase your chances of getting noticed.',
                                    icon: Target,
                                },
                                {
                                    name: 'Real-time Suggestions',
                                    description: 'Get instant feedback and suggestions to improve your documents as you write.',
                                    icon: Zap,
                                },
                                {
                                    name: 'Privacy First',
                                    description: 'Your data is encrypted and secure. We never share your information with third parties.',
                                    icon: Shield,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
                                    <feature.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                                    <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                        {feature.name}
                                    </h3>
                                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">How it works</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Create your perfect resume in minutes
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    name: 'Create your profile',
                                    description: 'Enter your work experience, education, and skills to build your professional profile.',
                                },
                                {
                                    step: '02',
                                    name: 'Add job description',
                                    description: 'Paste the job description youre applying for, and our AI will analyze the requirements.',
                                },
                                {
                                    step: '03',
                                    name: 'Generate & customize',
                                    description: 'Get AI-generated documents tailored to the position, then customize them to your liking.',
                                },
                            ].map((step) => (
                                <div key={step.step} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                            {step.step}
                                        </span>
                                        {step.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">{step.description}</p>
                                    </dd>
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
                            <a
                                href="/register"
                                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </a>
                            <a href="/plans" className="text-base font-semibold leading-6 text-white">
                                View pricing <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
} 