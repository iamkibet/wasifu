import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return (
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-orange-500', className)}>
            <Sparkles className="h-5 w-5 text-white" />
        </div>
    );
}
