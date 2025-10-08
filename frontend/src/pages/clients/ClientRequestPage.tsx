import type React from "react"
import { useContext, useEffect } from "react"
import { RequestContext } from "../../contexts/FormRequestContext"
import axiosInstance from "../../utils/AxiosInstance"
import { formatDate } from "../../utils/dateFormatter"


const ClientRequestPage: React.FC = () => {
  const reqContext = useContext(RequestContext)
  if (!reqContext) return <div>Loading...</div>
  const { requests, setRequest } = reqContext

  useEffect(() => {
    const getOwnRequest = async () => {
      try {
        const res = await axiosInstance.get(`/requests/form/users`)
        setRequest(res.data.requests)
      } catch (error) {
        console.error(error)
      }
    }
    getOwnRequest()
  }, [])


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-zinc-700 bg-zinc-900 rounded-xl shadow-lg">
        <thead className="bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left text-gray-300">Request Type</th>
            <th className="px-4 py-2 text-left text-gray-300">Start Date</th>
            <th className="px-4 py-2 text-left text-gray-300">End Date</th>
            <th className="px-4 py-2 text-left text-gray-300">Days</th>
            <th className="px-4 py-2 text-left text-gray-300">Reason</th>
            <th className="px-4 py-2 text-left text-gray-300">Status</th>
            <th className="px-4 py-2 text-center text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-700">
          {requests.map((req) => (
            <tr key={req._id} className="hover:bg-zinc-800 transition">
              <td className="px-4 py-2 text-gray-100">{req.requestType}</td>
              <td className="px-4 py-2 text-gray-100">{formatDate(req.startDate)}</td>
              <td className="px-4 py-2 text-gray-100">{formatDate(req.endDate)}</td>
              <td className="px-4 py-2 text-gray-100">{req.CalculateDays}</td>
              <td className="px-4 py-2 text-gray-100">{req.reason}</td>
              <td className="px-4 py-2 text-gray-100">{req.overAllStatus.status}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition transform hover:scale-105"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-4 text-center text-gray-400">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ClientRequestPage