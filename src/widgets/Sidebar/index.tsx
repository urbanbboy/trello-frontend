import { Settings, Table, User } from "lucide-react"
import { Nav } from "./Nav"
import { RouteNames } from "@/app/providers/router/routeConfig"

export const Sidebar = () => {
    return (
        <aside className="flex-col items-center bg-white border rounded-lg hidden lg:flex sticky top-0 w-64 h-screen-minus-90">
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
        </aside>
    )
}

