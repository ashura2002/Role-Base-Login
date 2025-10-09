import { ArrowLeft, PlusCircle, Edit, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { UserContext } from "../../contexts/UserContext";
import UserModal from "../../components/AddUsersModal";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import EditUsersModal from "../../components/EditUsersModal";

export interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: string;
  department: string;
}

const AdminUserManagement = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext);
  if (!context) return <div>Loading...</div>;

  const { users, setUsers } = context;
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editModal, setShowEditModal] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
    role: "",
    department: "",
  });

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users");
        setUsers(res.data.user);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong, Try again later',
          timer: 1000
        })
      }
    };
    getAllUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await axiosInstance.delete(`/api/users/${selectedUser}`);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser));
      setShowDelete(false);
      Swal.fire({
        title: "Deleted Successfully!",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong, Try again later',
        timer: 1000
      })
    }
  };

  const handleEdit = async (id: string) => {
    setShowEditModal(true)
    const userToEdit = users.find((u) => u._id === id)
    const userId = userToEdit?._id
    setEditId(userId ?? null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="size-6 cursor-pointer hover:text-blue-600" />
        <h1 className="font-semibold text-2xl">User Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 cursor-pointer border border-zinc-700 hover:border-zinc-600
        transition ease-in-out duration-300 rounded-md"
        >
          <PlusCircle className="size-5" />
          Add User
        </button>
      </div>

      {/* Table Section */}
      <div className="px-5">
        <div className="overflow-x-auto border border-zinc-700">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-zinc-700">
                <th className="px-6 py-3 border-r border-zinc-600 font-medium">
                  Name
                </th>
                <th className="px-6 py-3 border-r border-zinc-600 font-medium">
                  Email
                </th>
                <th className="px-6 py-3 border-r border-zinc-600 font-medium">
                  Role
                </th>
                <th className="px-6 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-zinc-700">
                  <td className="px-6 py-1.5">{user.fullname}</td>
                  <td className="px-6">{user.email}</td>
                  <td className="px-6">
                    <span className="px-3">{user.role}</span>
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        handleEdit(user._id)
                      }}
                      className="rounded-md p-1.5 hover:bg-blue-100 text-blue-600">
                      <Edit className="size-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user._id);
                        setShowDelete(true);
                      }}
                      className="rounded-md p-1.5 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <UserModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          setUsers={setUsers}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        show={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete this user?`}
      />

      {editModal && (
        <EditUsersModal editId={editId} setShowEditModal={setShowEditModal} />
      )}

    </div>
  );
};

export default AdminUserManagement;