import { useTheme } from "@/app/providers/theme";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/Dropdown";
import { Logo } from "@/shared/ui/Logo";
import { LogOut, Moon, Settings, Sun, Table, User } from "lucide-react";
import { Nav } from "../Sidebar/Nav";
import { RouteNames } from "@/app/providers/router/routeConfig";
import { Button } from "@/shared/ui/Button";
import { useLogoutMutation } from "@/entities/User/model/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/entities/User";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/shared/ui/Avatar";
import { memo } from "react";


export const Header = memo(() => {
    const { theme, setTheme } = useTheme();
    const { currentUser } = useAuth()

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
                    {currentUser?.username &&
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-x-1">
                                    <Avatar>
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                                            alt={'Kitty'}
                                        />
                                    </Avatar>
                                    <span className="text-slate-700 font-semibold dark:text-slate-400 hidden sm:flex">{currentUser.username}</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-44">
                                    <div>
                                        <Nav
                                            links={[
                                                {
                                                    title: "Профиль",
                                                    icon: (props) => (
                                                        <User
                                                            className="w-5 h-5"
                                                            color={props.color}
                                                        />
                                                    ),
                                                    to: RouteNames.PROFILE_PAGE,
                                                    isDropDown: true
                                                    
                                                },
                                                {
                                                    title: "Доски",
                                                    icon: (props) => (
                                                        <Table
                                                            className="w-5 h-5"
                                                            color={props.color}
                                                        />
                                                    ),
                                                    to: RouteNames.BOARDS_PAGE,
                                                    isDropDown: true
                                                },
                                                {
                                                    title: "Настройки",
                                                    icon: (props) => (
                                                        <Settings
                                                            className="w-5 h-5"
                                                            color={props.color}
                                                        />
                                                    ),
                                                    to: RouteNames.SETTINGS_PAGE,
                                                    isDropDown: true
                                                },
                                            ]}
                                        />
                                        <Button onClick={onLogout} className="w-full" variant={"secondary"}>
                                            <LogOut />
                                            <span>Выйти</span>
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
})
