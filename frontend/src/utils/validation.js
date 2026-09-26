const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin({ email, password }) {
  const errors = {}
  if (!email || !email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Enter a valid email address'

  if (!password) errors.password = 'Password is required'

  return errors
}

export function validateEmployee(values) {
  const errors = {}

  if (!values.name || !values.name.trim()) errors.name = 'Name is required'

  if (!values.email || !values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Enter a valid email address'

  if (!values.phone || !values.phone.trim()) errors.phone = 'Phone number is required'

  if (!values.department || !values.department.trim()) errors.department = 'Department is required'

  if (!values.role || !values.role.trim()) errors.role = 'Role is required'

  if (!values.joiningDate) errors.joiningDate = 'Joining date is required'

  if (values.salary === '' || values.salary === null || values.salary === undefined) {
    errors.salary = 'Salary is required'
  } else if (isNaN(Number(values.salary)) || Number(values.salary) <= 0) {
    errors.salary = 'Salary must be a valid positive number'
  }

  if (!values.address || !values.address.trim()) errors.address = 'Address is required'

  return errors
}
