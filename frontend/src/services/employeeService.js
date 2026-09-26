import api from './api'

export async function getEmployees(search = '', department = '') {
  const response = await api.get('/employees', { params: { search, department } })
  return response.data
}

export async function getEmployeeById(id) {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

export async function createEmployee(payload) {
  const response = await api.post('/employees', payload)
  return response.data
}

export async function updateEmployee(id, payload) {
  const response = await api.put(`/employees/${id}`, payload)
  return response.data
}

export async function deleteEmployee(id) {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}

export async function getDashboardSummary() {
  const response = await api.get('/employees/dashboard')
  return response.data
}
