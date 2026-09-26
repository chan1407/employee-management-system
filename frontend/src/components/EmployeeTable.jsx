import { useNavigate } from 'react-router-dom'

export default function EmployeeTable({ employees, onDeleteRequest }) {
  const navigate = useNavigate()

  if (!employees.length) {
    return <div className="empty-state">No employees match your search or filter.</div>
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.joiningDate}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-btn" onClick={() => navigate(`/employees/${employee.id}`)}>
                    View
                  </button>
                  <button className="icon-btn" onClick={() => navigate(`/employees/edit/${employee.id}`)}>
                    Edit
                  </button>
                  <button className="icon-btn danger" onClick={() => onDeleteRequest(employee)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
