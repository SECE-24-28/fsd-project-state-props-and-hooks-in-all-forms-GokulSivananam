import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AdoptionPage from './AdoptionPage'
import SellerPage from './SellerPage'

const NAV = [
  { key: 'Adoption',        icon: '🐾' },
  { key: 'Become a Seller', icon: '🏪' },
  { key: 'My Requests',     icon: '📋' },
  { key: 'Settings',        icon: '⚙️' },
]

function UserDashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('Adoption')

  function handleLogout() { logout(); navigate('/') }

  function renderContent() {
    if (activeNav === 'Adoption')        return <AdoptionPage />
    if (activeNav === 'Become a Seller') return <SellerPage />
    return (
      <div className="store-empty-state">
        <span>🚧</span>
        <h4>{activeNav}</h4>
        <p>This section is coming soon.</p>
      </div>
    )
  }

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-brand">🐾 Pet Store</div>
        <div className="dash-user-info">
          <div className="dash-avatar">
            {currentUser?.firstName?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="dash-user-name">{currentUser?.firstName}</p>
            <p className="dash-user-role">Member</p>
          </div>
        </div>
        <nav className="dash-nav">
          {NAV.map(({ key, icon }) => (
            <div
              key={key}
              className={`dash-nav-item ${activeNav === key ? 'active' : ''}`}
              onClick={() => setActiveNav(key)}
            >
              {icon} {key}
            </div>
          ))}
        </nav>
        <button className="dash-logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div>
            <h1 className="dash-title">{activeNav}</h1>
            <p className="dash-sub">Welcome back, {currentUser?.firstName}</p>
          </div>
          <div className="dash-avatar">
            {currentUser?.firstName?.[0]?.toUpperCase() ?? 'U'}
          </div>
        </header>
        <div className="dash-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
