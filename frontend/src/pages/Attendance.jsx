import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import {
  getAttendance,
  saveAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    employeeId: "",
    attendanceDate: new Date().toISOString().slice(0, 10),
    status: "PRESENT",
    checkIn: "",
    checkOut: "",
  });

  async function load() {
    try {
      setEmployees(await getEmployees());
      setRecords(await getAttendance());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load attendance");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm((value) => ({
      ...value,
      employeeId: "",
      checkIn: "",
      checkOut: "",
    }));
  }

  function editRecord(record) {
    setEditingId(record.id);
    setForm({
      employeeId: String(record.employeeId),
      attendanceDate: record.attendanceDate,
      status: record.status,
      checkIn: record.checkIn || "",
      checkOut: record.checkOut || "",
    });
  }

  async function submit(event) {
    event.preventDefault();
    try {
      setError("");
      const payload = {
        ...form,
        employeeId: Number(form.employeeId),
        checkIn: form.checkIn || null,
        checkOut: form.checkOut || null,
      };
      if (editingId) await updateAttendance(editingId, payload);
      else await saveAttendance(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save attendance");
    }
  }

  async function removeRecord(id) {
    try {
      setError("");
      await deleteAttendance(id);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete attendance");
    }
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark and review employee attendance</p>
        </div>
      </div>
      <ErrorMessage message={error} />
      <form className="surface form-grid attendance-form" onSubmit={submit}>
        <table>
          <tr>
            <td>
              <label>Employee:</label>
            </td>
            <td>
              <select
                value={form.employeeId}
                onChange={(event) =>
                  setForm({ ...form, employeeId: event.target.value })
                }
                required
              >
                <option value="">Select employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Date:</label>
            </td>

            <td>
              <input
                type="date"
                value={form.attendanceDate}
                onChange={(event) =>
                  setForm({ ...form, attendanceDate: event.target.value })
                }
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Status:</label>
            </td>
            <td>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Check In:</label>
            </td>
            <td>
              <input
                type="time"
                value={form.checkIn}
                onChange={(event) =>
                  setForm({ ...form, checkIn: event.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Check Out:</label>
            </td>
            <td>
              <input
                type="time"
                value={form.checkOut}
                onChange={(event) =>
                  setForm({ ...form, checkOut: event.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="form-actions">
                <button className="btn btn-primary">
                  {editingId ? "Update Attendance" : "Save Attendance"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </td>
          </tr>
        </table>
      </form>
      <div className="data-table-wrap attendance-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.attendanceDate}</td>
                <td>{record.employeeName}</td>
                <td>
                  <span
                    className={`attendance-status ${record.status.toLowerCase()}`}
                  >
                    {record.status}
                  </span>
                </td>
                <td>{record.checkIn || "-"}</td>
                <td>{record.checkOut || "-"}</td>
                <td>
                  <button
                    className="icon-btn"
                    onClick={() => editRecord(record)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="icon-btn danger"
                    onClick={() => removeRecord(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
