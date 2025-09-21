import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import toast from "react-hot-toast";
import userContext from "../../context/UserContext";
import { TrashIcon, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteConfirmation";

const ClientViewRequest = () => {
    const { requests, setRequest } = useContext(userContext);
    const [showDeleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteRequestID, setDeleteRequestID] = useState("");

    useEffect(() => {
        const getAllRequest = async () => {
            try {
                const res = await axiosInstance.get(`/requests/form/users`);
                setRequest(res.data.request || []);
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };
        getAllRequest();
    }, [setRequest]);

    const handleCancel = (id) => {
        setDeleteConfirmation(true);
        const requestToDelete = requests.find((req) => req._id === id);
        setDeleteRequestID(requestToDelete._id);
    };

    const renderApprovalIcon = (status) => {
        switch (status) {
            case "Approved":
                return <CheckCircle className="text-green-600" size={18} />;
            case "Rejected":
                return <XCircle className="text-red-600" size={18} />;
            default:
                return <Clock className="text-yellow-600" size={18} />;
        }
    };

    return (
        <div className="p-5 m-5">
            <div className="overflow-x-auto rounded-md shadow-md">
                <table className="min-w-full border border-zinc-700 rounded-lg text-sm">
                    <thead className="bg-zinc-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Request Type</th>
                            <th className="px-6 py-3 text-left">Start Date</th>
                            <th className="px-6 py-3 text-left">End Date</th>
                            <th className="px-6 py-3 text-left">Status (4 Approvers)</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests && requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req._id} className="border-b border-gray-500">
                                    <td className="px-6 py-3">{req.requestType}</td>
                                    <td className="px-6 py-3">
                                        {new Date(req.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3">
                                        {new Date(req.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3 flex gap-2">
                                        {req.approvals.map((approval) => (
                                            <div key={approval._id} title={approval.status}>
                                                {renderApprovalIcon(approval.status)}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-3 text-center space-x-3">

                                        <Link
                                            to={`/client-view-request/${req._id}`}
                                            className="inline-block text-blue-500 hover:text-blue-700"
                                            state={{ req }}
                                        >
                                            <Eye size={18} />
                                        </Link>


                                        <button
                                            onClick={() => handleCancel(req._id)}
                                            className="inline-block text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center px-6 py-6 text-gray-500">
                                    No requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showDeleteConfirmation && (
                <DeleteModal
                    setDeleteConfirmation={setDeleteConfirmation}
                    deleteRequestID={deleteRequestID}
                />
            )}
        </div>
    );
};

export default ClientViewRequest;
