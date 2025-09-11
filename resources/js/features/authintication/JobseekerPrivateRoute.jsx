import { Navigate } from "react-router-dom";

export default function JobseekerPrivateRoute({ children, role }) {
    const authUser = JSON.parse(localStorage.getItem("authUser")); // get logged-in user

    if (!authUser) {
        // Not logged in
        return <Navigate to="/welcome" replace />;
    }

    if (role && authUser.role !== role) {
        // Wrong role
        return <Navigate to="/welcome" replace />;
    }

    return children; // user allowed
}
