import { Check, FileText, Rocket, Sparkles, Target, ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
    userName: string;
    onComplete: () => void;
}

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    completed?: boolean;
}

export default function WelcomeScreen({ userName, onComplete }: WelcomeScreenProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const features: Feature[] = [
        {
            icon: <FileText className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'AI-Powered Resume Builder',
            description: 'Create professional resumes in minutes with our intelligent AI technology.',
        },
        {
            icon: <Target className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'ATS-Optimized Templates',
            description: 'Choose from industry-specific templates that pass ATS screening.',
        },
        {
            icon: <Sparkles className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Smart Content Enhancement',
            description: 'Get suggestions to improve your resume content and impact.',
        },
        {
            icon: <Rocket className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Export & Share',
            description: 'Download in multiple formats and share with potential employers.',
        },
    ];

    const handleNext = () => {
        if (currentStep < features.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete the welcome screen
            setIsVisible(false);
            setTimeout(onComplete, 300);
        }
    };

    const handleSkip = () => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl transition-opacity duration-300 dark:bg-gray-900/95 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Skip welcome screen"
            >
                <X className="h-6 w-6" />
            </button>

            <div className="w-full max-w-4xl px-4 sm:px-6">
                <div className="relative space-y-8">
                    {/* Welcome Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-100/50 bg-white/80 px-4 py-2 text-sm font-semibold tracking-tight text-amber-600 backdrop-blur-sm dark:border-orange-400/20 dark:bg-gray-900/80 dark:text-orange-300">
                            <Sparkles className="h-4 w-4 fill-orange-400/20 stroke-orange-500" />
                            <span>Welcome to Wasifu</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                            Welcome, {userName}! 👋
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            Let's get you started with creating your perfect resume. Here's what you can do with Wasifu:
                        </p>
                    </div>

                    {/* Feature Showcase */}
                    <div className="relative">
                        {/* Progress Indicator */}
                        <div className="flex justify-center mb-8">
                            <div className="flex space-x-2">
                                {features.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                            index <= currentStep
                                                ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Current Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
                            <div className="text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                                        {features[currentStep].icon}
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {features[currentStep].title}
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                        {features[currentStep].description}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className="pt-4">
                                    {currentStep < features.length - 1 ? (
                                        <button
                                            onClick={handleNext}
                                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-orange-700 hover:to-amber-700 hover:shadow-xl"
                                        >
                                            Next
                                            <ArrowRight className="h-5 w-5" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNext}
                                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                                        >
                                            Get Started
                                            <Rocket className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Feature Preview Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`rounded-lg border p-4 transition-all duration-300 ${
                                        index === currentStep
                                            ? 'border-orange-300 bg-orange-50 dark:border-orange-600 dark:bg-orange-900/20'
                                            : index < currentStep
                                            ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20'
                                            : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                                index <= currentStep
                                                    ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                                                    : 'bg-gray-200 dark:bg-gray-600'
                                            }`}
                                        >
                                            {index < currentStep ? (
                                                <Check className="h-4 w-4 text-white" />
                                            ) : (
                                                <div className="h-4 w-4 text-white">
                                                    {feature.icon}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {feature.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Step {currentStep + 1} of {features.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
