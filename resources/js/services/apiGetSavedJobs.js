
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// گرفتن saved jobs یک کارمند
export async function getSavedJobsByUser(userId) {
    const res = await fetch(`${BASE_URL}/savedJobs`);
    if (!res.ok) throw new Error("Failed to fetch saved jobs");
    const all = await res.json();
    return all.filter((s) => String(s.userId) === String(userId));
}

// ذخیره وظیفه
export async function putSavedJobs(job) {
    const userId = job.userId;
    const jobId = job.id;

    // چک می‌کنیم اگر قبلا ذخیره شده باشد
    const checkRes = await fetch(
        `${BASE_URL}/savedJobs?userId=${userId}&jobId=${jobId}`
    );
    const existing = await checkRes.json();
    if (existing.length > 0) throw new Error("Job already saved");

    const res = await fetch(`${BASE_URL}/savedJobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            jobId,
            savedAt: new Date().toISOString(),
        }),
    });

    if (!res.ok) throw new Error("Failed to save job");
    return await res.json();
}

// حذف وظیفه
export async function deleteSavedJob(savedJobId) {
    const res = await fetch(`${BASE_URL}/savedJobs/${savedJobId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete saved job");
    return await res.json();
}
