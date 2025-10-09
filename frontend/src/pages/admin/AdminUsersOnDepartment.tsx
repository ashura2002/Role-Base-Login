import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import LayoutWrapper from "../../components/LayoutWrapper";
import Swal from "sweetalert2";

interface UsersOnDep {
    _id: string;
    fullname: string;
    email: string;
    firstName: string;
    lastName: string;
}

const AdminUsersOnDepartment: React.FC = () => {
    const [message, setMessage] = useState("");
    const [usersOnDepartment, setUsersOnDepartment] = useState<UsersOnDep[]>([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { _id } = location.state;
    const { departmentName } = useParams();

    useEffect(() => {
        const getUsersOnThisDepartment = async () => {
            try {
                const res = await axiosInstance.get(`/api/departments/${_id}/users`);
                setMessage(res.data.message);
                setUsersOnDepartment(res.data.departments.userWithDepartment);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong. Try again later.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        };
        getUsersOnThisDepartment();
    }, []);

    return (
        <div className="p-5">
            <ArrowLeftIcon
                onClick={() => navigate(-1)}
                className="cursor-pointer hover:text-gray-400 transition"
            />

            <div className="text-center mt-5">
                <h1 className="font-semibold text-3xl">{departmentName}</h1>
                <p className="text-gray-400 mt-1">{message}</p>
            </div>

            <LayoutWrapper>
                <ul className="mt-10 space-y-3">
                    {usersOnDepartment.map((u) => (
                        <li
                            key={u._id}
                            className="border bg-zinc-800 border-gray-700 hover:border-gray-300 transition p-4 rounded-md"
                        >
                            <span className="font-medium">{u.fullname}</span>{" "}
                            <span className="text-gray-400">- {u.email}</span>
                        </li>
                    ))}
                </ul>
            </LayoutWrapper>
        </div>
    );
};

export default AdminUsersOnDepartment;
