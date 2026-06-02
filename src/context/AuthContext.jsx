import { createContext, useContext, useState, useEffect } from 'react'

const ADMIN_CREDENTIALS = { username: 'admin', password: 'Admin@123', role: 'admin' }
const USERS_KEY = 'pet_store_users'
const SESSION_KEY = 'pet_store_session'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY)
    if (session) {
      setCurrentUser(JSON.parse(session))
    }
    setLoading(false)
  }, [])

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  }

  function register({ firstName, lastName, username, password }) {
    const users = getUsers()
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists' }
    }
    const newUser = { firstName, lastName, username, password, role: 'user' }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    return { success: true }
  }

  function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const user = { username, role: 'admin', firstName: 'Admin' }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      setCurrentUser(user)
      return { success: true, role: 'admin' }
    }

    const users = getUsers()
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      const user = { username: found.username, role: 'user', firstName: found.firstName }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      setCurrentUser(user)
      return { success: true, role: 'user' }
    }

    return { success: false, message: 'Invalid username or password' }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
