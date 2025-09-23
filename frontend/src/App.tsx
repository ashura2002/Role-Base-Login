import Header from "./components/Header"
import SideBar from "./components/SideBar"
import { adminLinks } from "./utils/sidebarData"

const App = () => {
  return (
    <main className='bg-zinc-900 text-slate-50'>
      <header>
        <Header />
      </header>

      <div className="flex">
        <aside>
          <SideBar navlinks={adminLinks}/>
        </aside>

        <div className="overflow-y-auto flex-2">
            <p>main content</p>
        </div>
      </div>

    </main>
  )
}

export default App