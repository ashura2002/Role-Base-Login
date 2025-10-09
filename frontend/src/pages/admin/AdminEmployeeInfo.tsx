import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import { generateAvatar } from '../../utils/generateAvatar'
import { ArrowLeft } from 'lucide-react'

interface UserWithDepartments {
    fullname: string
    role: string
    _id: string
    email: string
    department: {
        departmentName: string
        descriptions: string
    }
    age: number
}

const AdminEmployeeInfo: React.FC = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState<UserWithDepartments>()
    const { id } = useParams()

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axiosInstance.get(`/api/users/${id}`)
                setUserInfo(res.data.user)
            } catch (error) {
                console.error(error)
            }
        }
        getUserInfo()
    }, [id])

    return (
        <div className="p-6 m-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
                <ArrowLeft className="size-5" />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div
                className="mt-8 bg-zinc-800 border border-gray-700 rounded-xl p-8 
        shadow-lg hover:shadow-gray-700/30 transition-all duration-300 flex flex-col md:flex-row 
        items-center gap-10 text-gray-200"
            >
                {/* Avatar Section */}
                <div>
                    <img
                        src={generateAvatar(userInfo?.fullname || 'user')}
                        alt="user-avatar"
                        className="rounded-full h-[180px] w-[180px] border border-gray-600 shadow-md"
                    />
                </div>

                {/* User Info Section */}
                <div className="space-y-3">
                    <h1 className="uppercase font-semibold text-3xl text-white tracking-wide">
                        {userInfo?.fullname}
                    </h1>
                    <p className="text-lg text-gray-300">{userInfo?.email}</p>
                    <p className="text-lg text-gray-400">{userInfo?.age} years old</p>

                    <div className="mt-4">
                        <h2 className="text-xl font-medium text-gray-100">
                            {userInfo?.department?.departmentName ||
                                'This user has no department'}
                        </h2>
                        <p className="text-gray-400">
                            {userInfo?.department?.descriptions || ''}
                        </p>
                    </div>

                    <p className="uppercase text-lg font-semibold text-blue-400 mt-2">
                        {userInfo?.role}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminEmployeeInfo
