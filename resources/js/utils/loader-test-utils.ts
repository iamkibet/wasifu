/**
 * Utility functions for testing the dashboard welcome screen
 * These should only be used in development/testing
 */

export const clearAllWelcomeState = () => {
    // Clear all localStorage items related to welcome screen
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('hasSeenLoader_') || key.startsWith('lastLoginTime_')) {
            localStorage.removeItem(key);
        }
    });
    
    // Clear all sessionStorage items related to sessions
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
        if (key.startsWith('session_')) {
            sessionStorage.removeItem(key);
        }
    });
    
    console.log('✅ All welcome screen state cleared. Next login will show the welcome screen.');
};

export const clearUserWelcomeState = (userId: number) => {
    localStorage.removeItem(`hasSeenLoader_${userId}`);
    sessionStorage.removeItem(`session_${userId}`);
    console.log(`✅ Welcome screen state cleared for user ${userId}. Next login will show the welcome screen.`);
};

export const getWelcomeState = (userId: number) => {
    const hasSeenWelcome = localStorage.getItem(`hasSeenLoader_${userId}`);
    const currentSession = sessionStorage.getItem(`session_${userId}`);
    
    return {
        userId,
        hasSeenWelcome: !!hasSeenWelcome,
        currentSession: !!currentSession,
        willShowWelcome: !currentSession || !hasSeenWelcome
    };
};

// Make functions available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    (window as any).clearAllWelcomeState = clearAllWelcomeState;
    (window as any).clearUserWelcomeState = clearUserWelcomeState;
    (window as any).getWelcomeState = getWelcomeState;
    
    console.log('🔧 Welcome screen test utilities available:');
    console.log('  - clearAllWelcomeState() - Clear all welcome screen state');
    console.log('  - clearUserWelcomeState(userId) - Clear state for specific user');
    console.log('  - getWelcomeState(userId) - Check current welcome screen state');
}
