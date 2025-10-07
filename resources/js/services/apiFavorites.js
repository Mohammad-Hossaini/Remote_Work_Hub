// resources/js/services/apiFavorites.js
const API_BASE = "http://127.0.0.1:8000/api";

export async function toggleFavoriteJob(jobId, token) {
    const response = await fetch(`${API_BASE}/jobs/${jobId}/favorite`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to save job");
    }

    return response.json();
}

// const API_BASE = "http://127.0.0.1:8000/api";

export async function getMyFavorites(token) {
    const res = await fetch(`${API_BASE}/my-favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch favorites");
    return res.json();
}

export async function removeFavoriteJob(jobId, token) {
    const res = await fetch(`${API_BASE}/jobs/${jobId}/favorite`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to remove favorite");
    return res.json();
}
