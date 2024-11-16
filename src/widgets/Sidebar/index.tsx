import { LogOut, Settings, Table, User } from "lucide-react"
import { Nav } from "./Nav"
import { RouteNames } from "@/app/providers/router/routeConfig"
import { Button } from "@/shared/ui/Button"
import { useLogoutMutation } from "@/entities/User/model/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/entities/User"

export const Sidebar = () => {
    const [userLogout] = useLogoutMutation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    const onLogOut = async () => {
        await userLogout()
            .unwrap()
            .then((data) => {
                logout()
                toast.info(data.message)
                navigate(RouteNames.LOGIN_PAGE)
            }
            )
    }

    return (
        <aside className="flex-col items-center bg-white dark:bg-slate-800 border rounded-lg hidden lg:flex sticky top-0 w-64 h-screen-minus-90">
            <div className="h-full px-3 py-4 overflow-y-auto w-full">
                <Nav
                    links={[
                        {
                            title: "Profile",
                            icon: (props) => (
                                <User
                                    className="w-5 h-5"
                                    color={props.color}
                                />
                            ),
                            to: RouteNames.PROFILE_PAGE,
                        },
                        {
                            title: "Boards",
                            icon: (props) => (
                                <Table
                                    className="w-5 h-5"
                                    color={props.color}
                                />
                            ),
                            to: RouteNames.BOARDS_PAGE,
                        },
                        {
                            title: "Settings",
                            icon: (props) => (
                                <Settings
                                    className="w-5 h-5"
                                    color={props.color}
                                />
                            ),
                            to: RouteNames.SETTINGS_PAGE,
                        },
                    ]}
                />
            </div>
            <Button onClick={onLogOut} className="w-11 h-11 rounded-full px-3 mb-10 bg-red-600 hover:bg-red-700">
                <LogOut className="text-white" />
            </Button>
        </aside>
    )
}

