import { CircleUser, Menu, MoonIcon } from "lucide-react"
import type { SetStateAction } from "react";
import type React from "react";

interface ToggleProps {
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProps {
    showLogoutModal: boolean;
    setShowLogoutModal: React.Dispatch<SetStateAction<boolean>>;
}

type HeaderProps = ToggleProps & ModalProps

const Header = ({ setIsShow, setShowLogoutModal }: HeaderProps) => {
    const handleToggle = () => {
        setIsShow(prev => !prev)
    }

    const showModal = () => {
        setShowLogoutModal(prev => !prev)
    }

    return (
        <div className=" py-5 px-7 flex justify-between bg-zinc-800">
            <div>
                <Menu className="cursor-pointer" onClick={handleToggle} />
                {/* find logo */}
            </div>

            <div className="flex items-center gap-5 px-2">
                <MoonIcon className="size-6 cursor-pointer" />
                <CircleUser className="size-6 cursor-pointer" onClick={showModal} />
            </div>
        </div>
    )
}

export default Header