// // ✅ App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Layout from './components/Layout'
// import Dashboard from './pages/Dashboard'
// import Home from './pages/Home'
// import Sales from './pages/Sales'
// import Inventory from './pages/Inventory'
// import BirdManagement from './pages/BirdManagement'
// import EggCollection from './pages/EggCollection'
// import ProtectedRoute from './routes/ProtectedRoute'

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes using shared layout */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Home />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="sales" element={<Sales />} />
//           <Route path="inventory" element={<Inventory />} />
//           <Route path="birds" element={<BirdManagement />} />
//           <Route path="eggs" element={<EggCollection />} />
//         </Route>

//          <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   )
// }

// // // src/App.jsx
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// // import Login from './pages/Login'
// // import Register from './pages/Register'
// // import Home from './pages/Home'
// // import ProtectedRoute from './routes/ProtectedRoute'

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Protected Routes */}
// //         <Route
// //           path="/"
// //           element={
// //             <ProtectedRoute>
// //               <Home />
// //             </ProtectedRoute>
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   )
// // }

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Sales from './pages/Sales'
import Inventory from './pages/Inventory'
import BirdManagement from './pages/BirdManagement'
import EggCollection from './pages/EggCollection'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - All nested under Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="birds" element={<BirdManagement />} />
            <Route path="eggs" element={<EggCollection />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}