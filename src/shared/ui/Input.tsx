import { memo } from "react"
import * as React from "react";
import { cn } from "../utils/classNames";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = memo(
    React.forwardRef<HTMLInputElement, InputProps>(
        ({ className, type, ...props }, ref) => {
            return (
                <input
                    type={type}
                    autoFocus={false}
                    className={cn(
                        "w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition delay-100 bg-white dark:bg-slate-200",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            )
        }
    )
)
Input.displayName = "Input"

export { Input }