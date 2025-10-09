import React from "react";
import type { Building } from "../pages/admin/AdminBuildinManagement";
import { Edit2, Trash2 } from "lucide-react";

interface BuildingProps extends Building {
    onShow: () => void;
    onShowEditModal: () => void;
}

const BuildingCard: React.FC<BuildingProps> = ({
    buildingName,
    onShow,
    onShowEditModal,
}) => {
    return (
        <div
            className="bg-zinc-800 border border-zinc-800 hover:border-zinc-700 hover:shadow-lg
                 transition-all duration-300 p-5 rounded-xl flex flex-col gap-4 group"
        >
            {/* Header Actions */}
            <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition">
                <button
                    onClick={onShowEditModal}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition"
                    title="Edit"
                >
                    <Edit2 className="w-5 h-5 text-blue-400 hover:text-blue-300 transition" />
                </button>
                <button
                    onClick={onShow}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition"
                    title="Delete"
                >
                    <Trash2 className="w-5 h-5 text-red-500 hover:text-red-400 transition" />
                </button>
            </div>

            {/* Building Details */}
            <div className="text-center">
                <h1 className="text-lg font-semibold text-zinc-100 tracking-wide">
                    {buildingName}
                </h1>
                <p className="text-sm text-zinc-500 mt-1">Building</p>
            </div>
        </div>
    );
};

export default BuildingCard;
