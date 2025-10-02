import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
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
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [requests, setRequests] = useState<RequestData[]>([])
  const [showDecisionModal, setDecisionModal] = useState<boolean>(false)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const res = await axiosInstance.get("/requests/form/admin")
        setResponseMessage(res.data.message)
        setRequests(res.data.requests)
        console.log('Response from API', res.data.requests)
      } catch (error) {
        console.error(error)
      }
    }
    getAllRequest()
  }, [])

  const showModal = (id: string, type: "approve" | "reject") => {
    setDecisionModal(true);
    setActionType(type);
    const requestToDecide = requests.find((r) => r._id === id);
    setSelectedRequest(requestToDecide?._id ?? null);
  };

  const handleApproved = async () => {
    try {
      await axiosInstance.put(`/requests/form/${selectedRequest}/approve`, {
        status: 'Approved'
      })
      Swal.fire({
        title: 'Success',
        text: 'Request Approved Successfully'
      })
    } catch (error: string | unknown) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: '',
          text: error.response?.data?.message || `Can't do the action since you already decided.`
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong'
        });
      }
    }
    setDecisionModal(false)
  }

  const handleReject = async () => {
    try {
      await axiosInstance.put(`/requests/form/${selectedRequest}/approve`, {
        status: 'Rejected'
      })
      Swal.fire({
        title: 'Success',
        text: 'Request Rejected Successfully'
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          title: '',
          text: error.response?.data?.message || `Can't do the action since you already decided.`
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong'
        });
      }
    }
    setDecisionModal(false)
  }

  return (
    <div>
      <div className="flex items-center justify-center p-2">
        <h1 className="text-3xl font-medium uppercase">{responseMessage}</h1>
      </div>
      <div className="space-y-10">
        <div className="p-5">
          <table className="w-full border-collapse border border-zinc-800  overflow-hidden">
            {/* Table Head */}
            <thead className="bg-zinc-800">
              <tr>
                <th className="border border-zinc-700 px-4 py-3 text-left font-medium">Requester Name</th>
                <th className="border border-zinc-700 px-4 py-3 text-left font-medium">Leave Type</th>
                <th className="border border-zinc-700 px-4 py-3 text-center font-medium">Days</th>
                <th className="border border-zinc-700 px-4 py-3 text-center font-medium">Start Date</th>
                <th className="border border-zinc-700 px-4 py-3 text-center font-medium">End Date</th>
                <th className="border border-zinc-700 px-4 py-3 text-center font-medium">Overall Status</th>
                <th className="border border-zinc-700 px-4 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className={index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"}
                >
                  <td className=" px-4 py-3">{req.user.fullname}</td>
                  <td className=" px-4 py-3">{req.requestType}</td>
                  <td className=" px-4 py-3 text-center">{req.CalculateDays}</td>
                  <td className=" px-4 py-3 text-center">
                    {formatDate(req.startDate, "long")}
                  </td>
                  <td className=" px-4 py-3 text-center">
                    {formatDate(req.endDate, "long")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {req.overAllStatus.status === "Approved" ? (
                      <span className="text-green-500 font-medium">Approved</span>
                    ) : req.overAllStatus.status === "Rejected" ? (
                      <span className="text-red-500 font-medium">Rejected</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      {/* Reject Button */}
                      <button
                        onClick={() => showModal(req._id, "reject")}
                        className="p-2 rounded-full hover:bg-red-700 text-white transition"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>

                      {/* Approve Button */}
                      <button
                        onClick={() => showModal(req._id, "approve")}
                        className="p-2 rounded-full hover:bg-green-700 text-white transition"
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

      {showDecisionModal && (
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
      )}

    </div>
  )
}

export default AdminRequest
