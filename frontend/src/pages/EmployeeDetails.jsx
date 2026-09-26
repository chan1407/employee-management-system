import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../services/employeeService'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (isLoading) return <Loading label="Loading employee..." />

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Employee Details</h1>
          <p>Complete record for this employee</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => navigate('/employees')}>
            Back
          </button>
          {employee && (
            <button className="btn btn-primary" onClick={() => navigate(`/employees/edit/${employee.id}`)}>
              Edit
            </button>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />

      {employee && (
        <div className="surface detail-grid">
          <div className="detail-field">
            <div className="detail-label">Employee ID</div>
            <div className="detail-value">{employee.id}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Name</div>
            <div className="detail-value">{employee.name}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Email</div>
            <div className="detail-value">{employee.email}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Phone</div>
            <div className="detail-value">{employee.phone}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Department</div>
            <div className="detail-value">{employee.department}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Role</div>
            <div className="detail-value">{employee.role}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Joining Date</div>
            <div className="detail-value">{employee.joiningDate}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Salary</div>
            <div className="detail-value">₹{employee.salary?.toLocaleString()}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Address</div>
            <div className="detail-value">{employee.address}</div>
          </div>
        </div>
      )}
    </div>
  )
}
