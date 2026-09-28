import api from "./api";

export async function getAttendance() {
  return (await api.get("/attendance")).data;
}
export async function getEmployeeAttendance(employeeId) {
  return (await api.get(`/attendance/employee/${employeeId}`)).data;
}
export async function saveAttendance(payload) {
  return (
    await api.post("/attendance", payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function updateAttendance(id, payload) {
  return (
    await api.put(`/attendance/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    })
  ).data;
}
export async function deleteAttendance(id) {
  return (await api.delete(`/attendance/${id}`)).data;
}
