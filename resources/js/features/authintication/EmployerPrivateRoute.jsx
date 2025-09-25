import { Navigate } from "react-router-dom";

export default function EmployerPrivateRoute({ children }) {
    const authUser = JSON.parse(sessionStorage.getItem("authUser")); // تغییر اینجا 👈
    if (!authUser || !authUser.token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
