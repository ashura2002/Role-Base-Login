import React, { useContext, useEffect } from 'react'
import EmployeeCard from '../../components/EmployeeCard'
import userContext from '../../context/UserContext'
import axiosInstance from '../../utils/AxiosInstance'
import { Link } from 'react-router-dom'

const AdminEmployees = () => {
  const { users, setUsers } = useContext(userContext)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get(`/api/users`)
        setUsers(res.data.allUsers)
      } catch (error) {
        console.error(error)
      }
    }
    getAllUsers()
  }, [])


  return (
    <div>
      <h1 className='text-2xl'>Employees</h1>

      <div className='flex flex-wrap gap-4 p-5'>
        {users.map((user) => (
          <Link key={user._id} to={`/admin-employees/${user.firstName}`} state={user}>
            <EmployeeCard firstName={user.firstName}
              lastName={user.lastName} email={user.email} role={user.role}
            />
          </Link>

        ))}
      </div>
    </div>
  )
}

export default AdminEmployees