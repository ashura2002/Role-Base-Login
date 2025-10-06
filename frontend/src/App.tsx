import { Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import { SideBar } from "./components/SideBar"
import { adminLinks, clientLinks } from "./utils/sidebarData"
import { AdminHomepage } from "./pages/admin/AdminHomepage"
import LoginPage from "./pages/LoginPage"
import AdminEmployees from "./pages/admin/AdminEmployees"
import AdminRequest from "./pages/admin/AdminRequest"
import AdminDepartments from "./pages/admin/AdminDepartments"
import { useState } from "react"
import ClientHomepage from "./pages/clients/ClientHomepage"
import ClientRequestPage from "./pages/clients/ClientRequestPage"
import ClientApplyLeavePage from "./pages/clients/ClientApplyLeavePage"
import LoadingContext from "./contexts/LoadingContext"
import AdminUserManagement from "./pages/admin/AdminUserManagement"
import { UserContext, type Users } from './contexts/UserContext'
import AdminUsersOnDepartment from "./pages/admin/AdminUsersOnDepartment"


const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [users, setUsers] = useState<Users[]>([])
  const location = useLocation()


  return (
    <main className='bg-zinc-900 text-slate-50'>
      <LoadingContext.Provider value={{ loading, setLoading, isShowModal, setIsShowModal }}>
        <UserContext.Provider value={{ users, setUsers }}>
          {location.pathname !== '/' ? <header>
            <Header isShow={isShow} setIsShow={setIsShow} />
          </header> : null}

          <div className="flex">
            <aside>
              {location.pathname.startsWith('/admin') ? (
                <SideBar navlinks={adminLinks} isShow={isShow} />
              ) : location.pathname.startsWith('/client') ? (
                <SideBar navlinks={clientLinks} isShow={isShow} />
              ) : null}

            </aside>

            <div className="overflow-y-auto flex-2 h-screen p-5">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* ADMIN */}
                <Route path="/admin-homepage" element={<AdminHomepage />} />
                <Route path="/admin-employees" element={<AdminEmployees />} />
                <Route path="/admin-usermanagement" element={<AdminUserManagement />} />
                <Route path="/admin-request" element={<AdminRequest />} />
                <Route path="/admin-departments" element={<AdminDepartments />} />
                <Route path="/admin-users/:departmentName" element={<AdminUsersOnDepartment />} />
                {/* EMPLOYEE */}
                <Route path="/client-homepage" element={<ClientHomepage />} />
                <Route path="/client-request" element={<ClientRequestPage />} />
                <Route path="/client-form" element={<ClientApplyLeavePage />} />
              </Routes>
            </div>
          </div>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </main>
  )
}

export default App
