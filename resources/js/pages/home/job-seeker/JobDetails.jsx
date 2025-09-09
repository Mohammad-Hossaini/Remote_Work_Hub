
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // ✅ Apply icon
import { useParams } from "react-router-dom";
import DialogDemo from "../../../ui/DialogDemo";

import "./JobDetails.css";

function JobDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");

        const jobs = await response.json();
        const foundJob = jobs.find((j) => j.id.toString() === id);

        if (!foundJob) {
          setError("Job not found");
        } else {
          setJob(foundJob);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const jobUrl = `https://company.com/job/${id}`;

  const copyJobUrl = () => {
    navigator.clipboard.writeText(jobUrl);
    alert("Job URL copied!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="jobDetails">
      {/* Header Section */}
      <div className="jobDetailsHeader">
        <div className="jobDetailsHeaderLeft">
          <h1 className="headerTitle">
            {job?.title} <span className="atText">at</span> {job?.companyName}
          </h1>

          <p className="headerDesc">{job?.jobSummary}</p>

          <div className="headerButtons">
            <button className="btn-secondary">VIEW COMPANY</button>

            {/* Button to open modal */}
            <button
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPaperPlane className="btnIcon" />
              APPLY FOR THIS JOB
            </button>

            {/* Render the modal here and pass jobId */}
            <DialogDemo
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              jobId={job?.id} // ✅ Pass the job ID here
            />
          </div>
        </div>
        <div className="jobDetailsHeaderRight"></div>
      </div>

      {/* Content Section */}
      <div className="jobContent">
        {/* About Job */}
        <div className="aboutJob">
          <h2>About this job</h2>
          <div className="aboutJobContent">
            <div className="jobImage">
              <img
                src={job?.companyLogo}
                alt="Company Logo"
                className="jobImg"
              />
            </div>
            <div className="jobInfo">
              <p>
                {job?.title} <span>({job?.type})</span>
              </p>
              <h4>{job?.location}</h4>
              <strong>{job?.salary}</strong>
            </div>
          </div>
          <p>{job?.qualification}</p>
        </div>

        {/* Shared Buttons with Company Logos */}
        <div className="sharedButton">
          <button className="sharedBtn">
            <img
              src="/popular-logos/logo(7).jfif"
              alt="WhatsApp"
              className="btnLogo"
            />
            Share on WhatsApp
          </button>
          <button className="sharedBtn">
            <img
              src="/popular-logos/logo(3).png"
              alt="Facebook"
              className="btnLogo"
            />
            Share on Facebook
          </button>
          <button className="sharedBtn">
            <img
              src="/popular-logos/logo(2).png"
              alt="LinkedIn"
              className="btnLogo"
            />
            Share on LinkedIn
          </button>
          <button className="sharedBtn">
            <img
              src="/popular-logos/logo(4).png"
              alt="Twitter"
              className="btnLogo"
            />
            Share on Twitter
          </button>
        </div>

        {/* Skills Section */}
        <div className="skills">
          <h2>Skills</h2>
          <div className="buttons">
            {job?.skills && job.skills.length > 0 ? (
              job.skills.map((skill, index) => (
                <button key={index} className="skillBtn">
                  {skill}
                </button>
              ))
            ) : (
              <p>No skills listed</p>
            )}
          </div>
        </div>

        {/* Job URL */}
        <div className="others">
          <input type="text" className="jobUrlInput" value={jobUrl} readOnly />
          <button className="copyBtn" onClick={copyJobUrl}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
