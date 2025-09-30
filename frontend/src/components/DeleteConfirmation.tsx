import { Trash2, XCircle } from "lucide-react";

interface DeleteConfirmationProps {
    show: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    show,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    onConfirm,
    onCancel,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-zinc-800 text-white rounded-2xl shadow-lg w-full max-w-md p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <Trash2 className="text-red-500 size-6" />
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>

                {/* Message */}
                <p className="text-sm text-zinc-300 mb-6">{message}</p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-600 hover:bg-zinc-700 transition"
                    >
                        <XCircle className="size-5" />
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                    >
                        <Trash2 className="size-5" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
