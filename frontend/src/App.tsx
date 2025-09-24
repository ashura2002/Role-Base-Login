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


const App = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
  const location = useLocation()


  return (
    <main className='bg-zinc-900 text-slate-50'>

      {location.pathname !== '/' ? <header>
        <Header isShow={isShow} setIsShow={setIsShow}
          showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />
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
            <Route path="/admin-homepage" element={<AdminHomepage />} />
            <Route path="/admin-employees" element={<AdminEmployees />} />
            <Route path="/admin-request" element={<AdminRequest />} />
            <Route path="/admin-departments" element={<AdminDepartments />} />

            <Route path="/client-homepage" element={<ClientHomepage />} />
            <Route path="/client-request" element={<ClientRequestPage />} />
            <Route path="/client-form" element={<ClientApplyLeavePage />} />
          </Routes>
        </div>
      </div>

    </main>
  )
}

export default App