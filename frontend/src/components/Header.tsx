import { CircleUser, Menu, MoonIcon } from "lucide-react"


const Header = () => {
    return (
        <div className=" py-5 px-7 flex justify-between bg-zinc-800">
            <div>
                <Menu className="cursor-pointer" />
                {/* find logo */}
            </div>

            <div className="flex items-center gap-5 px-2">
                <MoonIcon className="size-6 cursor-pointer" />
                <CircleUser className="size-6 cursor-pointer" />
            </div>
        </div>
    )
}

export default Header