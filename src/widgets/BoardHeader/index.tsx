import { RouteNames } from "@/app/providers/router/routeConfig"
import { Button } from "@/shared/ui/Button"
import { Logo } from "@/shared/ui/Logo"
import { ArrowLeft, Images, Settings } from "lucide-react"
import { Link } from "react-router-dom"

export const BoardHeader = () => {
    return (
        <div className="py-2 px-4 bg-neutral-200">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Link to={RouteNames.BOARDS_PAGE}>
                        <ArrowLeft />
                    </Link>
                </div>
                <div className="ml-20">
                    <Logo />
                </div>
                <div className="flex gap-3">
                    <Button className="w-22">
                        Пригласить
                    </Button>
                    <button><Settings /></button>
                    <button><Images /></button>
                </div>
            </div>

        </div>
    )
}
