/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ea580c', // orange-600
                secondary: '#1e293b', // slate-800
            },
            fontFamily: {
                sans: ['Lexend', 'sans-serif'],
            },
            animation: {
                'typing-cursor': 'typing-cursor 1s infinite',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                float: 'float 2s ease-in-out infinite',
                'scale-in': 'scale-in 0.3s ease-out forwards',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'typing-cursor': {
                    '0%, 100%': { 'border-color': 'transparent' },
                    '50%': { 'border-color': 'currentColor' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(-5px)' },
                    '50%': { transform: 'translateY(5px)' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
                pulse: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.5)' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
