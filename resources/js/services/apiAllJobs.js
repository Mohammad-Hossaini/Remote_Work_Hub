const BASE_URL = "http://127.0.0.1:8000/api";

export async function getJobs() {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    const data = await res.json();
    if (!res.ok) {
        console.log("Server Error:", data);
        throw new Error(data.message || "Failed to fetch jobs");
    }
    return data;
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
