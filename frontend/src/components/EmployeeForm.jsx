import { useState } from 'react'
import { validateEmployee } from '../utils/validation'
import { DEPARTMENTS } from './DepartmentFilter.jsx'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  role: '',
  joiningDate: '',
  salary: '',
  address: '',
}

export default function EmployeeForm({ initialValues, onSubmit, submitLabel = 'Save Employee', isSubmitting }) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validateEmployee(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ ...values, salary: Number(values.salary) })
    }
  }

  function field(name) {
    return errors[name] ? 'form-field has-error' : 'form-field'
  }

  return (
    <form className="surface" style={{ padding: '26px' }} onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className={field('name')}>
          <label>Employee Name</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Priya Sharma"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className={field('email')}>
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="name@company.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className={field('phone')}>
          <label>Phone Number</label>
          <input
            type="text"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className={field('department')}>
          <label>Department</label>
          <select value={values.department} onChange={(e) => handleChange('department', e.target.value)}>
            <option value="">Select department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <span className="field-error">{errors.department}</span>}
        </div>

        <div className={field('role')}>
          <label>Role</label>
          <input
            type="text"
            value={values.role}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="e.g. Software Engineer"
          />
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>

        <div className={field('joiningDate')}>
          <label>Joining Date</label>
          <input
            type="date"
            value={values.joiningDate}
            onChange={(e) => handleChange('joiningDate', e.target.value)}
          />
          {errors.joiningDate && <span className="field-error">{errors.joiningDate}</span>}
        </div>

        <div className={field('salary')}>
          <label>Salary</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.salary}
            onChange={(e) => handleChange('salary', e.target.value)}
            placeholder="e.g. 55000"
          />
          {errors.salary && <span className="field-error">{errors.salary}</span>}
        </div>

        <div className={`${field('address')} full`}>
          <label>Address</label>
          <textarea
            rows={3}
            value={values.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Street, city, state"
          />
          {errors.address && <span className="field-error">{errors.address}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
