export default function EmployerPrivateRoute({ children }) {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    if (!authUser || !authUser.token || authUser.role !== "employer") {
        return <Navigate to="/login" replace />;
    }
    return children;
}
