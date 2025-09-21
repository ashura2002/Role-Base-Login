import React from 'react'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'

const DeleteModal = ({ setOpenDeleteModal, deleteUserId, users, setUsers, loading, setLoading }) => {

    const removeUser = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.delete(`/api/users/${deleteUserId}`)
            setUsers(users.filter((user) => user._id !== deleteUserId)) //pag mag delete ug item sa array, filter
            toast.success(res.data.message)
            setOpenDeleteModal(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">
                    Are you sure you want to delete?
                </h2>

                <div className=' p-2 flex justify-end gap-2'>
                    <button
                        onClick={() => setOpenDeleteModal(false)}
                        className='py-1 px-2.5
                     hover:text-green-500 transition ease-in-out duration-300
                     rounded-md cursor-pointer
                    '>No</button>

                    <button
                        disabled={loading}
                        onClick={removeUser}
                        className='py-1 px-2.5 rounded-md
                     hover:text-red-500 transition ease-in-out duration-300
                    cursor-pointer
                    '>
                        {loading ? 'Deleting...' : 'Yes'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal