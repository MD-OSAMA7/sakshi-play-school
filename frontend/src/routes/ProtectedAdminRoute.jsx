import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;