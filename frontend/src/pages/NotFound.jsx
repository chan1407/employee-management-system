import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-body">
      <div className="surface" style={{ padding: '48px', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0 }}>404</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
          The page you are looking for doesn't exist.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
