import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineHeart, HiOutlineXCircle } from "react-icons/hi";
import { useAuth } from "../../../hook/AuthContext";
import { getJobs } from "../../../services/apiAllJobs";
import {
    deleteSavedJob,
    getSavedJobsByUser,
} from "../../../services/apiGetSavedJobs";
import "./SavedJobs.css";

function SavedJobs() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // گرفتن saved jobs همان کارمند
    const {
        data: savedJobs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["savedJobs", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const saves = await getSavedJobsByUser(user.id); // فقط saved jobs خود کارمند
            const jobs = await getJobs(); // تمام اطلاعات وظایف
            return saves.map((s) => ({
                ...s,
                ...jobs.find((j) => j.id === s.jobId), // اضافه کردن جزئیات وظیفه
            }));
        },
        enabled: !!user?.id,
    });

    // Mutation برای حذف وظیفه
    const { mutate: removeJob } = useMutation({
        mutationFn: deleteSavedJob,
        onSuccess: (_, savedJobId) => {
            // بروزرسانی لیست local state
            queryClient.setQueryData(["savedJobs", user?.id], (old) =>
                old.filter((job) => job.id !== savedJobId)
            );
            toast.success("Job removed from saved!");
            queryClient.invalidateQueries(["savedJobs", user?.id]); // بازخوانی لیست
        },
        onError: (err) => {
            toast.error(err.message || "Failed to remove job");
        },
    });

    if (isLoading) return <p className="loading">Loading saved jobs...</p>;
    if (isError) return <p className="error">Failed to fetch saved jobs.</p>;

    return (
        <div className="savedJobContainer">
            <div className="favHeader">
                <h2>Saved Jobs</h2>
            </div>

            {savedJobs?.length === 0 ? (
                <p className="no-jobs">No saved jobs yet.</p>
            ) : (
                savedJobs.map((job) => (
                    <div key={job.id} className="savedJobsCard">
                        {/* LEFT SIDE */}
                        <div className="left">
                            <div className="job-img">
                                <img
                                    src={job.companyLogo || "/default-logo.png"}
                                    alt={job.companyName || "Company Logo"}
                                />
                            </div>
                            <div className="job-desc">
                                <h3 className="job-title">{job.title}</h3>
                                <p className="job-company">{job.companyName}</p>
                                <p className="job-meta">
                                    📍 {job.location} • {job.type} •{" "}
                                    {job.experience} exp
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="right">
                            <HiOutlineHeart
                                className="faveIcon"
                                onClick={() => removeJob(job.id)}
                            />
                            <HiOutlineXCircle
                                className="unfaveIcon"
                                onClick={() => removeJob(job.id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default SavedJobs;
