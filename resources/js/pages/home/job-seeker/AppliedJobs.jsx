// pages/AppliedJobs.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast"; // ✅ import toast
import { HiOutlineTrash, HiOutlineUser } from "react-icons/hi";
import { useAuth } from "../../../hook/AuthContext";
import {
    deleteAppliedJob,
    getAppliedJobsByUser,
} from "../../../services/apiStoreApplicants";
import "./AppliedJobs.css";

export default function AppliedJobs() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: appliedJobs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["appliedJobs", user?.id],
        queryFn: () => getAppliedJobsByUser(user.id),
        enabled: !!user?.id,
        staleTime: 0,
    });

    const { mutate: removeJob } = useMutation(deleteAppliedJob, {
        onSuccess: () => {
            queryClient.invalidateQueries(["appliedJobs", user?.id]);
            toast.success("Application deleted successfully!"); // ✅ show toast
        },
        onError: (err) => {
            toast.error(err.message || "Failed to delete application"); // ✅ error toast
        },
    });

    if (isLoading) return <p className="loading">Loading applied jobs...</p>;
    if (isError) return <p className="error">Failed to fetch applied jobs.</p>;

    return (
        <div className="appliedJobContainer">
            <Toaster position="top-right" reverseOrder={false} />{" "}
            {/* ✅ Toaster container */}
            <div className="favHeader">
                <h2>Applied Jobs</h2>
            </div>
            {appliedJobs.length === 0 ? (
                <p className="no-jobs">No applications yet.</p>
            ) : (
                appliedJobs.map((app) => (
                    <div key={app.id} className="appliedJobsCard">
                        <div className="left">
                            <div className="job-img">
                                <img
                                    src={
                                        app.job?.companyLogo ||
                                        "/default-logo.png"
                                    }
                                    alt={app.job?.companyName || "Company Logo"}
                                />
                            </div>
                            <div className="job-desc">
                                <h3 className="job-title">
                                    {app.job?.title || "Unknown Job"}
                                </h3>
                                <p className="job-company">
                                    {app.job?.companyName || "Unknown Company"}
                                </p>
                                <p className="job-meta">
                                    Applicant: {app.form?.firstName}{" "}
                                    {app.form?.lastName} <br />
                                    📧 {app.form?.email} • 📞{" "}
                                    {app.form?.countryCode} {app.form?.mobile}
                                </p>
                                <p className="job-status">
                                    Status: {app.status} <br />
                                    Applied at:{" "}
                                    {new Date(app.appliedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="right">
                            <HiOutlineUser className="userIcon" />
                            <HiOutlineTrash
                                className="deleteIcon"
                                onClick={() => removeJob(app.id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
