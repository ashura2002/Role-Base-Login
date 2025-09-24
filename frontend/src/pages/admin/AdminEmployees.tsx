import { SearchIcon, UserPlus2Icon } from "lucide-react"
import LayoutWrapper from "../../components/LayoutWrapper"
import EmployeeCard from "../../components/EmployeeCard"
import { useEffect } from "react"
// import axios from "axios"


const AdminEmployees = () => {

  useEffect(() => {
    // const getAllEmployees = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:8000/api/users')

    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    // getAllEmployees()
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
          <UserPlus2Icon className="cursor-pointer" />
        </div>

        <LayoutWrapper>
          <EmployeeCard />
        </LayoutWrapper>

      </div>
    </div>
  )
}

export default AdminEmployees