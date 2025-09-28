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
// export async function createJob(newJob) {
//     const res = await fetch("http://localhost:5000/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newJob),
//     });
//     if (!res.ok) throw new Error("Failed to create job");
//     return res.json();
// }

// const BASE_URL = "http://localhost:5000"; // Update with your API base URL

/**
 * Create a new job
 * @param {Object} newJob - The job object containing:
 *   title, description, salary_min, salary_max, job_type, location, status
 */
const BASE_URL = "http://127.0.0.1:8000/api";
export async function createJob(newJob) {
    try {
        const storedUser = JSON.parse(sessionStorage.getItem("authUser"));
        const token = storedUser?.token;

        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // 👈 حالا درست
            },
            body: JSON.stringify(newJob),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Server error:", data);
            throw new Error(data.message || "Failed to create new job");
        }

        return data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
}
