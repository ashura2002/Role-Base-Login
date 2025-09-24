import { KeyRound, MailCheck } from "lucide-react"
import type React from "react"
import { useState } from "react"
import axiosInstance from "../utils/AxiosInstance"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

interface TokenPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return alert('Fill up all input')
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
      }

    } catch (error) {
      console.error(error)
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

          <button className="border rounded-full mt-3 p-2 cursor-pointer border-gray-400 font-medium">Login</button>
        </form>

      </div>
    </div>
  )
}

export default LoginPage