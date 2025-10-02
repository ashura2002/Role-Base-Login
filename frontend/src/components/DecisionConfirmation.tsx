import React from "react";

interface DecisionConfirmationProps {
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmColor?: "green" | "red";
}

const DecisionConfirmation: React.FC<DecisionConfirmationProps> = ({
    onCancel,
    onConfirm,
    title,
    message,
    confirmColor = "green",
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded text-white ${confirmColor === "green"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                            }`}
                    >
                        {confirmColor === "green" ? "Approve" : "Reject"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DecisionConfirmation;
