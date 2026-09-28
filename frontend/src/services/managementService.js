import api from "./api";

export async function getDepartments() {
  return (await api.get("/departments")).data;
}
export async function createDepartment(payload) {
  return (
    await api.post("/departments", payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function updateDepartment(id, payload) {
  return (
    await api.put(`/departments/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function deleteDepartment(id) {
  return (await api.delete(`/departments/${id}`)).data;
}

export async function getRoles() {
  return (await api.get("/roles")).data;
}
export async function createRole(payload) {
  return (
    await api.post("/roles", payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function updateRole(id, payload) {
  return (
    await api.put(`/roles/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function deleteRole(id) {
  return (await api.delete(`/roles/${id}`)).data;
}
