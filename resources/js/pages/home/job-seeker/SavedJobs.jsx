import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiOutlineHeart, HiOutlineXCircle } from "react-icons/hi";
import { deleteSavedJob, getSavedJobs } from "../../../services/apiGetSavedJobs";
import "./SavedJobs.css";

function SavedJobs() {
  const queryClient = useQueryClient();

  const {
    data: savedJobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: getSavedJobs,
  });

  // Mutation for deleting job
  const { mutate: removeJob } = useMutation({
    mutationFn: deleteSavedJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]); // refresh list
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
                <img src={job.companyLogo} alt={job.companyName} />
              </div>
              <div className="job-desc">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.companyName}</p>
                <p className="job-meta">
                  📍 {job.location} • {job.type} • {job.experience} exp
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
