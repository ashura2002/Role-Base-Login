import React from "react";
import { Edit3, Trash2 } from "lucide-react";

interface DepartmentProps {
    departmentName: string;
    descriptions: string;
    onDelete: () => void;
    onEdit: () => void;
}

const DepartmentCard: React.FC<DepartmentProps> = ({
    departmentName,
    descriptions,
    onDelete,
    onEdit,
}) => {
    return (
        <div
            className="bg-zinc-800 border border-zinc-800 hover:border-zinc-700
                 hover:shadow-lg transition-all duration-300 p-5 rounded-xl 
                 flex flex-col justify-between group w-[300px]"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-zinc-100 leading-tight">
                    {departmentName}
                </h2>
                <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onEdit();
                        }}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition"
                        title="Edit Department"
                    >
                        <Edit3 className="w-5 h-5 text-blue-400 hover:text-blue-300 transition" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDelete();
                        }}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition"
                        title="Delete Department"
                    >
                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-400 transition" />
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed">
                {descriptions || "No description provided."}
            </p>
        </div>
    );
};

export default DepartmentCard;
