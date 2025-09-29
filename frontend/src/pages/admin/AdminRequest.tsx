import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"

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
  endDate: string;
  startDate: string;
  overAllStatus: { status: string };
  reason: string;
  requestType: string;
  user: User;
  _id: string;
}

// tiwasong ang pagdisplay sa data gamit typescript

const AdminRequest = () => {
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [requests, setRequests] = useState<RequestData[]>([])

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const res = await axiosInstance.get("/requests/form/admin")
        setResponseMessage(res.data.message)
        setRequests(res.data.requests)
        console.log(requests)
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
      </div>
    </div>
  )
}

export default AdminRequest
