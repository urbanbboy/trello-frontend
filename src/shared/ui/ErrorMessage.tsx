import { FC } from "react"

interface Props {
    message?: string;
}

export const ErrorMessage: FC<Props> = ({ message }) => {
    return (
        <div className="text-red-600 text-xs">
            {message}
        </div>
    )
}
