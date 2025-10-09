import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import type { Departments } from "./AdminDepartments"
import LayoutWrapper from "../../components/LayoutWrapper"

interface TotalRequest {
    age: number
    department?: Departments
    email: string
    fullname: string
    role: string
    totalRequest: number
    _id: string
}

const AdminHomepage = () => {
    const [msg, setMsg] = useState<string>("")
    const [usersTotalReq, setUsersTotalReq] = useState<TotalRequest[]>([])

    useEffect(() => {
        const getUserTotalRequest = async () => {
            try {
                const res = await axiosInstance.get(`/api/users/total-request`)
                setMsg(res.data.message)
                setUsersTotalReq(res.data.user)
            } catch (error) {
                console.error(error)
            }
        }
        getUserTotalRequest()
    }, [])

    return (
        <div>
            <div>
                <h1>{msg}</h1>
            </div>

            <LayoutWrapper>
                {usersTotalReq.map((u) => (
                    <div
                        key={u._id}
                        className="bg-zinc-800 border border-gray-700 m-5 rounded-md p-4 
                        hover:border-gray-200 hover:shadow hover:shadow-gray-500 
                        transition duration-300 ease-in-out cursor-pointer"
                    >
                        <h1 className="font-semibold text-lg text-white">Name: {u.fullname}</h1>
                        <p className="text-gray-300">Age: {u.age}</p>
                        <p className="text-gray-300">Email: {u.email}</p>
                        <p className="text-gray-300">Role: {u.role}</p>
                        <p className="text-gray-300">Total Requests: {u.totalRequest}</p>
                    </div>
                ))}
            </LayoutWrapper>
        </div>
    )
}

export default AdminHomepage