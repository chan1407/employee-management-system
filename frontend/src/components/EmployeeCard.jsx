import { useNavigate } from 'react-router-dom'

export default function EmployeeCard({ employee, onDeleteRequest }) {
  const navigate = useNavigate()

  return (
    <div className="surface" style={{ padding: '16px 18px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600 }}>{employee.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{employee.department} · {employee.role}</div>
        </div>
        <span style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>#{employee.id}</span>
      </div>
      <div style={{ marginTop: '10px', fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
        {employee.email} · {employee.phone}
      </div>
      <div className="row-actions" style={{ marginTop: '12px' }}>
        <button className="icon-btn" onClick={() => navigate(`/employees/${employee.id}`)}>View</button>
        <button className="icon-btn" onClick={() => navigate(`/employees/edit/${employee.id}`)}>Edit</button>
        <button className="icon-btn danger" onClick={() => onDeleteRequest(employee)}>Delete</button>
      </div>
    </div>
  )
}
