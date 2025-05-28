import { Check, FileText, Rocket, Sparkles, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoaderSequenceProps {
    onComplete: () => void;
}

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function LoaderSequence({ onComplete }: LoaderSequenceProps) {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const steps: Step[] = [
        {
            icon: <FileText className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Analyzing Your Profile',
            description: 'Extracting key information from your experience',
        },
        {
            icon: <Target className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Optimizing Content',
            description: 'Aligning your skills with industry standards',
        },
        {
            icon: <Sparkles className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Enhancing Impact',
            description: 'Crafting compelling achievements and metrics',
        },
        {
            icon: <Rocket className="h-6 w-6 text-white sm:h-8 sm:w-8" />,
            title: 'Final Polish',
            description: 'Perfecting ATS compatibility and formatting',
        },
    ];

    useEffect(() => {
        if (step <= 4) {
            const timer = setTimeout(() => {
                if (step < 4) {
                    setStep((prev) => prev + 1);
                    setProgress(step * 25);
                } else {
                    const interval = setInterval(() => {
                        setProgress((prev) => {
                            if (prev >= 100) {
                                clearInterval(interval);
                                setTimeout(() => {
                                    setIsVisible(false);
                                    setTimeout(onComplete, 300);
                                }, 500);
                                return 100;
                            }
                            return Math.min(prev + 100 / 40, 100);
                        });
                    }, 50);
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [step, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xl transition-opacity duration-300 dark:bg-gray-900/95 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="w-full max-w-2xl px-4 sm:px-6">
                <div className="relative space-y-6 sm:space-y-8">
                    {/* Header Section */}
                    <div className="space-y-2 text-center">
                        <h1 className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl dark:from-blue-600 dark:to-purple-600">
                            Get your Resume and
                        </h1>
                        <p className="text-base text-gray-600 sm:text-lg dark:text-gray-400">Stand out from the crowd</p>
                    </div>

                    {/* Steps Progress */}
                    <div className="relative flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
                        {/* Connecting Line - Only visible on desktop */}
                        <div className="absolute top-6 right-0 left-0 -z-10 hidden h-0.5 bg-gray-200 sm:block dark:bg-gray-800" />

                        {steps.map((s, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-row items-center transition-all duration-300 sm:flex-col ${
                                    index + 1 === step ? 'scale-105 sm:scale-110' : 'scale-100'
                                }`}
                            >
                                <div
                                    className={`relative rounded-full p-2 transition-all duration-300 sm:p-3 ${
                                        index + 1 <= step
                                            ? 'bg-gradient-to-br from-orange-600 to-amber-600 shadow-lg dark:from-blue-700 dark:to-purple-800'
                                            : 'bg-gray-200 dark:bg-gray-800'
                                    }`}
                                >
                                    {s.icon}
                                    {index + 1 < step && (
                                        <div className="absolute -top-1 -right-1 rounded-full bg-green-500 p-0.5 shadow-md sm:-top-2 sm:-right-2 sm:p-1">
                                            <Check className="h-2 w-2 text-white sm:h-3 sm:w-3" />
                                        </div>
                                    )}
                                </div>
                                <div className="ml-3 text-left sm:mt-4 sm:ml-0 sm:text-center">
                                    <h3
                                        className={`text-xs font-semibold sm:text-sm ${
                                            index + 1 === step ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {s.title}
                                    </h3>
                                    <p
                                        className={`mt-0.5 text-[10px] sm:mt-1 sm:text-xs ${
                                            index + 1 === step ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                                        }`}
                                    >
                                        {s.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mx-auto h-2 w-3/4 overflow-hidden rounded-full bg-gray-100 shadow-inner dark:bg-gray-800/50">
                        <div
                            className="absolute h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 transition-all duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-white/30" />
                        </div>
                        {progress >= 100 && (
                            <div className="animate-scale-in absolute top-1/2 right-1 -translate-y-1/2">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-2 w-2 animate-pulse rounded-full bg-purple-500"
                                style={{
                                    transform: `rotate(${i * 30}deg) translateX(100px)`,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
