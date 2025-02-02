import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  isLoggedInLoading,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isLoggedInLoading) return null;

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;