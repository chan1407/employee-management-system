import { createContext, useContext, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(authService.getStoredAdmin())
  const [token, setToken] = useState(authService.getToken())

  async function login(email, password) {
    const data = await authService.login(email, password)
    setToken(data.token)
    setAdmin({ email: data.email, role: data.role })
    return data
  }

  function logout() {
    authService.logout()
    setToken(null)
    setAdmin(null)
  }

  const value = {
    admin,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
