import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"


const AdminRequest = () => {
  const [responseMessage, setResponseMessage] = useState<string>('')
  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const res = await axiosInstance.get('/requests/form/admin')
        setResponseMessage(res.data.message)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getAllRequest()
  }, [])


  return (
    <div>
      <div className="flex items-center justify-center p-2">
        <h1 className="text-3xl font-medium">{responseMessage}</h1>
      </div>
    </div>
  )
}

export default AdminRequest