const BASE_URL = "http://localhost:5000/users";

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

// Fetch user by ID
export async function getUserById(userId) {
    const res = await fetch(`${BASE_URL}/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

// Update user (PATCH only changed fields)
export async function updateUser(userId, updatedData) {
    const res = await fetch(`${BASE_URL}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
}
