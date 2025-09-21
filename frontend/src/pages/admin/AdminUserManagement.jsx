import React, { useContext, useEffect, useState } from 'react'
import AddUserModal from '../../components/AddUserModal'
import { Edit2Icon, Trash2Icon } from 'lucide-react'
import EditUserModal from '../../components/EditUserModal'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/AxiosInstance'
import DeleteModal from '../../components/DeleteModal'
import userContext from '../../context/UserContext'

const AdminUserManagement = () => {
  const [isOpen, setIsOpen] = useState(false) // modal
  const { users, setUsers } = useContext(userContext) // list of all users
  const [editUserId, seteditUserId] = useState('') // user na naedit - Object
  const [editUserModal, setEditUserModal] = useState(false) // modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get('/api/users')
        setUsers(res.data.allUsers)
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      }
    }
    getAllUsers()
  }, [])

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id)
    seteditUserId(userToEdit)
    setEditUserModal(true)
  }

  const handleDelete = (id) => {
    setDeleteUserId(id)
    setOpenDeleteModal(true)
  }

  return (
    <div className="m-5 flex flex-col gap-5">
      <h1 className="text-2xl font-medium">User Management</h1>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 border border-zinc-800 rounded-md cursor-pointer bg-zinc-900
        hover:bg-zinc-800 transition ease-in-out duration-300 w-fit text-white">
        New User
      </button>

      {isOpen && <AddUserModal setIsOpen={setIsOpen} setUsers={setUsers} users={users}
        loading={loading} setLoading={setLoading} />}

      {editUserModal && <EditUserModal setUsers={setUsers} users={users}
        editUserId={editUserId} setEditUserModal={setEditUserModal}
        loading={loading} setLoading={setLoading}
      />}

      {openDeleteModal && <DeleteModal setOpenDeleteModal={setOpenDeleteModal} deleteUserId={deleteUserId}
        setUsers={setUsers} users={users} loading={loading} setLoading={setLoading} />}

      <div className="w-full overflow-x-auto mt-10">
        <table className="w-full border border-zinc-700">
          <thead className=" text-left">
            <tr className='bg-zinc-800'>
              <th className="p-3 ">Name</th>
              <th className="p-3 ">Email</th>
              <th className="p-3 ">Role</th>
              <th className="p-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border border-zinc-800">
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 flex justify-baseline gap-2">
                    <button
                      onClick={() => handleEdit(user._id)}
                      title='Edit'
                      className="px-2 py-1 text-sm border border-zinc-800 
                   hover:bg-zinc-700 hover:text-green-500 transition ease-in-out duration-300
                     rounded-md cursor-pointer">
                      <Edit2Icon className='size-5' />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      title='Delete'
                      className="px-2 py-1 text-sm border border-zinc-800 rounded-md 
                  hover:bg-zinc-700 hover:text-red-500 transition ease-in-out duration-300
                    cursor-pointer">
                      <Trash2Icon className='size-5' />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 text-zinc-500 text-center">
                  No Users added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUserManagement


