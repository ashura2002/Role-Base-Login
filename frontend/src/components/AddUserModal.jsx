import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/AxiosInstance";
import userContext from "../context/UserContext";

const AddUserModal = ({ setIsOpen, loading, setLoading }) => {
    const { setUsers } = useContext(userContext)
    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInput(prevData => ({ ...prevData, [name]: value }))
    }

    const addUser = async (e) => {
        e.preventDefault()
        if (!userInput.firstName || !userInput.lastName || !userInput.email || !userInput.password || !userInput.role)
            return toast.error('Fill up all fields!')

        setLoading(true)
        try {
            const res = await axiosInstance.post('/api/auth/register', {
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                age: userInput.age,
                email: userInput.email,
                password: userInput.password,
                role: userInput.role.toLowerCase() // naka lowecase sa schema
            })
            setUsers(prevData => [...prevData, res.data.newUser]) // storage of all users naka array
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }

        setIsOpen(false)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">
                    Add New User
                </h2>
                <form className="flex flex-col gap-3" onSubmit={addUser}>
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
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Lastname"
                        value={userInput.lastName}
                        onChange={handleChange}
                        className="p-2 border rounded-md bg-transparent border-zinc-300 dark:border-zinc-700"
                    />
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="age"
                        value={userInput.age}
                        onChange={handleChange}
                        className="p-2 border rounded-md bg-transparent border-zinc-300 dark:border-zinc-700"
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={userInput.email}
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
                    <select
                        value={userInput.role} onChange={handleChange} name="role"
                        className="p-2 border rounded-md bg-transparent border-zinc-300 dark:border-zinc-700"
                    >
                        <option className="bg-zinc-800" value="">Select Role</option>
                        <option value={'admin'} className="bg-zinc-800">Admin</option>
                        <option value={'user'} className="bg-zinc-800">User</option>
                        <option value={'program_head'} className="bg-zinc-800">Program Head</option>
                        <option value={'hr'} className="bg-zinc-800">HR</option>
                        <option value={'president'} className="bg-zinc-800">President</option>
                    </select>

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
    );
};

export default AddUserModal;
