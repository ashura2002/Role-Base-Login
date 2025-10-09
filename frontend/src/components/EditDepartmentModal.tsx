import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface EditModalProps {
    prevDepartmentName: string;
    prevDescriptions: string;
    isOpen: boolean;
    onSubmit: (data: { departmentName: string; descriptions: string }) => void;
    onClose: () => void;
}

const EditDepartmentModal: React.FC<EditModalProps> = ({
    isOpen,
    onSubmit,
    onClose,
    prevDepartmentName,
    prevDescriptions,
}) => {
    const [departmentName, setDepartmentName] = useState<string>("");
    const [descriptions, setDescription] = useState<string>("");

    // Pre-fill form when modal opens
    useEffect(() => {
        if (isOpen) {
            setDepartmentName(prevDepartmentName);
            setDescription(prevDescriptions);
        }
    }, [isOpen, prevDepartmentName, prevDescriptions]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!departmentName.trim() || !descriptions.trim()) {
            return Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please fill in all fields before saving.",
                timer: 1500,
                showConfirmButton: false,
            });
        }

        const confirm = await Swal.fire({
            icon: "question",
            title: "Confirm Changes?",
            text: "Do you want to save these updates?",
            showCancelButton: true,
            confirmButtonText: "Yes, save it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2563eb",
            background: "#1e1e1e",
            color: "#fff",
        });

        if (confirm.isConfirmed) {
            onSubmit({ departmentName, descriptions });
            Swal.fire({
                icon: "success",
                title: "Updated Successfully",
                timer: 1200,
                showConfirmButton: false,
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all scale-100 animate-slideUp relative">
                <h2 className="text-xl font-semibold text-center text-zinc-100 mb-5">
                    Edit Department
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="departmentName"
                            className="block text-sm font-medium mb-1 text-zinc-300"
                        >
                            Department Name
                        </label>
                        <input
                            id="departmentName"
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-700
                             text-zinc-100 placeholder-zinc-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter department name..."
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium mb-1 text-zinc-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={descriptions}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-zinc-100 placeholder-zinc-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter description..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-zinc-600 hover:bg-zinc-500 text-zinc-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* Optional small animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.25s ease-out; }
      `}</style>
        </div>
    );
};

export default EditDepartmentModal;
