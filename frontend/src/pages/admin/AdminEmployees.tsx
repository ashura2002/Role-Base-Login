import { SearchIcon, UserPlus2Icon } from "lucide-react"
import LayoutWrapper from "../../components/LayoutWrapper"
import EmployeeCard from "../../components/EmployeeCard"
import { useContext, useEffect } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const AdminEmployees = () => {
  const usersCtx = useContext(UserContext)
  if (!usersCtx) return <div>Loading...</div>
  const { users, setUsers } = usersCtx
  const navigate = useNavigate()

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const res = await axiosInstance.get('/api/users')
        setUsers(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getAllEmployees()
  }, [])


  return (
    <div className=" p-2">
      <div className="flex flex-col gap-3">
        <div className="border border-gray-200 rounded-full flex gap-3 items-center px-5">
          <SearchIcon />
          <input type="text" placeholder="Search by name..." className="p-2 w-full border-0 outline-0" />
        </div>

        <div className="mt-5 flex items-center justify-between" >
          <h1 className="text-2xl font-medium">EMPLOYEES</h1>
          <UserPlus2Icon className="cursor-pointer" onClick={() => navigate('/admin-usermanagement')} />
        </div>

        <LayoutWrapper>
          {users.map((user) => (
            <EmployeeCard
              key={user._id}
              firstName={user.firstName} lastName={user.lastName} email={user.email} role={user.role} />
          ))}
        </LayoutWrapper>

      </div>
    </div>
  )
}

export default AdminEmployees