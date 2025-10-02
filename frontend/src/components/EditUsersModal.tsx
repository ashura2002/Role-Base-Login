import { UserCircle2, KeyRoundIcon, Save, X } from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import type React from "react";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

interface EditProps {
    editId: string | null;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

function EditUsersModal({ editId, setShowEditModal }: EditProps) {
    const [firstName, setFirstName] = useState<string>('')
    const [password, setPasword] = useState<string>('')
    const context = useContext(UserContext)
    if (!context) return <div>Loading...</div>

    const { setUsers } = context

    const modifyUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!firstName || !password) return Swal.fire({
            title: `Input field can't be blank`,
            icon: 'error'
        })
        try {
            const res = await axiosInstance.put(`/api/users/${editId}`, {
                firstName: firstName,
                password: password
            })
            setUsers(prev => prev.map((u) => u._id === res.data.user._id ? res.data.user : u))
            Swal.fire({
                title: res.data.message,
                icon: "success"
            });
            setShowEditModal(false)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
            <div className="bg-zinc-800 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-center">
                        Edit User
                    </h2>
                    <X
                        onClick={() => setShowEditModal(false)}
                        className="cursor-pointer size-5" />
                </div>


                <form className="space-y-4" onSubmit={modifyUser}>
                    {/* Firstname */}
                    <div>
                        <p className="text-sm mb-1">Firstname:</p>
                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 
                        focus-within:ring-2 focus-within:ring-blue-500">
                            <UserCircle2 className="text-gray-500 w-5 h-5" />
                            <input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                type="text"
                                placeholder="Enter firstname"
                                className="w-full outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <p className="text-sm mb-1">Password:</p>
                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 
                        focus-within:ring-2 focus-within:ring-blue-500">
                            <KeyRoundIcon className="text-gray-500 w-5 h-5" />
                            <input value={password}
                                onChange={e => setPasword(e.target.value)}
                                type="password"
                                placeholder="Enter password"
                                className="w-full outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Save button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2
                         bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Save className="w-5 h-5" />
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
export default EditUsersModal