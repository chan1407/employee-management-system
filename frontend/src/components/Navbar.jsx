import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="navbar">
      <div className="navbar-title">{title}</div>
      <div className="navbar-admin">
        <span className="navbar-admin-email">{admin?.email}</span>
        <button className="btn btn-outline1 btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
