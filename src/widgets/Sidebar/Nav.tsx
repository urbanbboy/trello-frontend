import { cn } from "@/shared/utils/classNames";
import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
    links: {
        icon: (props: { color: string }) => ReactNode;
        title: string;
        to: string;
        onClick?: () => void;
    }[];
}

export const Nav: FC<NavProps> = ({ links }) => {
    const location = useLocation();

    return (
        <div className="group flex flex-col w-full">
            <nav className="grid gap-2 w-full items-center">
                {links.map((link, index) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={index}
                            to={link.to}
                            className="w-full"
                            onClick={() => {
                                if (link.onClick) {
                                    link.onClick();
                                }
                            }}
                        >
                            <div
                                className={cn(
                                    "flex items-center text-base font-medium gap-2.5 p-2.5 rounded-lg w-full",
                                    isActive ? "text-white bg-blue-600" : "text-gray-500 bg-transparent"
                                )}
                            >
                                {link.icon({ color: isActive ? "white" : "gray" })}
                                {link.title}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
