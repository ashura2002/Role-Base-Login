import { CircleUser, Menu} from "lucide-react"
import { useContext } from "react";
import type React from "react";
import LogoutModal from "./LogoutModal";
import LoadingContext from "../contexts/LoadingContext";

interface ToggleProps {
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}


const Header = ({ setIsShow }: ToggleProps) => {
    const modalCtx = useContext(LoadingContext)
    if (!modalCtx) return <div>Loading....</div>

    const { isShowModal, setIsShowModal } = modalCtx
    const handleToggle = () => {
        setIsShow(prev => !prev)
    }

    return (
        <div className=" py-5 px-7 flex justify-between bg-zinc-800">
            <div>
                <Menu className="cursor-pointer" onClick={handleToggle} />
                {/* find logo */}
            </div>

            <div className="flex items-center gap-5 px-2">
                <CircleUser className="size-6 cursor-pointer" onClick={() => setIsShowModal(true)} />
            </div>

            {isShowModal && <LogoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />}
        </div>
    )
}

export default Header