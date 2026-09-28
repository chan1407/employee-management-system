import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import EmployeeTable from "../components/EmployeeTable.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DepartmentFilter from "../components/DepartmentFilter.jsx";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";
import Pagination from "../components/Pagination.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { getDepartments } from "../services/managementService";

const PAGE_SIZE = 6;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  async function loadEmployees() {
    setIsLoading(true);
    setError("");
    try {
      const data = await getEmployees(search, department);
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employees");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      loadEmployees();
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department]);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  const totalPages = Math.max(1, Math.ceil(employees.length / PAGE_SIZE));
  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return employees.slice(start, start + PAGE_SIZE);
  }, [employees, page]);

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteEmployee(pendingDelete.id);
      setPendingDelete(null);
      setSuccessMessage("Employee deleted successfully");
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage all employee records</p>
        </div>
        <button
          className="btn btn-accent"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </button>
      </div>

      {successMessage && <div className="toast success">{successMessage}</div>}

      <ErrorMessage message={error} />

      <div className="table-toolbar">
        <div className="table-filters">
          <SearchBar value={search} onChange={setSearch} />
          <DepartmentFilter
            value={department}
            onChange={setDepartment}
            departments={departments}
          />
        </div>
      </div>

      {isLoading ? (
        <Loading label="Loading employees..." />
      ) : (
        <>
          <EmployeeTable
            employees={paginatedEmployees}
            onDeleteRequest={setPendingDelete}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {pendingDelete && (
        <DeleteConfirmation
          employeeName={pendingDelete.name}
          isDeleting={isDeleting}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
