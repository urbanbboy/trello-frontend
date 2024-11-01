import * as React from 'react'
import { cn } from '../utils/classNames';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200',
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