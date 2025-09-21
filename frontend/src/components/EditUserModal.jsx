import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../utils/AxiosInstance'

const EditUserModal = ({ setEditUserModal, editUserId, setUsers, users, loading, setLoading }) => {
    const [userInput, setUserInput] = useState({
        firstName: editUserId.firstName || '',
        password: editUserId.password || ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInput(prevData => ({ ...prevData, [name]: value })) // userInput
    }

    const closeModal = () => {
        setEditUserModal(false)
    }

    const editUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axiosInstance.put(`/api/users/${editUserId._id}`, userInput)
            setUsers(users.map((user) => user._id === editUserId._id ? { ...user, ...userInput } : user))
            toast.success(res.data.message)
            setEditUserModal(false)
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
                    Edit User
                </h2>
                <form className="flex flex-col gap-3" onSubmit={editUser}>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Firstname"
                        value={userInput.firstName}
                        onChange={handleChange}
                        className="p-2 border rounded-md bg-transparent border-zinc-300 dark:border-zinc-700"
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={userInput.password}
                        onChange={handleChange}
                        className="p-2 border rounded-md bg-transparent border-zinc-300 dark:border-zinc-700"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="px-3 py-1 rounded-md border border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-3 py-1 rounded-md bg-zinc-900 text-white hover:bg-zinc-800"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal