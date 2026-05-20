import { Navigate, useLocation } from 'react-router-dom'
import { getStoredPassword } from '../../lib/adminAuth.js'

export default function RequireAuth({ children }) {
  const location = useLocation()
  const pw = getStoredPassword()
  if (!pw) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }
  return children
}
