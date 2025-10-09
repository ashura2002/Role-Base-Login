import { Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import { SideBar } from "./components/SideBar"
import { adminLinks, clientLinks } from "./utils/sidebarData"
import AdminHomepage from "./pages/admin/AdminHomepage"
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
import AdminBuildinManagement from "./pages/admin/AdminBuildinManagement"
import AdminEmployeeInfo from "./pages/admin/AdminEmployeeInfo"
import { RequestContext, type RequestFormInterface } from "./contexts/FormRequestContext"
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [users, setUsers] = useState<Users[]>([])
  const [requests, setRequest] = useState<RequestFormInterface[]>([])
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

            <RequestContext.Provider value={{ requests, setRequest }}>
              <div className="overflow-y-auto flex-2 h-screen p-5">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  {/* ADMIN */}
                  <Route path="/admin-homepage" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminHomepage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-employees" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminEmployees />
                    </ProtectedRoute>} />

                  <Route path="/admin/-employees/:id" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminEmployeeInfo />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-usermanagement" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminUserManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-request" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminRequest />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-departments" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminDepartments />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-users/:departmentName" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminUsersOnDepartment />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin-building-management" element={
                    <ProtectedRoute allowRoles={['admin', 'hr', 'program_head', 'president']}>
                      <AdminBuildinManagement />
                    </ProtectedRoute>
                  } />


                  {/* EMPLOYEE */}
                  <Route path="/client-homepage" element={
                    <ProtectedRoute allowRoles={['user']}>
                      <ClientHomepage />
                    </ProtectedRoute>
                  } />
                  <Route path="/client-form" element={
                    <ProtectedRoute allowRoles={['user']}>
                      <ClientApplyLeavePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/client-request" element={
                    <ProtectedRoute allowRoles={['user']}>
                      <ClientRequestPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </RequestContext.Provider>
          </div>
        </UserContext.Provider>
      </LoadingContext.Provider>
    </main>
  )
}

export default App

