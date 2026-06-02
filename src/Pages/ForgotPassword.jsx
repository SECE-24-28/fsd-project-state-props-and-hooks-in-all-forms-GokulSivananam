import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Left panel */}
        <div className="auth-side">
          <div className="auth-side-brand">🐾 Pet Store</div>
          <div>
            <h2>Reset your password</h2>
            <p>Enter your username and choose a new password. Your account will remain secure.</p>
            <div className="auth-side-points">
              <div className="auth-side-point"><span>🔒</span>Your data is safe</div>
              <div className="auth-side-point"><span>✓</span>Instant account recovery</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '32px' }}>© 2026 Pet Store</p>
        </div>

        {/* Right panel */}
        <div className="auth-card">
          <h1>Forgot password?</h1>
          <p className="auth-copy">Enter your username and set a new password.</p>

          <form className="auth-form" noValidate>
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Your username" autoComplete="username" />
            </div>
            <div className="form-field">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder="New password" autoComplete="new-password" />
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm new password" autoComplete="new-password" />
            </div>

            <button type="submit" className="auth-submit-btn">Reset Password →</button>

            <div className="auth-links">
              <span>Remembered it? <Link to="/login">Back to Sign in</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
