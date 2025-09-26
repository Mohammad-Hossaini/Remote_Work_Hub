const BASE_URL = "http://127.0.0.1:8000/api";
export async function loginUser({ email, password }) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.token) {
        // ← check token instead of data.ok
        throw new Error(data.message || "Invalid credentials");
    }

    return {
        id: data.user.id,
        role: data.user.role,
        token: data.token, 
    };
}
