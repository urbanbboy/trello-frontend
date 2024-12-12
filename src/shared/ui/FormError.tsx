import { XCircle } from "lucide-react";

interface FormErrorsProps {
    id: string;
    error?: string | undefined;
}

export const FormError = ({ id, error }: FormErrorsProps) => {
    if (!error) {
        return null;
    }

    return (
        <div
            id={`${id}-error`}
            aria-live="polite"
            className="mt-2 text-xs text-rose-500"
        >
            {error && (
                <div
                    className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
                >
                    <XCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )

            }
        </div>
    );
};
