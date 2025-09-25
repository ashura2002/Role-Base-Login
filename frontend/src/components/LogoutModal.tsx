import { useNavigate } from "react-router-dom"


interface ModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ setIsShowModal }: ModalProps) => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
    setIsShowModal(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 cursor-pointer text-white hover:bg-red-600 transition"
          >
            Yes
          </button>
          <button
            onClick={() => setIsShowModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-500 cursor-pointer hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal