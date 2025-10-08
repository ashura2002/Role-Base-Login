import type React from "react"
import { Link } from "react-router-dom"


interface NavLinks {
    name: string;
    icons: React.ReactNode;
    to: string;
}

interface SideBarProps {
    navlinks: NavLinks[];
    isShow: boolean;
}


export const SideBar = ({ navlinks, isShow }: SideBarProps) => {
    return (
        isShow && (
            <div className="h-screen w-[250px] bg-zinc-800 p-5">
                <div className="flex flex-col gap-3 mt-5">
                    {navlinks.map((link, index) => (
                        <Link key={index} to={link.to} className="flex p-3 w-full
                    rounded-full items-center gap-3 hover:bg-zinc-700 transition ease-in-out
                     duration-300">
                            {link.icons}
                            <p>{link.name}</p>
                        </Link>
                    ))}
                </div>
            </div>)
    )
}
