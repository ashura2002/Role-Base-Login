import type React from "react"
import { Link } from "react-router-dom"

interface NavLinks {
    name: string;
    icons: React.ReactNode;
}

interface SideBarProps {
    navlinks: NavLinks[];
}


const SideBar: React.FC<SideBarProps> = ({ navlinks }) => {
    return (
        <div className="h-screen w-[250px] bg-zinc-800 p-5">
            <div className="flex flex-col gap-3 mt-5">
                {navlinks.map((l, index) => (
                    <Link key={index} to={'/'} className="flex p-3 rounded-full items-center gap-3 hover:bg-zinc-700 transition ease-in-out
             duration-300">
                        {l.icons}
                        <p>{l.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideBar
