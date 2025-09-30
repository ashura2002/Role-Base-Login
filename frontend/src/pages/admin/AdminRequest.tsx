import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import { formatDate } from "../../utils/dateFormatter";

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
                  <td className=" px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="border border-zinc-500 hover:border-zinc-800 hover:shadow
                      transition ease-in-out hover:shadow-gray-50 hover:text-red-500
                       cursor-pointer text-white px-3 py-1 rounded text-sm shadow-sm">
                        Reject
                      </button>
                      <button className="border border-zinc-500 hover:border-zinc-800 hover:shadow
                      transition ease-in-out hover:shadow-gray-50 hover:text-green-500
                       cursor-pointer text-white px-3 py-1 rounded text-sm shadow-sm">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AdminRequest
