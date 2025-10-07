import { Building2Icon, X } from 'lucide-react'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

interface ModifyBuildingProps {
    onShow: boolean;
    onClose: () => void;
    onEdit: (data: { buildingName: string }) => void;
}



const ModifyBuilding: React.FC<ModifyBuildingProps> = ({ onClose, onShow, onEdit }) => {
    const [buildingName, setbuildingName] = useState<string>('')
    if (!onShow) return null

    const handleEditBuildingName = () => {
        if (!buildingName) return Swal.fire({
            title: 'Error',
            text: 'Cannot be empty',
            timer: 1000
        })
        onEdit({ buildingName })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50">
            <div className="bg-zinc-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200 transition"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-zinc-100 mb-5 text-center">
                    Edit Building
                </h2>

                {/* Input field */}
                <div className="flex items-center gap-3 bg-zinc-700 rounded-lg px-3 py-2 mb-5">
                    <Building2Icon className="text-zinc-300" />
                    <input
                        type="text"
                        value={buildingName}
                        onChange={e => setbuildingName(e.target.value)}
                        placeholder="Building name..."
                        className="bg-transparent flex-1 text-zinc-100 placeholder-zinc-400 focus:outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100 px-4 py-2 rounded-lg transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleEditBuildingName}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModifyBuilding