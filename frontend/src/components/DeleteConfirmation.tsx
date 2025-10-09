import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";

interface DeleteConfirmationProps {
    show: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    show,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    onConfirm,
    onCancel,
}) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-zinc-800 border border-zinc-700 text-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onCancel}
                            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200 transition"
                        >
                            <X size={20} />
                        </button>

                        {/* Icon + Title */}
                        <div className="flex flex-col items-center mb-4">
                            <div className="bg-red-500/10 p-3 rounded-full mb-3 shadow-inner">
                                <Trash2 className="text-red-500" size={30} />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
                        </div>

                        {/* Message */}
                        <p className="text-sm text-zinc-400 text-center mb-6 leading-relaxed">
                            {message}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={onCancel}
                                className="px-5 py-2.5 rounded-xl bg-zinc-700
                                 text-gray-200 font-medium hover:bg-zinc-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-5 py-2.5 rounded-xl bg-red-600
                                 text-white font-medium hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmation;
