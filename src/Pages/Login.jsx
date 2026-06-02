import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username || !password) { setError('Please fill in all fields.'); return }

    const result = login(username, password)
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin-dashboard' : '/user-dashboard', { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Left panel */}
        <div className="auth-side">
          <div className="auth-side-brand">🐾 Pet Store</div>
          <div>
            <h2>Welcome back</h2>
            <p>Sign in to manage your pets, orders and adoption requests.</p>
            <div className="auth-side-points">
              <div className="auth-side-point"><span>🐾</span>Browse adoption listings</div>
              <div className="auth-side-point"><span>🛒</span>Shop premium pet products</div>
              <div className="auth-side-point"><span>🏪</span>Apply to become a seller</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '32px' }}>© 2026 Pet Store</p>
        </div>

        {/* Right panel */}
        <div className="auth-card">
          <h1>Sign in</h1>
          <p className="auth-copy">Enter your credentials to access your account.</p>

          {error && <p className="form-error">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                type="text" id="username" placeholder="Enter your username"
                value={username} onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" placeholder="Enter your password"
                value={password} onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="auth-submit-btn">Sign in →</button>

            <div className="auth-links">
              <Link to="/forgot-password">Forgot your password?</Link>
              <span>Don't have an account? <Link to="/signin">Sign up</Link></span>
            </div>
          </form>

          <div className="admin-hint">
            Demo admin — username: <strong>admin</strong> / password: <strong>Admin@123</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
