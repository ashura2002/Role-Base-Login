import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { formatDate } from "../../utils/dateFormatter";
import DecisionConfirmation from "../../components/DecisionConfirmation";
import { CheckCircle2, XCircle } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

interface Approvals {
  approvers: string;
  role: string;
  sequence: string;
  status: string;
  _id: string;
}
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullname: string;
}
interface RequestData {
  approvals: Approvals[];
  CalculateDays: number;
  endDate: string;
  startDate: string;
  overAllStatus: { status: string };
  reason: string;
  requestType: string;
  user: User;
  _id: string;
}

const AdminRequest = () => {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [showDecisionModal, setDecisionModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [actionType, setActionType] =
    useState<"approve" | "reject" | "delete" | null>(null);

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const res = await axiosInstance.get("/requests/form/admin");
        setResponseMessage(res.data.message);
        setRequests(res.data.requests);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRequest();
  }, []);

  const showModal = (id: string, type: "approve" | "reject") => {
    setDecisionModal(true);
    setActionType(type);
    const requestToDecide = requests.find((r) => r._id === id);
    setSelectedRequest(requestToDecide?._id ?? null);
  };

  const handleApproved = async () => {
    try {
      await axiosInstance.put(`/requests/form/${selectedRequest}/approve`, {
        status: "Approved",
      });
      Swal.fire({
        title: "Success",
        text: "Request Approved Successfully",
        timer: 1000,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: "😊",
          text:
            error.response?.data?.message ||
            `Can't do the action since you already decided.`,
          timer: 1000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
        });
      }
    }
    setDecisionModal(false);
  };

  const handleReject = async () => {
    try {
      await axiosInstance.put(`/requests/form/${selectedRequest}/approve`, {
        status: "Rejected",
      });
      Swal.fire({
        title: "Success",
        text: "Request Rejected Successfully",
        timer: 1000,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: "🙁",
          text:
            error.response?.data?.message ||
            `Can't do the action since you already decided.`,
          timer: 1000,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
        });
      }
    }
    setDecisionModal(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-semibold uppercase text-gray-600 tracking-wide">
          {responseMessage}
        </h1>
      </div>

      {requests.length !== 0 ? (
        <div className="bg-zinc-800 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-200">
              {/* Table Head */}
              <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-5 py-4 text-left font-medium">Requester</th>
                  <th className="px-5 py-4 text-left font-medium">Leave Type</th>
                  <th className="px-5 py-4 text-center font-medium">Days</th>
                  <th className="px-5 py-4 text-center font-medium">Start Date</th>
                  <th className="px-5 py-4 text-center font-medium">End Date</th>
                  <th className="px-5 py-4 text-center font-medium">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-800">
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-800/60 transition-colors duration-200"
                  >
                    <td className="px-5 py-4">{req.user.fullname}</td>
                    <td className="px-5 py-4">{req.requestType}</td>
                    <td className="px-5 py-4 text-center">
                      {req.CalculateDays}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {formatDate(req.startDate, "long")}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {formatDate(req.endDate, "long")}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        {/* Reject */}
                        <button
                          onClick={() => showModal(req._id, "reject")}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>

                        {/* Approve */}
                        <button
                          onClick={() => showModal(req._id, "approve")}
                          className="p-2 rounded-lg bg-green-500/10 hover:bg-green-600/20 text-green-400 hover:text-green-300 transition"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-6">
          <div className="w-[400px]">
            <img src="/images/relax.png" alt="" />
          </div>
        </div>
      )
      }
      {/* Table Wrapper */}


      {/* Decision Modal */}
      {
        showDecisionModal && (
          <DecisionConfirmation
            onCancel={() => setDecisionModal(false)}
            onConfirm={actionType === "approve" ? handleApproved : handleReject}
            title={actionType === "approve" ? "Approve Request" : "Reject Request"}
            message={
              actionType === "approve"
                ? "Are you sure you want to approve this request?"
                : "Are you sure you want to reject this request?"
            }
            confirmColor={actionType === "approve" ? "green" : "red"}
          />
        )
      }
    </div >
  );
};

export default AdminRequest;
