import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signin() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { firstName, lastName, username, password, confirmPassword } = form
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      setError('Please fill in all fields.'); return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.'); return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.'); return
    }

    const result = register({ firstName, lastName, username, password })
    if (result.success) {
      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
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
            <h2>Join Pet Store</h2>
            <p>Create your free account and start exploring thousands of pet products and adoption listings.</p>
            <div className="auth-side-points">
              <div className="auth-side-point"><span>✓</span>Free to join</div>
              <div className="auth-side-point"><span>✓</span>Adopt pets near you</div>
              <div className="auth-side-point"><span>✓</span>Sell your products</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '32px' }}>© 2026 Pet Store</p>
        </div>

        {/* Right panel */}
        <div className="auth-card">
          <h1>Create account</h1>
          <p className="auth-copy">Fill in the details below to get started.</p>

          {error   && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-form-grid">
              <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
              </div>
              <div className="form-field form-field-full">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Choose a username" value={form.username} onChange={handleChange} autoComplete="username" />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} autoComplete="new-password" />
              </div>
              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">Create Account →</button>

            <div className="auth-links">
              <span>Already have an account? <Link to="/login">Sign in</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
