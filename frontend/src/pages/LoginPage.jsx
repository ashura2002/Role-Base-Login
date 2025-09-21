import React, { useContext, useState } from 'react'
import { KeyIcon, Mail, UserRound } from 'lucide-react'
import axiosInstance from '../utils/AxiosInstance'
import userContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'


const LoginPage = () => {
    const [firstname, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setRole, setNames, setLoading, loading, setUserEmail, setRequest } = useContext(userContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axiosInstance.post('/api/auth/login', {
                firstName: firstname.toLowerCase(),
                email: email.toLowerCase(),
                password: password.toLowerCase()
            })

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('name', res.data.user.firstName)
            localStorage.setItem('userEmail', res.data.user.email)
            setRole(res.data.user.role)
            setNames(res.data.user.firstName)
            setUserEmail(res.data.user.email)
            setRequest([])
            if (res.data.user.role === 'admin' || res.data.user.role === 'program head'
                || res.data.user.role === 'hr' || res.data.user.role === 'president'
            ) {
                navigate('/admin-homepage')
            } else {
                navigate('/client-homepage')
            }
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }


    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            <div className='w-[500px]'>
                <form className='p-5 grid gap-2.5' onSubmit={handleSubmit}>
                    <div>
                        <h1 className='text-3xl font-medium mb-5'>Login Account</h1>
                    </div>

                    <div className='flex border border-gray-400 w-full rounded-full gap-2 items-center p-1'>
                        <UserRound className='size-5 text-gray-500' />
                        <input type="text"
                            value={firstname}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder='Firstname' className='border-0 outline-0 w-full' />
                    </div>


                    <div className='flex border  border-gray-400 w-full rounded-full gap-2 items-center p-1'>
                        <Mail className='size-5 text-gray-500' />
                        <input type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email' className='border-0 outline-0 w-full' />
                    </div>


                    <div className='flex border  border-gray-400 w-full rounded-full gap-2 items-center p-1'>
                        <KeyIcon className='size-5 text-gray-500' />
                        <input type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Password' className='border-0 outline-0 w-full' />
                    </div>

                    <button
                        disabled={loading}
                        className='rounded-full p-1 cursor-pointer relative
                    text-white bg-blue-600 hover:bg-blue-500 duration-300 transition ease-in-out'>
                        {loading ? <LoadingSpinner /> : 'Login'}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default LoginPage
