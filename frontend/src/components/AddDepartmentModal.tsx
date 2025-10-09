import { motion, AnimatePresence } from "framer-motion";
import { Building2, X, ClipboardList } from "lucide-react";
import React, { useState } from "react";

interface AddDepartmentModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: { departmentName: string; descriptions: string }) => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
    show,
    onClose,
    onSubmit,
}) => {
    const [departmentName, setDepartmentName] = useState("");
    const [descriptions, setDescriptions] = useState("");

    const handleSubmit = () => {
        if (!departmentName.trim() || !descriptions.trim()) {
            alert("Please fill out both fields");
            return;
        }
        onSubmit({ departmentName, descriptions });
        setDepartmentName("");
        setDescriptions("");
        onClose();
    };

    return (
        <AnimatePresence>
            {show && (
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
                        className="relative bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl w-[90%] max-w-md p-6"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200 transition"
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="bg-blue-500/10 p-3 rounded-full shadow-inner mb-3">
                                <ClipboardList className="text-blue-500" size={30} />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-100">
                                Add Department
                            </h2>
                            <p className="text-sm text-zinc-400 mt-1">
                                Provide department name and short description
                            </p>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm text-zinc-300 mb-1">
                                    Department Name
                                </label>
                                <div className="flex items-center gap-3 bg-zinc-700 rounded-xl px-3 py-2 border border-zinc-600 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                                    <Building2 className="text-zinc-400" size={20} />
                                    <input
                                        type="text"
                                        value={departmentName}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        placeholder="Enter department name..."
                                        className="bg-transparent flex-1 text-zinc-100 placeholder-zinc-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={descriptions}
                                    onChange={(e) => setDescriptions(e.target.value)}
                                    placeholder="Short description..."
                                    className="w-full bg-zinc-700 border border-zinc-600 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none h-24"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl bg-zinc-700 text-gray-200 font-medium hover:bg-zinc-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddDepartmentModal;
