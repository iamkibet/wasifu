import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

interface ProfileCompletionBannerProps {
    completion: number;
}

export default function ProfileCompletionBanner({ completion }: ProfileCompletionBannerProps) {
    return (
        <div className="border-b border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Your profile is {completion}% complete. Complete your profile to unlock all features.
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="border-yellow-200 bg-white text-yellow-800 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 dark:hover:bg-yellow-900"
                    >
                        <Link href={route('profile.add')}>Complete Profile</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
