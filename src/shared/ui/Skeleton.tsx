import { FC } from "react"
import { cn } from "../utils/classNames"

interface Props {
    className?: string;
}

export const Skeleton: FC<Props> = ({ className }) => {

    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className={cn(
                'bg-gray-300 rounded-md dark:bg-gray-700',
                className
            )}></div>
        </div>
    )
}
