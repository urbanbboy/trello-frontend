import { useTheme } from "@/app/providers/theme";
import { getCurrentUserUsername } from "@/entities/User/model/selectors";
import { Avatar } from "@/shared/ui/Avatar";
import { Logo } from "@/shared/ui/Logo";
import { Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const username = useSelector(getCurrentUserUsername)

    return (
        <header className="px-4 py-2 shadow-bottom dark:bg-slate-800">
            <div className="flex items-center justify-between">
                <Logo />
                <div className="flex items-center gap-3">
                    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        {theme === "light" ? <Moon /> : <Sun className="text-slate-700 dark:text-slate-400" /> }
                    </button>
                    <span className="text-slate-700 font-semibold dark:text-slate-400">{username}</span>
                    <Avatar
                        img='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                        alt="Colm Tiuite"
                    />
                </div>
            </div>
        </header>
    );
};
