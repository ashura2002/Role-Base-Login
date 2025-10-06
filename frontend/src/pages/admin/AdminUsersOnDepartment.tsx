import { ArrowLeftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'


const AdminUsersOnDepartment: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = location.state
    const { departmentName } = useParams()

    useEffect(() => {
        const getUsersOnThisDepartment = async () => {
            try {
                const res = await axiosInstance.get(`/api/departments/${_id}/users`)
                setMessage(res.data.message)
                console.log(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getUsersOnThisDepartment()
    }, [])


    return (
        <div>
            <ArrowLeftIcon onClick={() => navigate(-1)} />
            <h1>Employee on {departmentName} department</h1>
            <h1>{message}</h1>
        </div>
    )
}

export default AdminUsersOnDepartment