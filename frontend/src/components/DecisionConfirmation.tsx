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
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
            <div
                className="bg-zinc-900/90 border border-zinc-700 rounded-xl shadow-xl p-6 w-[400px] 
        transform scale-95 animate-slideUp transition-all duration-300 ease-in-out"
            >
                <h2 className="text-xl font-semibold mb-3 text-gray-100">{title}</h2>
                <p className="mb-6 text-gray-400 text-sm leading-relaxed">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 
              ${confirmColor === "green"
                                ? "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                                : "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                            }`}
                    >
                        {confirmColor === "green" ? "Approve" : "Reject"}
                    </button>
                </div>
            </div>

            {/* Keyframe animations */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-in-out;
          }
          .animate-slideUp {
            animation: slideUp 0.25s ease-in-out;
          }
        `}
            </style>
        </div>
    );
};

export default DecisionConfirmation;
