import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AdminDashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pet_store_users') || '[]')
    setUsers(stored)
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  const NAV = [
    { key: 'Dashboard', icon: '🏠' },
    { key: 'Users',     icon: '👥' },
    { key: 'Products',  icon: '📦' },
    { key: 'Reports',   icon: '📊' },
    { key: 'Settings',  icon: '⚙️' },
  ]

  return (
    <div className="dash-layout admin-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar admin-sidebar">
        <div className="dash-brand">🛡️ Admin Panel</div>
        <div className="dash-user-info">
          <div className="dash-avatar admin-avatar">A</div>
          <div>
            <p className="dash-user-name">{currentUser?.username}</p>
            <p className="dash-user-role">Administrator</p>
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

      {/* Main */}
      <div className="dash-main">
        <header className="dash-topbar admin-topbar">
          <div>
            <h1 className="dash-title">{activeNav}</h1>
            <p className="dash-sub">Logged in as <strong>{currentUser?.username}</strong> — Administrator</p>
          </div>
          <div className="dash-avatar admin-avatar">A</div>
        </header>

        <div className="dash-content">
          {/* Tiles */}
          <div className="dash-tiles">
            <div className="dash-tile">
              <div className="tile-icon tile-icon-blue">👥</div>
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="dash-tile">
              <div className="tile-icon tile-icon-green">📦</div>
              <h3>Products</h3>
              <p>0</p>
            </div>
            <div className="dash-tile">
              <div className="tile-icon tile-icon-amber">📊</div>
              <h3>Reports</h3>
              <p>—</p>
            </div>
            <div className="dash-tile">
              <div className="tile-icon tile-icon-purple">⚙️</div>
              <h3>Settings</h3>
              <p>—</p>
            </div>
          </div>

          {/* Welcome */}
          <div className="dash-welcome-banner">
            <div>
              <h2>Good day, {currentUser?.firstName || 'Admin'} 👋</h2>
              <p>Here's a quick overview of your store. All systems are running normally.</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h3>Registered Users</h3>
              <span>{users.length} total</span>
            </div>
            <div className="admin-users-table">
              {users.length === 0 ? (
                <p className="no-data">No users registered yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.username}>
                        <td>{i + 1}</td>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.username}</td>
                        <td><span className="role-badge">{u.role}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
