import { useEffect, useState } from "react";
import {
  createDepartment,
  createRole,
  deleteDepartment,
  deleteRole,
  getDepartments,
  getRoles,
  updateDepartment,
  updateRole,
} from "../services/managementService";
import ErrorMessage from "../components/ErrorMessage.jsx";

function ResourceList({ title, items, onSave, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function start(item) {
    setEditing(item?.id || "new");
    setName(item?.name || "");
    setDescription(item?.description || "");
  }
  async function submit(event) {
    event.preventDefault();
    await onSave(editing === "new" ? null : editing, { name, description });
    setEditing(null);
    setName("");
    setDescription("");
  }

  return (
    <div className="surface management-panel">
      <div className="page-header management-panel-header">
        <h2>{title}</h2>
        <button className="btn btn-accent" onClick={() => start()}>
          Add
        </button>
      </div>
      {editing && (
        <form onSubmit={submit} className="form-grid management-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${title} name`}
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <div className="form-actions">
            <button className="btn btn-primary">Save</button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="data-table-wrap management-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description || "-"}</td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" onClick={() => start(item)}>
                      Edit
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Management() {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  async function load() {
    try {
      setDepartments(await getDepartments());
      setRoles(await getRoles());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load management data");
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function change(action, args) {
    try {
      setError("");
      await action(...args);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  }
  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Departments & Roles</h1>
          <p>Manage the options assigned to employees</p>
        </div>
      </div>
      <ErrorMessage message={error} />
      <div className="management-grid">
        <ResourceList
          title="Departments"
          items={departments}
          onSave={(id, payload) =>
            change(
              id ? updateDepartment : createDepartment,
              id ? [id, payload] : [payload],
            )
          }
          onDelete={(id) => change(deleteDepartment, [id])}
        />
        <ResourceList
          title="Roles"
          items={roles}
          onSave={(id, payload) =>
            change(id ? updateRole : createRole, id ? [id, payload] : [payload])
          }
          onDelete={(id) => change(deleteRole, [id])}
        />
      </div>
    </div>
  );
}
