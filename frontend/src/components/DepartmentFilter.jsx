const DEPARTMENTS = ["HR", "IT", "Finance", "Marketing", "Sales", "Operations"];

export default function DepartmentFilter({
  value,
  onChange,
  departments = [],
}) {
  const options = departments.length
    ? departments.map((department) => department.name)
    : DEPARTMENTS;
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Departments</option>
      {options.map((dept) => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </select>
  );
}

export { DEPARTMENTS };
