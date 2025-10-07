import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineXCircle } from "react-icons/hi";
import { useAuth } from "../../../hook/AuthContext";
import {
    getMyFavorites,
    removeFavoriteJob,
} from "../../../services/apiFavorites";
import "./SavedJobs.css";

function SavedJobs() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // دریافت وظایف ذخیره شده با API جدید
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

    // حذف وظیفه ذخیره شده
    // const { mutate: removeJob } = useMutation({
    //     mutationFn: (favoriteId) => removeFavoriteJob(favoriteId, user.token),
    //     onSuccess: (_, favoriteId) => {
    //         queryClient.setQueryData(["myFavorites", user?.id], (old) =>
    //             old.filter((fav) => fav.id !== favoriteId)
    //         );
    //         toast.success("Job removed from favorites!");
    //         queryClient.invalidateQueries(["myFavorites", user?.id]);
    //     },
    //     onError: (err) => toast.error(err.message || "Failed to remove job"),
    // });
    const { mutate: removeJob } = useMutation({
    mutationFn: (favoriteId) => removeFavoriteJob(favoriteId, user.token),
    onSuccess: (_, favoriteId) => {
        // ✅ فقط داده‌ی محلی را آپدیت می‌کنیم
        queryClient.setQueryData(["myFavorites", user?.id], (old) =>
            old.filter((fav) => fav.id !== favoriteId)
        );
        toast.success("Job removed from favorites!");
        // ❌ نیازی به invalidateQueries نیست، چون داده محلی آپدیت شد
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
                                        📍 {job.location} • {job.job_type} •{" "}
                                        {job.experience || 0} exp
                                    </p>
                                </div>
                            </div>

                            <div className="right">
                                <HiOutlineXCircle
                                    className="unfaveIcon"
                                    onClick={() => removeJob(fav.id)} // حذف با favorite id
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
