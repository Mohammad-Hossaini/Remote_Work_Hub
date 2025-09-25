
import { Navigate } from "react-router-dom";

export default function JobseekerPrivateRoute({ children, role }) {
    const authUser = JSON.parse(sessionStorage.getItem("authUser")); // تغییر اینجا 👈

    if (!authUser) {
        return <Navigate to="/welcome" replace />;
    }

    if (role && authUser.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
