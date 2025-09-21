import React from 'react'
import { useLocation } from 'react-router-dom'

const AdminEmployeeInfo = () => {
    const location = useLocation()
    const firstName = location.state.firstName
    const lastName = location.state.lastName
    const role = location.state.role
    const email = location.state.email
    const userId = location.state._id
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <h1>Name: <span>{firstName}</span> <span>{lastName}</span></h1>
                <h1>Role: <span>{role}</span></h1>
                <h1>Email Address: <span>{email}</span></h1>
                <h1>UserId: <span>{userId}</span></h1>
                <h1>Department: {'Default Department'}</h1>
                <h1>Designation: {'Default Designation'}</h1>
            </div>
        </div>
    )
}

export default AdminEmployeeInfo