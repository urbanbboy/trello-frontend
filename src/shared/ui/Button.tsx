import * as React from 'react'
import { cn } from '../utils/classNames';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    'w-full h-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 border border-transparent',
                    className
                )}   
                ref={ref}
                {...props}
            />
        )
    }
);

Button.displayName = 'Button'

export { Button }