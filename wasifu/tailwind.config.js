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
            },
            keyframes: {
                'typing-cursor': {
                    '0%, 100%': { 'border-color': 'transparent' },
                    '50%': { 'border-color': 'currentColor' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
