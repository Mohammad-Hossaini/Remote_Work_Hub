// Fetch applied jobs with job info
export async function getAppliedJobs() {
  try {
    const appliedRes = await fetch("http://localhost:5000/appliedJobs");
    if (!appliedRes.ok) throw new Error("Failed to fetch applied jobs");
    const appliedData = await appliedRes.json();

    const jobsRes = await fetch("http://localhost:5000/jobs");
    if (!jobsRes.ok) throw new Error("Failed to fetch jobs");
    const jobsData = await jobsRes.json();

    return appliedData.map((app) => {
      const job = jobsData.find((j) => j.id === app.jobId);
      return { ...app, job };
    });
  } catch (err) {
    throw err;
  }
}

// Delete applied job
export async function deleteAppliedJob(id) {
  const res = await fetch(`http://localhost:5000/appliedJobs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete applied job");
  return res.json();
}
