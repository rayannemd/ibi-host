import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
    console.log("Token encontrado: ", token);
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
