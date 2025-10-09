import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";

interface ModalProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = ({ isShowModal, setIsShowModal }: ModalProps) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setIsShowModal(false);
  };

  return (
    <AnimatePresence>
      {isShowModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-800 p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm text-center border border-zinc-700"
          >
            {/* Close button */}
            <button
              onClick={() => setIsShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-red-500/10 p-3 rounded-full">
                <LogOut className="text-red-500" size={28} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-100 mb-2">
              Logout Confirmation
            </h2>

            {/* Description */}
            <p className="text-gray-400 mb-6 text-sm">
              Are you sure you want to logout from your account?
            </p>

            {/* Action buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-700 text-gray-200 font-medium hover:bg-zinc-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
