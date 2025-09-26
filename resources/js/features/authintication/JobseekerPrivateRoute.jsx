export default function JobseekerPrivateRoute({ children }) {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));

    if (!authUser || !authUser.token) {
        return <Navigate to="/welcome" replace />;
    }

    if (authUser.role !== "job_seeker") {
        return <Navigate to="/login" replace />;
    }

    return children;
}
