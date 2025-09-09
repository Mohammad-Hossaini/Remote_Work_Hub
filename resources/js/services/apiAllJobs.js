// Fetch all jobs
export async function getJobs() {
  const res = await fetch("http://localhost:5000/jobs");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

// Add a new job
export async function createJob(newJob) {
  const res = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}
