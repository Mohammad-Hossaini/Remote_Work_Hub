import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineXCircle } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { useAuth } from "../../../hook/AuthContext";
import {
    getMyFavorites,
    removeFavoriteJob,
} from "../../../services/apiFavorites";
import "./SavedJobs.css";

function SavedJobs() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: savedJobs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["myFavorites", user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            return await getMyFavorites(user.token);
        },
        enabled: !!user?.id,
    });

    const { mutate: removeJob } = useMutation({
        mutationFn: (jobId) => removeFavoriteJob(jobId, user.token),
        onSuccess: (jobId) => {
            queryClient.setQueryData(["myFavorites", user?.id], (old = []) =>
                old.filter((fav) => fav.job.id !== jobId)
            );

            toast.success("Job removed from favorites!");
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
                savedJobs.map((fav) => {
                    const job = fav.job;
                    return (
                        <div key={fav.id} className="savedJobsCard">
                            <div className="left">
                                <div className="job-img">
                                    <img
                                        src={
                                            job.company?.logo ||
                                            "/company-images/image(6).jfif"
                                        }
                                        alt={
                                            job.company?.name || "Company Logo"
                                        }
                                    />
                                </div>

                                <div className="job-desc">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="job-company">
                                        {job.company?.name}
                                    </p>
                                    <p className="job-meta">
                                        <IoLocationSharp /> {job.location} •{" "}
                                        {job.job_type} • {job.experience || 0}{" "}
                                        exp
                                    </p>
                                </div>
                            </div>

                            <div className="right">
                                <HiOutlineXCircle
                                    className="unfaveIcon"
                                    onClick={() => removeJob(job.id)} 
                                />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SavedJobs;
