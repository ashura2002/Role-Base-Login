import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import LayoutWrapper from "../../components/LayoutWrapper"
import DepartmentCard from "../../components/DepartmentCard";
import { PlusCircleIcon } from "lucide-react";
import AddDepartmentModal from "../../components/AddDepartmentModal";
import Swal from "sweetalert2";

export interface Departments {
  _id: string;
  departmentName: string;
  descriptions: string;
}


const AdminDepartments = () => {
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [departments, setDepartments] = useState<Departments[]>([])
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const res = await axiosInstance.get('/api/departments')
        setResponseMsg(res.data.message)
        setDepartments(res.data.departments)
      } catch (error) {
        console.error(error)
      }
    }
    getAllDepartments()
  }, [])

  const showModal = () => {
    setShowAddModal(true)
  }

  const addDepartment = async (data: { departmentName: string, descriptions: string }) => {
    try {
      const res = await axiosInstance.post('/api/departments', data)
      setDepartments(prev => [...prev, res.data.departments])
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Department Added Successfully"
      });
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <div className="flex justify-center items-center p-2">
        <h1 className="text-3xl font-medium uppercase">{responseMsg}</h1>
      </div>

      <div className="p-2 flex justify-end items-center m-5">
        <button
          onClick={showModal}
          className="flex border border-gray-700 hover:border-gray-300
        transition ease-in-out duration-300 p-1.5 rounded-md items-center justify-center gap-2">
          <PlusCircleIcon />
          Add Department
        </button>
      </div>

      <LayoutWrapper>
        {departments.map((dept) => (
          <DepartmentCard key={dept._id} departmentName={dept.departmentName}
            descriptions={dept.descriptions} />
        ))}
      </LayoutWrapper>


      {showAddModal && (
        <AddDepartmentModal
          onSubmit={addDepartment} show={showAddModal} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}

export default AdminDepartments