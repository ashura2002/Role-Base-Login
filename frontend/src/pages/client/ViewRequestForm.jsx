import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formattedDate } from '../../utils/DateFormatter'

const ViewRequestForm = () => {
  const location = useLocation()
  const formDatas = location.state.req


  return (
    <div className='h-screen flex flex-col items-center gap-5'>
      <div>
        <h1 className='text-2xl'>Request Form Details</h1>
      </div>


      <div className='flex flex-col gap-1.5 w-full py-3 px-5'>
        <p>Name: <span>{`${formDatas.user.firstName.slice(0, 1).toUpperCase()}${formDatas.user.firstName.slice(1).toLowerCase()}
        ${formDatas.user.lastName.slice(0, 1).toUpperCase()}${formDatas.user.lastName.slice(1).toLowerCase()}
        `}</span></p>
        <p>Email: <span>{formDatas.user.email}</span></p>
        <p>Request Type: <span>{formDatas.requestType}</span></p>
        <p>Start Date: <span>{formattedDate(formDatas.startDate)}</span></p>
        <p>End Date: <span>{formattedDate(formDatas.endDate)}</span></p>
        <p>Reason: <span>{formDatas.reason || "No reasons added"}</span></p>
        <p>Status: <span className={`${formDatas.status === 'Pending' ? 'text-yellow-700' : formDatas.status === 'Approved' ?
          'text-green-500' : 'text-red-500'}`}>
          {formDatas.status}
        </span></p>
      </div>
    </div>
  )
}

export default ViewRequestForm
