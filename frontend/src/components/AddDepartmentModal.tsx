import React, { useState } from 'react';

interface AddDepartmentModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: { departmentName: string; descriptions: string }) => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ show, onClose, onSubmit }) => {
    const [departmentName, setDepartmentName] = useState('');
    const [descriptions, setDescription] = useState('');

    const handleSubmit = () => {
        if (!departmentName || !descriptions) {
            alert('Please fill out both fields');
            return;
        }
        onSubmit({ departmentName, descriptions });
        setDepartmentName('');
        setDescription('');
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-white">Add Department</h2>

                <div className="flex flex-col gap-3 mb-4">
                    <div>
                        <label className="block text-white mb-1">Department Name</label>
                        <input
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Description</label>
                        <textarea
                            value={descriptions}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDepartmentModal;
