import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, type }) {
  const isLoggedIn =
    type === "admin"
      ? localStorage.getItem("adminLoggedIn") === "true"
      : localStorage.getItem("studentLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to={
          type === "admin"
            ? "/admin-login"
            : "/student-login"
        }
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;