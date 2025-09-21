import React from 'react'

const EmployeeCard = ({ firstName, lastName, email, role }) => {
    return (
        <div className='border w-[300px] p-2 rounded-md'>
            <div>
                <img alt="pic from name" />
            </div>

            <div>
                <h1>Name: <span>{firstName}</span> <span>{lastName}</span></h1>
                <h1>Role: <span>{role}</span></h1>
                <h1>Email: <span>{email}</span></h1>
            </div>
        </div>
    )
}

export default EmployeeCard