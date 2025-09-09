export async function storeApplicants(data, jobId) {
  const applicantData = {
    ...data,
    jobId, // add jobId here
    id: Math.random().toString(16).slice(2), // optional unique id
  };

  const res = await fetch("http://localhost:5000/appliedJobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicantData),
  });

  if (!res.ok) throw new Error("Failed to store applicant");
  return res.json();
}
