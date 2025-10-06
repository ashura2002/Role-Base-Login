import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import type { Departments } from "./AdminDepartments";
import LayoutWrapper from "../../components/LayoutWrapper";

interface TotalRequest {
    age: number;
    department?: Departments
    email: string;
    fullname: string;
    role: string;
    totalRequest: number
    _id: string
}


export const AdminHomepage = () => {
    const [msg, setMsg] = useState<string>('')
    const [usersTotalReq, setUsersTotalReq] = useState<TotalRequest[]>([])

    useEffect(() => {
        const getUserTotalRequest = async () => {
            try {
                const res = await axiosInstance.get(`/api/users/total-request`)
                setMsg(res.data.message)
                setUsersTotalReq(res.data.user)
                console.log(res.data)
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
                    <div className="border m-5 rounded-md p-3 border-gray-700 hover:border-gray-200
                    transition ease-in-out duration-300 cursor-pointer"
                        key={u._id}>
                        <h1>Name: {u.fullname}</h1>
                        <p>Age: {u.age}</p>
                        <p>Email: {u.email}</p>
                        <p>Role{u.role}</p>
                        <p>Total Requests: {u.totalRequest}</p>
                    </div>
                ))}
            </LayoutWrapper>
        </div>
    )
}
