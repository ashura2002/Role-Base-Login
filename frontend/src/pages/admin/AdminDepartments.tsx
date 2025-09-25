import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import LayoutWrapper from "../../components/LayoutWrapper"
import DepartmentCard from "../../components/DepartmentCard";

interface Departments {
  _id: string;
  departmentName: string;
  descriptions: string;
}


const AdminDepartments = () => {
  const [responseMsg, setResponseMsg] = useState<string>('')
  const [departments, setDepartments] = useState<Departments[]>([])

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const res = await axiosInstance.get('/api/departments')
        setResponseMsg(res.data.message)
        setDepartments(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getAllDepartments()
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center p-2">
        <h1 className="text-3xl font-medium">{responseMsg}</h1>
      </div>

      <LayoutWrapper>
        {departments.map((dept) => (
          <DepartmentCard key={dept._id} departmentName={dept.departmentName}
            descriptions={dept.descriptions} />
        ))}
      </LayoutWrapper>
    </div>
  )
}

export default AdminDepartments