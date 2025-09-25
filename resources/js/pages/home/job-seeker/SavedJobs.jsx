import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineXCircle } from "react-icons/hi";
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

    const {
        data: savedJobs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["savedJobs", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const saves = await getSavedJobsByUser(user.id);
            const jobs = await getJobs();
            return saves.map((s) => ({
                savedJobId: s.id, 
                ...s,
                ...jobs.find((j) => j.id === s.jobId),
            }));
        },
        enabled: !!user?.id,
    });

    const { mutate: removeJob } = useMutation(deleteSavedJob, {
        onSuccess: (_, savedJobId) => {
            queryClient.setQueryData(["savedJobs", user?.id], (old) =>
                old.filter((job) => job.savedJobId !== savedJobId)
            );
            toast.success("Job removed from saved!");
            queryClient.invalidateQueries(["savedJobs", user?.id]);
        },
        onError: (err) => toast.error(err.message || "Failed to remove job"),
    });

    if (isLoading) return <p className="loading">Loading saved jobs...</p>;
    if (isError) return <p className="error">Failed to fetch saved jobs.</p>;

    return (
        <div className="savedJobContainer">
            <div className="favHeader">
                <h2>Saved Jobs</h2>
            </div>

            {savedJobs.length === 0 ? (
                <p className="no-jobs">No saved jobs yet.</p>
            ) : (
                savedJobs.map((job) => (
                    <div key={job.savedJobId} className="savedJobsCard">
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

                        <div className="right">
                            <HiOutlineXCircle
                                className="unfaveIcon"
                                onClick={() => removeJob(job.savedJobId)} 
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default SavedJobs;
