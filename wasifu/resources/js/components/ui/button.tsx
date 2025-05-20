import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Link } from '@inertiajs/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', asChild = false, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center px-4 py-2 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
        const variantStyles = {
            default: 'bg-primary text-white border-transparent hover:bg-primary-dark focus:ring-primary',
            outline: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-primary',
        };

        const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

        if (asChild) {
            return (
                <Link
                    ref={ref as any}
                    className={classes}
                    {...props as any}
                />
            );
        }

        return (
            <button
                ref={ref}
                className={classes}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
