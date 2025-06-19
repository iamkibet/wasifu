import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardHeroProps {
    userName: string;
    isPro: boolean;
    subscriptionName: string;
}

const tips = [
    'Customize your resume for each job application',
    'Keep your profile updated with new skills',
    'Use action verbs to describe your achievements',
    'Highlight quantifiable results in your experience',
];

export default function DashboardHero({ userName, isPro, subscriptionName }: DashboardHeroProps) {
    const [currentTip, setCurrentTip] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentTip((prev) => (prev + 1) % tips.length);
                setIsTransitioning(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-8">
            <Card className="border-none bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                                Welcome back, {userName}! 👋
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Your resume crafting journey at a glance</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span
                                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                                    isPro
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                            >
                                {isPro ? <Zap className="mr-2 h-4 w-4" /> : null}
                                {subscriptionName}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="relative h-12 overflow-hidden">
                            <div
                                className={`absolute inset-0 flex items-center transition-all duration-300 ${
                                    isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                                }`}
                            >
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                    <BadgeCheck className="h-5 w-5 text-indigo-500" />
                                    <span className="text-sm font-medium">{tips[currentTip]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
