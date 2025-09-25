const BASE_URL = "http://localhost:5000/users";

// Create new user
export async function createNewUser(userData) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        throw new Error("Failed to create user");
    }

    return res.json();
}

// Get user by ID
export async function getUserById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}
export async function updateUser(userId, updatedData) {
    const res = await fetch(`${BASE_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Server error:", data);
        throw new Error("Failed to update user");
    }

    return data;
}
