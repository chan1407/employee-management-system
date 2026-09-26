import api from './api'

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password })
  const { token, email: adminEmail, role } = response.data

  localStorage.setItem('ems_token', token)
  localStorage.setItem('ems_admin', JSON.stringify({ email: adminEmail, role }))

  return response.data
}

export function logout() {
  localStorage.removeItem('ems_token')
  localStorage.removeItem('ems_admin')
}

export function getToken() {
  return localStorage.getItem('ems_token')
}

export function getStoredAdmin() {
  const raw = localStorage.getItem('ems_admin')
  return raw ? JSON.parse(raw) : null
}
