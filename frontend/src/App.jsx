import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'
import AdminHomepage from './pages/admin/AdminHomepage'
import { AdminNavbarData, ClientNavbarData } from './utils/NavbarData'
import AdminUserManagement from './pages/admin/AdminUserManagement'
import AdminUserRequest from './pages/admin/AdminUserRequest'
import ClientHomepage from './pages/client/ClientHomepage'
import UserContext from './context/UserContext'
import ClientApplyRequest from './pages/client/ClientApplyRequest'
import ClientViewRequest from './pages/client/ClientViewRequest'
import ViewRequestForm from './pages/client/ViewRequestForm'
import AdminEmployees from './pages/admin/AdminEmployees'
import AdminEmployeeInfo from './pages/admin/AdminEmployeeInfo'

const App = () => {
  const location = useLocation()
  const hideSideBar = location.pathname === '/'

  const [role, setRole] = useState()
  const [names, setNames] = useState(localStorage.getItem('name'))
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
  const [users, setUsers] = useState([])
  const [requests, setRequest] = useState([])
  const [loading, setLoading] = useState(false)



  return (
    <main className='bg-[#121212] h-screen flex text-slate-100'>
      <UserContext.Provider value={{
        role, setRole, setNames, names, loading, setLoading, userEmail, setUserEmail,
        requests, setRequest, users, setUsers
      }}>
        <div className='flex w-full'>

          <aside>
            {!hideSideBar ? (
              location.pathname.startsWith('/client') ? <Sidebar links={ClientNavbarData} /> : location.pathname.startsWith('/admin') ?
                <Sidebar links={AdminNavbarData} /> : null
            ) : null}
          </aside>

          <div className='overflow-y-auto flex-2'>
            <Routes>
              <Route index path='/' element={<LoginPage />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/admin-homepage' element={<AdminHomepage />} />
              <Route path='/admin-user-management' element={<AdminUserManagement />} />
              <Route path='/admin-user-request' element={<AdminUserRequest />} />
              <Route path='/admin-employees' element={<AdminEmployees />} />
              <Route path='/admin-employees/:id' element={<AdminEmployeeInfo />} />

              {/* CLIENT */}
              <Route path='/client-homepage' element={<ClientHomepage />} />
              <Route path='/client-apply-request' element={<ClientApplyRequest />} />
              <Route path='/client-view-request' element={<ClientViewRequest />} />
              <Route path='/client-view-request/:id' element={<ViewRequestForm />} />
            </Routes>
          </div>

        </div>
      </UserContext.Provider>
    </main>
  )
}

export default App


