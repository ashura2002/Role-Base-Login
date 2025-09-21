import { LogOut, LogsIcon, LucideUserCircle2, Menu, SunMediumIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../context/UserContext'

const Sidebar = ({ links }) => {
    const [isCollaps, setIsCollaps] = useState(false)
    const { names } = useContext(userContext)

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('userEmail')
        navigate('/')
    }


    return (
        <div className={`bg-zinc-900 flex flex-col justify-between transition-all duration-300
        ${!isCollaps ? 'w-[250px]' : 'w-[60px]'}
         h-screen`}>

            <div className={`flex flex-col gap-5 mt-5`}>
                <div className='flex py-1 gap-5 items-center px-2'>
                    <Menu className='cursor-pointer' onClick={() => setIsCollaps(!isCollaps)} />
                    {!isCollaps && <span className='text-2xl'>👽</span>}
                </div>

                <div className='grid gap-3 mt-10'>
                    {
                        links.map((link, index) => (
                            <Link
                                title={link.text}
                                className='flex p-2 items-center  justify-baseline
                                rounded-full gap-3 hover:bg-zinc-800 transition ease-in-out duration-300'
                                key={index} to={link.to}>
                                {link.icon}
                                {!isCollaps ? link.text : ''}
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-col gap-5 mb-5'>
                <div className='flex gap-3 rounded-full p-2 items-center'>
                    <LucideUserCircle2 />
                    {!isCollaps && <h1>{`${names.slice(0, 1).toUpperCase()}${names.slice(1).toLowerCase()}`}</h1>}
                </div>
                <div className='flex gap-3 rounded-full p-2 items-center'>
                    <SunMediumIcon />
                    {!isCollaps && 'Light'}
                </div>
                <button
                    onClick={logout}
                    className='flex gap-3 p-2 rounded-full cursor-pointer'>
                    <LogOut />
                    {!isCollaps && <span>Logout</span>}</button>
            </div>

        </div>
    )
}

export default Sidebar
