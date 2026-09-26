const DEPARTMENTS = ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations']

export default function DepartmentFilter({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Departments</option>
      {DEPARTMENTS.map((dept) => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </select>
  )
}

export { DEPARTMENTS }
