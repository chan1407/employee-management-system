import { useEffect, useState } from "react";
import { validateEmployee } from "../utils/validation";
import { DEPARTMENTS } from "./DepartmentFilter.jsx";
import { getDepartments, getRoles } from "../services/managementService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  role: "",
  joiningDate: "",
  salary: "",
  address: "",
};

export default function EmployeeForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Employee",
  isSubmitting,
}) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues });
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => {});
    getRoles()
      .then(setRoles)
      .catch(() => {});
  }, []);

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateEmployee(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const selectedDepartment = departments.find(
        (department) => department.name === values.department,
      );
      const selectedRole = roles.find((role) => role.name === values.role);
      onSubmit({
        ...values,
        salary: Number(values.salary),
        departmentId: selectedDepartment?.id,
        roleId: selectedRole?.id,
      });
    }
  }

  function field(name) {
    return errors[name] ? "form-field has-error" : "form-field";
  }

  return (
    <form
      className="surface"
      style={{ padding: "26px" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-grid">
        <div className={field("name")}>
          <label>Employee Name</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Priya Sharma"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className={field("email")}>
          <label>Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="name@company.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className={field("phone")}>
          <label>Phone Number</label>
          <input
            type="text"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className={field("department")}>
          <label>Department</label>
          <select
            value={values.department}
            onChange={(e) => handleChange("department", e.target.value)}
          >
            <option value="">Select department</option>
            {(departments.length ? departments : DEPARTMENTS).map((dept) => {
              const name = typeof dept === "string" ? dept : dept.name;
              return (
                <option key={name} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          {errors.department && (
            <span className="field-error">{errors.department}</span>
          )}
        </div>

        <div className={field("role")}>
          <label>Role</label>
          <select
            value={values.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="">Select role</option>
            {values.role &&
              !roles.some((role) => role.name === values.role) && (
                <option value={values.role}>{values.role}</option>
              )}
            {roles.map((role) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>

        <div className={field("joiningDate")}>
          <label>Joining Date</label>
          <input
            type="date"
            value={values.joiningDate}
            onChange={(e) => handleChange("joiningDate", e.target.value)}
          />
          {errors.joiningDate && (
            <span className="field-error">{errors.joiningDate}</span>
          )}
        </div>

        <div className={field("salary")}>
          <label>Salary</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            placeholder="e.g. 55000"
          />
          {errors.salary && (
            <span className="field-error">{errors.salary}</span>
          )}
        </div>

        <div className={`${field("address")} full`}>
          <label>Address</label>
          <textarea
            rows={3}
            value={values.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Street, city, state"
          />
          {errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
