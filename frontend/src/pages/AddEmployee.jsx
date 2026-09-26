import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../services/employeeService'
import EmployeeForm from '../components/EmployeeForm.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function AddEmployee() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(values) {
    setError('')
    setIsSubmitting(true)
    try {
      await createEmployee(values)
      navigate('/employees', { state: { message: 'Employee added successfully' } })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p>Create a new employee record</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <EmployeeForm onSubmit={handleSubmit} submitLabel="Add Employee" isSubmitting={isSubmitting} />
    </div>
  )
}
