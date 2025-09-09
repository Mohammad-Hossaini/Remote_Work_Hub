import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiOutlineTrash, HiOutlineUser } from "react-icons/hi";
import {
  deleteAppliedJob,
  getAppliedJobs,
} from "../../../services/apiGetAppliedJobs";
import "./AppliedJobs.css";

function AppliedJobs() {
  const queryClient = useQueryClient();

  // ✅ v4 syntax for useQuery
  const {
    data: appliedJobs = [],
    isLoading,
    isError,
  } = useQuery(["appliedJobs"], getAppliedJobs);

  // ✅ v4 syntax for useMutation + invalidate
  const { mutate: removeJob } = useMutation(deleteAppliedJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedJobs"]); // ✅ v4 style
    },
  });

  if (isLoading) return <p className="loading">Loading applied jobs...</p>;
  if (isError) return <p className="error">Failed to fetch applied jobs.</p>;

  return (
    <div className="appliedJobContainer">
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
                  src={app.job?.companyLogo || "/default-logo.png"}
                  alt={app.job?.companyName || "Company Logo"}
                />
              </div>
              <div className="job-desc">
                <h3 className="job-title">
                  {app.job ? app.job.title : "Unknown Job"}
                </h3>
                <p className="job-company">
                  {app.job ? app.job.companyName : "Unknown Company"}
                </p>
                <p className="job-meta">
                  Applicant: {app.firstName} {app.lastName} <br />
                  📧 {app.email} • 📞 {app.countryCode} {app.mobile}
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

export default AppliedJobs;
