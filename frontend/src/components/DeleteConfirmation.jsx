import React, { useContext } from "react";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import userContext from "../context/UserContext";

const DeleteModal = ({ setDeleteConfirmation, deleteRequestID }) => {
    const { loading, setLoading, requests, setRequest } = useContext(userContext)

    const removeRequest = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.delete(`/requests/form/users/${deleteRequestID}`)
            setDeleteConfirmation(false)
            toast.success(res.data.message)
            setRequest(requests.filter((req) => req._id !== deleteRequestID))
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">
                    Are you want to delete?
                </h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setDeleteConfirmation(false)}
                        className="px-4 py-2 rounded-lg hover:bg-gray-400 transition hover:text-black"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={removeRequest}
                        className="px-4 py-2 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        {loading ? 'Deleting...' : 'Yes'}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
