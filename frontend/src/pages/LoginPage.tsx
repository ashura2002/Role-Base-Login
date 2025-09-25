import { KeyRound, MailCheck } from "lucide-react"
import type React from "react"
import { useContext, useState } from "react"
import axiosInstance from "../utils/AxiosInstance"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import LoadingContext from "../contexts/LoadingContext"
import Swal from 'sweetalert2'

interface TokenPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
const LoginPage = () => {
  const context = useContext(LoadingContext)
  if (!context) return <div>Loading...</div>

  const { loading, setLoading } = context
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return alert('Fill up all input')
    setLoading(true)
    try {
      const res = await axiosInstance.post('/api/auth/login', {
        email: email,
        password: password
      })
      localStorage.setItem('token', res.data.token)
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token)
        localStorage.setItem('email', decoded.email)
        localStorage.setItem('role', decoded.role)
        localStorage.setItem('firstName', decoded.firstName)
        localStorage.setItem('lastName', decoded.lastName)
        if (decoded.role === 'admin' || decoded.role === 'hr' || decoded.role === 'program_head' || decoded.role === 'president') {
          navigate('/admin-homepage')
        } else {
          navigate('/client-homepage')
        }
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
          title: "Signed in successfully"
        });
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="p-5 w-[500px] flex flex-col gap-3">
        <h1 className="text-3xl font-medium p-5">Login Account</h1>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <span>Email</span>
            <div className="border border-gray-400 rounded-full py-1 px-2.5 flex items-center gap-1">
              <MailCheck />
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                type="text" className="border-0 outline-0 w-full p-1" />
            </div>
          </div>

          <div>
            <span>Password</span>
            <div className="border border-gray-400 rounded-full py-1 px-2.5 flex items-center gap-1">
              <KeyRound />
              <input
                value={password} onChange={e => setPassword(e.target.value)}
                type="text" className="border-0 outline-0 w-full p-1" />
            </div>
          </div>

          <button
            disabled={loading} className={`border ${loading ? 'bg-zinc-600' : 'bg-zinc-800'} rounded-full mt-3 p-2 cursor-pointer
             border-gray-400 font-medium`}>{loading ? 'Loading...' : 'Login'}</button>
        </form>

      </div>
    </div>
  )
}

export default LoginPage