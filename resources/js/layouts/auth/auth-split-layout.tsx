import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Sparkles, FileText, Users, Zap } from 'lucide-react';

interface AuthSplitLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthSplitLayoutProps>) {
    const features = [
        {
            icon: FileText,
            title: 'AI-Powered Resume Builder',
            description: 'Create professional resumes in minutes with our intelligent AI technology.',
        },
        {
            icon: Zap,
            title: 'Instant Generation',
            description: 'Tailored resumes and cover letters generated instantly for any job.',
        },
        {
            icon: Users,
            title: 'ATS-Friendly Format',
            description: 'Optimized for Applicant Tracking Systems to maximize your chances.',
        },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding & Features */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-10" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-600/90 to-orange-700/90" />
                
                <div className="relative z-10 flex flex-col justify-between p-12">
                    {/* Top Section - Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                            <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Wasifu</span>
                    </div>

                    {/* Middle Section - Hero Content */}
                    <div className="max-w-md">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                                <Sparkles className="h-4 w-4 fill-white/20 stroke-white" />
                                <span>Professional Resume Builder</span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl font-extrabold text-white mb-4">
                            Craft Your Career Story
                            <span className="block text-amber-200">in Minutes</span>
                        </h1>
                        
                        <p className="text-xl text-orange-100 leading-relaxed">
                            Transform your professional experience into compelling resumes that stand out. 
                            Our AI-powered platform helps you create polished, ATS-friendly documents.
                        </p>
                    </div>

                    {/* Bottom Section - Features */}
                    <div className="space-y-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-orange-100">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-amber-300/20 blur-2xl" />
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">
                <div className="mx-auto w-full max-w-sm">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        <Link href={route('home')} className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                <AppLogoIcon className="h-6 w-6 fill-current text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">Wasifu</span>
                        </Link>
                    </div>

                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
                    </div>

                    {/* Form Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                        {children}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link 
                                href={route('register')} 
                                className="font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}