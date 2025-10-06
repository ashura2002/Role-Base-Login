import { ArrowLeftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import LayoutWrapper from '../../components/LayoutWrapper';

interface UsersOnDep {
    email: string;
    firstName: string;
    fullname: string;
    lastName: string;
    _id: string;
}


const AdminUsersOnDepartment: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const [usersOnDepartment, setUsersOnDepartment] = useState<UsersOnDep[]>([])
    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = location.state
    const { departmentName } = useParams()

    useEffect(() => {
        const getUsersOnThisDepartment = async () => {
            try {
                const res = await axiosInstance.get(`/api/departments/${_id}/users`)
                setMessage(res.data.message)
                setUsersOnDepartment(res.data.departments.userWithDepartment)
            } catch (error) {
                console.error(error)
            }
        }
        getUsersOnThisDepartment()
    }, [])


    return (
        <div>
            <ArrowLeftIcon onClick={() => navigate(-1)} />
            <div className=' text-center'>
                <h1 className='font-medium text-3xl'>{departmentName}</h1>
                <h1>{message}</h1>
            </div>


            <ul className='p-3 m-10'>
                <LayoutWrapper>
                    {usersOnDepartment.map((u) => (
                        <li className='border border-gray-700
                        hover:border-gray-200 duration-300
                        transition ease-in-out p-4 rounded-md ' key={u._id}>{u.fullname} - {u.email}</li>
                    ))}
                </LayoutWrapper>
            </ul>




        </div>
    )
}

export default AdminUsersOnDepartment