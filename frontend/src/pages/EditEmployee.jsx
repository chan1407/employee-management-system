import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, updateEmployee } from '../services/employeeService'
import EmployeeForm from '../components/EmployeeForm.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'

export default function EditEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const data = await getEmployeeById(id)
        if (isMounted) setEmployee(data)
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || 'Failed to load employee')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [id])

  async function handleSubmit(values) {
    setError('')
    setIsSubmitting(true)
    try {
      await updateEmployee(id, values)
      navigate('/employees', { state: { message: 'Employee updated successfully' } })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Edit Employee</h1>
          <p>Update employee information</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      {isLoading ? (
        <Loading label="Loading employee..." />
      ) : employee ? (
        <EmployeeForm
          initialValues={employee}
          onSubmit={handleSubmit}
          submitLabel="Update Employee"
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  )
}
