import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardSummary } from "../services/employeeService";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await getDashboardSummary();
        if (isMounted) setSummary(data);
      } catch (err) {
        if (isMounted)
          setError(
            err.response?.data?.message || "Failed to load dashboard data",
          );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <Loading label="Loading dashboard..." />;

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>An overview of your workforce</p>
        </div>
        <button
          className="btn btn-accent"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </button>
      </div>

      <ErrorMessage message={error} />

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Employees</div>
          <div className="kpi-value">{summary?.totalEmployees ?? 0}</div>
        </div>
        <div className="kpi-card ">
          <div className="kpi-label">Total Departments</div>
          <div className="kpi-value">{summary?.totalDepartments ?? 0}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Recently Added</div>
          <div className="kpi-value">
            {summary?.recentEmployees?.length ?? 0}
          </div>
        </div>
      </div>

      <h2 className="section-title">Recent Employees</h2>
      <div className="data-table-wrap">
        {summary?.recentEmployees?.length ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/employees/${employee.id}`)}
                >
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.joiningDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No employees added yet.</div>
        )}
      </div>
    </div>
  );
}
