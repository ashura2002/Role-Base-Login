import axios from "axios"
import { KeyRound, MailCheck, User2Icon } from "lucide-react"
import type React from "react"
import { useState } from "react"


const LoginPage = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        firstName: firstName,
        email: email,
        password: password
      })
      console.log(res)
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
            <span>FirstName</span>
            <div className="border border-gray-400 rounded-full py-1 px-2.5 flex items-center gap-1">
              <User2Icon />
              <input
                value={firstName} onChange={e => setFirstName(e.target.value)}
                type="text" className="border-0 outline-0 w-full p-1" />
            </div>
          </div>

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