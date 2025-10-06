import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import LayoutWrapper from "../../components/LayoutWrapper"
import DepartmentCard from "../../components/DepartmentCard";
import { PlusCircleIcon } from "lucide-react";
import AddDepartmentModal from "../../components/AddDepartmentModal";
import Swal from "sweetalert2";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import EditDepartmentModal from "../../components/EditDepartmentModal";
import { Link } from "react-router-dom";

export interface Departments {
  _id: string;
  departmentName: string;
  descriptions: string;
}


const AdminDepartments: React.FC = () => {
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [departments, setDepartments] = useState<Departments[]>([])
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showDeleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const [showEditDepartmentModal, setShowEditDepartmentModal] = useState<boolean>(false)
  const [depToDelete, setDepToDelete] = useState<string | null>(null)
  const [depToEdit, setDepToEdit] = useState<string | null>(null)
  const [departmentName, setDepartmentName] = useState<string>('')
  const [descriptions, setDescription] = useState<string>('')


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
    } catch (error: unknown | any) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong'
      })
    }
  }

  const showDeleteModal = (id: string) => {
    setDeleteConfirmation(true)
    const departmentToDelete = departments.find((d) => d._id === id)
    setDepToDelete(departmentToDelete?._id ?? null)
  }

  const deleteDepartment = async () => {
    try {
      await axiosInstance.delete(`/api/departments/${depToDelete}`)
      Swal.fire({
        title: 'Success',
        text: 'Delete Successfully'
      })
      setDeleteConfirmation(false)
      setDepartments(prev => prev.filter((d) => d._id !== depToDelete))
    } catch (error) {
      console.error(error)
    }
  }

  const showEditModal = (id: string) => {
    setShowEditDepartmentModal(true)
    const departmentToEdit = departments.find((d) => d._id === id)
    if (departmentToEdit) {
      setDepToEdit(departmentToEdit._id);
      setShowEditDepartmentModal(true);
      setDepartmentName(departmentToEdit.departmentName)
      setDescription(departmentToEdit.descriptions)
    }
  }

  const editDepartment = async (data: { departmentName: string, descriptions: string }) => {
    try {
      await axiosInstance.put(`/api/departments/${depToEdit}`, data)
      setDepartments(prev =>
        prev.map((d) => d._id === depToEdit ? { ...d, departmentName: data.departmentName.toUpperCase(), descriptions: data.descriptions } : d)
      )
      Swal.fire({
        title: 'Success',
        text: 'Edited Successfully'
      })
      setDepartmentName('')
      setDescription('')
      setShowEditDepartmentModal(false)
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
          <Link to={`/admin-users/${dept.departmentName}`} key={dept._id} state={dept} >
            <DepartmentCard departmentName={dept.departmentName}
              onEdit={() => showEditModal(dept._id)}
              descriptions={dept.descriptions} onDelete={() => showDeleteModal(dept._id)} />
          </Link>
        ))}
      </LayoutWrapper>

      {showAddModal && (
        <AddDepartmentModal
          onSubmit={addDepartment} show={showAddModal} onClose={() => setShowAddModal(false)} />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation onConfirm={deleteDepartment} onCancel={() => setDeleteConfirmation(false)}
          show={showDeleteConfirmation} title="Delete" message="Are you sure you want to delete this department? This action
          cannot be undone."/>
      )}

      {showEditDepartmentModal && (
        <EditDepartmentModal
          prevDepartmentName={departmentName} prevDescriptions={descriptions}
          isOpen={showEditDepartmentModal}
          onClose={() => setShowEditDepartmentModal(false)} onSubmit={editDepartment} />
      )}



    </div>
  )
}

export default AdminDepartments