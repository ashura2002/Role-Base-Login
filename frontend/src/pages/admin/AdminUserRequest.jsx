import React from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const AdminUserRequest = () => {
  const [text, setText] = useState('')
  const [requests, setRequest] = useState([])

  useEffect(() => {
    const getAllEmployeesRequest = async () => {
      try {
        const res = await axiosInstance.get(`requests/form/admin`)
        setRequest(res.data.requests)
        setText(res.data.message)
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || error.message)
      }
    }
    getAllEmployeesRequest()
  }, [])

  return (
    <div>
      <div>
        <h1>{text}</h1>
      </div>

      <div className="p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-zinc-700">
            <thead className="bg-zinc-700">
              <tr>
                <th className="px-6 py-3 text-left">Request Type</th>
                <th className="px-6 py-3  text-left">User</th>
                <th className="px-6 py-3 text-left ">Action</th>
                <th className="px-6 py-3  text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id} className="border-b-zinc-100">
                  <td className="px-6 py-4 border-b  border-zinc-700">{req.requestType}</td>
                  <td className="px-6 border-b  border-zinc-700 py-4">{req.user.firstName}</td>
                  <td className="px-6 border-b  border-zinc-700 py-4">
                    <button
                      className="text-white px-3 py-1 rounded mr-2 cursor-pointer hover:bg-green-800 transition-all
                      duration-300 "

                    >
                      Approve
                    </button>
                    <button
                      className=" text-white px-3 py-1 rounded cursor-pointer hover:bg-red-800 transition-all
                      duration-300"

                    >
                      Reject
                    </button>
                  </td>
                  <td className={`px-6 py-4 border-b  border-zinc-700 
                    ${req.status === 'Pending' ? 'text-amber-400' : req.status === 'Approve' ?
                      'text-green-700' : 'text-red-700'}`}>
                    {req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUserRequest
// gam an dynamic page pag e click ang request type makita tanang info pwede i butang sa response
