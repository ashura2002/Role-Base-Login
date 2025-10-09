import { useEffect, useState } from "react"
import axiosInstance from "../../utils/AxiosInstance"
import { useNavigate } from "react-router-dom";

interface CurrentLoginUser {
  _id: string;
  department: {
    _id?: string;
    departmentName: string;
    descriptions: string;
  }
  firstName: string;
  fullname: string;
  email: string;
  role: string;
  age: number
}

const ClientHomepage = () => {
  const [currentLogin, setCurrentLogin] = useState<CurrentLoginUser | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getCurrentProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/users/current')
        setCurrentLogin(res.data.user)
      } catch (error) {
        console.error(error)
      }
    }
    getCurrentProfile()
  }, [])

  return (
    <main className="p-6">
      <section className="p-10 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Welcome <span className="uppercase">{currentLogin?.firstName}
        </span> to Your Client Portal</h1>
        <p className="text-gray-400">Access your requests and manage your profile.</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/client-request')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            View Requests</button>
          <button
            onClick={() => {
              alert('wala pa nahuman')
            }}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg">Go to Profile</button>
        </div>
      </section>
    </main>
  )
}
export default ClientHomepage