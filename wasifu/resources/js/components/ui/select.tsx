import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${className}`}
                {...props}
            >
                {children}
            </select>
        );
    }
);

Select.displayName = 'Select';

export { Select };
