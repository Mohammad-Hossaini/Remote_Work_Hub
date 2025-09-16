const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function storeApplicant(application) {
    const userId = encodeURIComponent(application.userId);
    const jobId = encodeURIComponent(application.jobId);

    const checkRes = await fetch(
        `${BASE_URL}/appliedJobs?userId=${userId}&jobId=${jobId}`
    );
    if (!checkRes.ok)
        throw new Error("Failed to validate existing application");
    const existing = await checkRes.json();
    if (existing.length > 0) {
        throw new Error("You have already applied to this job.");
    }

    const res = await fetch(`${BASE_URL}/appliedJobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit application");
    }

    return await res.json();
}

export async function getAppliedJobsByUser(userId) {
    const res = await fetch(`${BASE_URL}/appliedJobs`);
    if (!res.ok) throw new Error("Failed to fetch applied jobs");
    const appliedJobs = await res.json();

    const jobsRes = await fetch(`${BASE_URL}/jobs`);
    if (!jobsRes.ok) throw new Error("Failed to fetch jobs");
    const jobs = await jobsRes.json();

    return appliedJobs
        .filter((app) => String(app.userId) === String(userId))
        .map((app) => ({
            ...app,
            job: jobs.find((j) => String(j.id) === String(app.jobId)) || null,
            form: app.form || {
                firstName: app.firstName || "",
                lastName: app.lastName || "",
                email: app.email || "",
                mobile: app.mobile || "",
                countryCode: app.countryCode || "",
            },
        }));
}

// ✅ اضافه کردن تابع حذف
export async function deleteAppliedJob(applicationId) {
    const res = await fetch(`${BASE_URL}/appliedJobs/${applicationId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete application");
    }

    return true; // می‌تونی true یا پیام موفقیت برگردونی
}
