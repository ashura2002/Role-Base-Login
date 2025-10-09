import { motion, AnimatePresence } from "framer-motion";
import { Building2, X } from "lucide-react";
import React, { useState } from "react";

interface ABModal {
    show: boolean;
    onAdd: (data: { buildingName: string }) => void;
    onClose: () => void;
}

const AddBuildingModal: React.FC<ABModal> = ({ show, onClose, onAdd }) => {
    const [buildingName, setBuildingName] = useState<string>("");

    const addBuilding = () => {
        if (!buildingName.trim()) return alert("Building name can't be empty.");
        onAdd({ buildingName });
        setBuildingName("");
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

                        {/* Icon + Title */}
                        <div className="flex flex-col items-center mb-5">
                            <div className="bg-blue-500/10 p-3 rounded-full shadow-inner mb-3">
                                <Building2 className="text-blue-500" size={30} />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-100">Add Building</h2>
                        </div>

                        {/* Input Field */}
                        <div className="bg-zinc-700 flex items-center gap-3 rounded-xl px-3 py-2 mb-6 border border-zinc-600 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                            <Building2 className="text-zinc-300" />
                            <input
                                type="text"
                                value={buildingName}
                                onChange={(e) => setBuildingName(e.target.value)}
                                placeholder="Enter building name..."
                                className="bg-transparent flex-1 text-zinc-100 placeholder-zinc-400 focus:outline-none"
                            />
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
                                onClick={addBuilding}
                                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Add
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddBuildingModal;
