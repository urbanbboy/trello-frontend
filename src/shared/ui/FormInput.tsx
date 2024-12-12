/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { forwardRef } from "react";

import { FormError } from "./FormError";
import { Input } from "./Input";
import { cn } from "../utils/classNames";
import { Label } from "./Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface FormInputProps extends InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string | undefined;
    className?: string;
    defaultValue?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            type,
            placeholder,
            required,
            disabled,
            error,
            className,
            defaultValue = "",
            ...props
        },
        ref
    ) => {

        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        defaultValue={defaultValue}
                        ref={ref}
                        required={required}
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}
                        className={cn("text-sm px-2 py-2 h-10", className)}
                        aria-describedby={`${id}-error`}
                        {...props}
                    />
                </div>
                <FormError id={id} error={error} />
            </div>
        );
    }
);

FormInput.displayName = "FormInput";