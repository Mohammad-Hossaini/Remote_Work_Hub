import { Navigate } from "react-router-dom";

export default function EmployerPrivateRoute({ children }) {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (!authUser || !authUser.token) {
        return <Navigate to="/welcome" replace />;
    }
    return children;
}
