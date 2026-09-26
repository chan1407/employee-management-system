import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { admin } = useAuth()

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Your admin account details</p>
        </div>
      </div>

      <div className="surface detail-grid">
        <div className="detail-field">
          <div className="detail-label">Email</div>
          <div className="detail-value">{admin?.email}</div>
        </div>
        <div className="detail-field">
          <div className="detail-label">Role</div>
          <div className="detail-value">{admin?.role}</div>
        </div>
      </div>
    </div>
  )
}
