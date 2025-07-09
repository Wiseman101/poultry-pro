// import { Outlet, Link } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md">
//         <div className="p-6 text-xl font-bold text-blue-900 border-b">🐓 PoultryPro</div>
//         <nav className="flex flex-col p-4 space-y-2 text-gray-700">
//           <Link to="/" className="hover:text-blue-700">🏠 Home</Link>
//           <Link to="/dashboard" className="hover:text-blue-700">📊 Dashboard</Link>
//           <Link to="/birds" className="hover:text-blue-700">🐥 Bird Management</Link>
//           <Link to="/eggs" className="hover:text-blue-700">🥚 Egg Collection</Link>
//           <Link to="/sales" className="hover:text-blue-700">💰 Sales</Link>
//         </nav>
//       </aside>

//       {/* Main content area */}
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold text-blue-900 border-b">🐓 PoultryPro</div>
        <div className="p-4 border-b">
          <p className="font-medium">Welcome, {user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <nav className="flex flex-col p-4 space-y-2 text-gray-700">
          <Link to="/" className="hover:text-blue-700">🏠 Home</Link>
          <Link to="/dashboard" className="hover:text-blue-700">📊 Dashboard</Link>
          <Link to="/birds" className="hover:text-blue-700">🐥 Bird Management</Link>
          <Link to="/eggs" className="hover:text-blue-700">🥚 Egg Collection</Link>
          <Link to="/sales" className="hover:text-blue-700">💰 Sales</Link>
          <button 
            onClick={handleLogout}
            className="text-left hover:text-red-600 mt-4"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}