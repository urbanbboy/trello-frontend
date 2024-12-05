"use client";

import { cn } from "@/shared/utils/classNames";
import { KeyboardEventHandler, forwardRef } from "react";


interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        {
            id,
            placeholder,
            required,
            disabled,
            onBlur,
            onClick,
            onKeyDown,
            className,
            defaultValue,
        },
        ref
    ) => {

        return (
            <div className="space-y-2 w-full">
                <div className="space-y-1 w-full">
                    <textarea
                        onKeyDown={onKeyDown}
                        onBlur={onBlur}
                        onClick={onClick}
                        ref={ref}
                        required={required}
                        placeholder={placeholder}
                        name={id}
                        id={id}
                        disabled={disabled}
                        className={cn(
                            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm rounded-md text-slate-500 dark:text-slate-200",
                            className
                        )}
                        defaultValue={defaultValue}
                    />
                </div>
            </div>
        );
    }
);

FormTextarea.displayName = "FormTextarea";
