import { useEffect, useState } from 'react';

interface UseDashboardLoaderProps {
    userId: number;
    sessionTimeout?: number; // in milliseconds, default 1 hour
}

export function useDashboardLoader({ userId, sessionTimeout = 60 * 60 * 1000 }: UseDashboardLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasSeenLoader = localStorage.getItem(`hasSeenLoader_${userId}`);
        const sessionKey = `session_${userId}`;
        const currentSession = sessionStorage.getItem(sessionKey);
        
        // Debug logging (remove in production)
        console.log('Dashboard Welcome Screen Debug:', {
            userId,
            hasSeenLoader,
            currentSession,
            willShowWelcome: !currentSession || !hasSeenLoader
        });
        
        // Check if this is a new browser session (no sessionStorage key)
        // or if the user has never seen the welcome screen
        if (!currentSession || !hasSeenLoader) {
            // New session or first time user, show the welcome screen
            sessionStorage.setItem(sessionKey, 'active');
            // Keep isLoading as true to show the welcome screen
            console.log('Showing welcome screen for user:', userId);
        } else {
            // Same session and user has seen welcome screen, skip it
            setIsLoading(false);
            console.log('Skipping welcome screen for user:', userId);
        }
    }, [userId]);

    const handleWelcomeComplete = () => {
        // Mark that this user has seen the welcome screen
        localStorage.setItem(`hasSeenLoader_${userId}`, 'true');
        setIsLoading(false);
    };

    const resetWelcomeState = () => {
        // Clear the welcome screen state for this user (useful for testing or user preference)
        localStorage.removeItem(`hasSeenLoader_${userId}`);
        sessionStorage.removeItem(`session_${userId}`);
        setIsLoading(true);
    };

    return {
        isLoading,
        handleLoaderComplete: handleWelcomeComplete,
        resetLoaderState: resetWelcomeState,
    };
}
