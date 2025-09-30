import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import type { Departments } from "../pages/admin/AdminDepartments";
import type { FormData } from "../pages/admin/AdminUserManagement";
import LoadingContext from "../contexts/LoadingContext";



interface UserModalProps {
    showModal: boolean;
    formData: FormData;
    setUsers: React.Dispatch<React.SetStateAction<any[]>>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}


const UserModal: React.FC<UserModalProps> = ({ setShowModal, setFormData, formData, setUsers }) => {
    const [departmentList, setDepatmentList] = useState<Departments[]>([])
    const context = useContext(LoadingContext)
    if (!context) return <div>Loading...</div>
    const { loading, setLoading } = context

    useEffect(() => {
        const getAllDepartments = async () => {
            try {
                const res = await axiosInstance.get('/api/departments')
                setDepatmentList(res.data.departments)
            } catch (error) {
                console.error(error)
            }
        }
        getAllDepartments()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axiosInstance.post('/api/auth/register', formData)
            console.log("Registered:", res.data);

            setShowModal(false);
            setUsers((prev) => [...prev, res.data.user]);
            setFormData({
                firstName: "",
                lastName: "",
                age: 0,
                email: "",
                password: "",
                role: "",
                department: "",
            });

        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-zinc-800 rounded-2xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4">Register New User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 bg-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">Employee</option>
                        <option value="hr">HR</option>
                        <option value="program_head">Program Head</option>
                        <option value="president">President</option>
                    </select>

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border border-zinc-700 bg-zinc-700 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                        required
                    >
                        <option value="" disabled>
                            Select Department
                        </option>
                        {departmentList.map((dep) => (
                            <option key={dep._id} value={dep.departmentName}>
                                {dep.departmentName}
                            </option>
                        ))}
                    </select>


                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 rounded-lg bg-zinc-600 hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;

