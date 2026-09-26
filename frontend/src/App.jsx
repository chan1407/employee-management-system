import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Employees from './pages/Employees.jsx'
import AddEmployee from './pages/AddEmployee.jsx'
import EditEmployee from './pages/EditEmployee.jsx'
import EmployeeDetails from './pages/EmployeeDetails.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContext.jsx'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employees',
  '/employees/add': 'Add Employee',
  '/profile': 'Profile',
}

function AppLayout({ children }) {
  const location = useLocation()
  const title =
    TITLES[location.pathname] ||
    (location.pathname.startsWith('/employees/edit') ? 'Edit Employee' : 'Employee Details')

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Navbar title={title} />
        {children}
      </div>
    </div>
  )
}

function Protected({ children }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/employees" element={<Protected><Employees /></Protected>} />
      <Route path="/employees/add" element={<Protected><AddEmployee /></Protected>} />
      <Route path="/employees/edit/:id" element={<Protected><EditEmployee /></Protected>} />
      <Route path="/employees/:id" element={<Protected><EmployeeDetails /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
