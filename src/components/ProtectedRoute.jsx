import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, role }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <div className="loading">Loading...</div>

  if (!currentUser) return <Navigate to="/login" replace />

  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />
  }

  return children
}

export default ProtectedRoute
