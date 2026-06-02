import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Adoption from './Pages/Adoption'
import BecomeSeller from './Pages/BecomeSeller'
import UserDashboard from './Pages/Dashboard/UserDashboard'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'

function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="app-header">
      <NavLink to="/" className="brand" style={{ textDecoration: 'none' }}>
        🐾 Pet Store
      </NavLink>
      <nav className="app-nav">
        <NavLink to="/" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')} end>
          Home
        </NavLink>
        <NavLink to="/adoption" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}>
          Adoption
        </NavLink>
        <NavLink to="/become-seller" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}>
          Become a Seller
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}>
          Contact
        </NavLink>

        {currentUser ? (
          <>
            <NavLink
              to={currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
              className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}
            >
              Dashboard
            </NavLink>
            <button className="nav-pill logout-nav" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => 'nav-pill' + (isActive ? ' active' : '')}>
              Login
            </NavLink>
            <NavLink to="/signin" className="nav-pill nav-cta">
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/adoption"        element={<Adoption />} />
              <Route path="/become-seller"   element={<BecomeSeller />} />
              <Route path="/signin"          element={<Signin />} />
              <Route path="/login"           element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about"           element={<About />} />
              <Route path="/contact"         element={<Contact />} />
              <Route path="/user-dashboard"  element={
                <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
