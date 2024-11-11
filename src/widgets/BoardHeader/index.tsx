import { RouteNames } from "@/app/providers/router/routeConfig"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Skeleton } from "@/shared/ui/Skeleton"
import { ArrowLeft, Images, Settings } from "lucide-react"
import { FC } from "react"
import { Link } from "react-router-dom"

interface Props {
    boardName?: string | undefined;
    isLoading: boolean;
}

export const BoardHeader: FC<Props> = ({ boardName, isLoading }) => {

    return (
        <div className="py-2 px-4 bg-neutral-100 dark:bg-slate-900">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Link to={RouteNames.BOARDS_PAGE}>
                        <ArrowLeft className="text-slate-700 dark:text-neutral-100" />
                    </Link>
                </div>
                <div className="ml-20 dark:text-white">
                    {isLoading ? <Skeleton className="w-10 h-3" /> : <>{boardName}</>}
                </div>
                <div className="flex gap-3">
                    <Button className="w-22">
                        Пригласить
                    </Button>
                    <Popover>
                        <PopoverTrigger>
                            <button>
                                <Settings className="text-slate-700 dark:text-neutral-100" />
                            </button>
                            <PopoverContent
                                align="center"
                                side="bottom"
                                className="flex flex-col gap-2"
                            >
                                <Input

                                    placeholder="Название доски"

                                />
                                <Button>Изменить</Button>
                                <Button className="bg-red-600">Удалить</Button>
                            </PopoverContent>
                        </PopoverTrigger>
                    </Popover>

                    <button>
                        <Images className="text-slate-700 dark:text-neutral-100" />
                    </button>
                </div>
            </div>

        </div>
    )
}
