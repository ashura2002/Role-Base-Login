import React, { useState } from "react";

interface EditModalProps {
    prevDepartmentName: string;
    prevDescriptions: string;
    isOpen: boolean;
    onSubmit: (data: { departmentName: string, descriptions: string }) => void
    onClose: () => void
}

const EditDepartmentModal: React.FC<EditModalProps> = ({ isOpen, onSubmit, onClose, prevDepartmentName, prevDescriptions }) => {
    const [departmentName, setDepartmentName] = useState<string>(prevDepartmentName)
    const [descriptions, setDescription] = useState<string>(prevDescriptions)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit({ departmentName, descriptions })
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center dark:text-gray-100">
                    Edit Department
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="departmentName"
                            className="block text-sm font-medium mb-1 dark:text-gray-200"
                        >
                            Department Name
                        </label>
                        <input
                            type="text"
                            id="departmentName"
                            name="departmentName"
                            value={departmentName}
                            onChange={e => setDepartmentName(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2
                             focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium mb-1 dark:text-gray-200"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={descriptions}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2
                             focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDepartmentModal;
