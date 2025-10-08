import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import { generateAvatar } from '../../utils/generateAvatar';
import { ArrowLeft } from 'lucide-react';

interface UserWithDepartments {
    fullname: string;
    role: string;
    _id: string;
    email: string;
    department: {
        departmentName: string;
        descriptions: string;
    }
    age: number;
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
    }, [])

    return (
        <div className='p-5 m-5'>
            <ArrowLeft className='size-7' onClick={() => navigate(-1)} />
            <div className='py-2 px-10 flex items-center justify-baseline m-5 gap-10'>
                <div >
                    <img src={`${generateAvatar(userInfo?.fullname || 'user')}`} alt="user-avatar"
                        className='rounded-full h-[200px]' />
                </div>
                <div>
                    <h1 className='uppercase font-medium text-4xl'>{userInfo?.fullname}</h1>
                    <p className='text-2xl'>{userInfo?.email}</p>
                    <p className='text-2xl'>{userInfo?.age} year's old</p>
                    <div className='text-2xl'>
                        <p>{userInfo?.department?.departmentName || 'This user dont had department'}</p>
                        <p>{userInfo?.department?.descriptions}</p>
                    </div>
                    <p className='text-2xl uppercase'>{userInfo?.role}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminEmployeeInfo