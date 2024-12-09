import { useTheme } from "@/app/providers/theme";
import { getCurrentUserUsername } from "@/entities/User/model/selectors";
import { Avatar } from "@/shared/ui/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/Dropdown";
import { Logo } from "@/shared/ui/Logo";
import { LogOut, Moon, Settings, Sun, Table, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Nav } from "../Sidebar/Nav";
import { RouteNames } from "@/app/providers/router/routeConfig";
import { Button } from "@/shared/ui/Button";
import { useLogoutMutation } from "@/entities/User/model/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/User";
import { toast } from "sonner";

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const username = useSelector(getCurrentUserUsername)

    const [userLogout] = useLogoutMutation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    const onLogout = async () => {
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
        <header className="px-4 py-2 shadow-bottom dark:bg-slate-800">
            <div className="flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-3">
                    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        {theme === "light" ? <Moon /> : <Sun className="text-slate-700 dark:text-slate-400" />}
                    </button>
                    {username &&
                        <>
                            <span className="text-slate-700 font-semibold dark:text-slate-400">{username}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex lg:hidden">
                                    <Avatar
                                        img='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                                        alt="Colm Tiuite"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-44">
                                    <div>
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
                                        <Button onClick={onLogout} className="flex gap-x-2 bg-slate-200 hover:bg-slate-300 text-black">
                                            <LogOut className="text-black" />
                                            Выйти
                                        </Button>
                                    </div>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    }
                </div>
            </div>
        </header >
    );
};
