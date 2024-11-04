import { RouteNames } from "@/app/providers/router/routeConfig"
import { Button } from "@/shared/ui/Button"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="text-5xl">404</div>
                <div className="mb-3">
                    Страница не найдена
                </div>
                <Button>
                    <Link to={RouteNames.BOARDS_PAGE}>
                        Вернуться на главную
                    </Link>
                </Button>
            </div>
        </div>
    )
}
