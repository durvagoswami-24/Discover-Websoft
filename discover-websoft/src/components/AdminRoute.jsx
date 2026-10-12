import { Navigate } from "react-router-dom";
import { getAdminToken } from "../api/admin";

// Guards admin-only pages. Doesn't verify the token is still valid with
// the server (that happens on the first API call, via the 401 handler
// in api/admin.js) -- it just checks one exists before rendering.
export default function AdminRoute({ children }) {
  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
