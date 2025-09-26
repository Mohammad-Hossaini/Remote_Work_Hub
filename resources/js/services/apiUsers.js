// const BASE_URL = "http://localhost:5000/users";

// // Create new user
// export async function createNewUser(userData) {
//     const res = await fetch(BASE_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//     });

//     if (!res.ok) {
//         throw new Error("Failed to create user");
//     }

//     return res.json();
// }

// // Get user by ID
// export async function getUserById(id) {
//     const res = await fetch(`${BASE_URL}/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch user");
//     return res.json();
// }
// export async function updateUser(userId, updatedData) {
//     const res = await fetch(`${BASE_URL}/${userId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//         console.error("Server error:", data);
//         throw new Error("Failed to update user");
//     }

//     return data;
// }

// apiUsers.js
const BASE_URL = "http://127.0.0.1:8000/api"; // Laravel API base URL

// Register new user
export async function createNewUser(userData) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Laravel expects this
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Server error:", data);
        throw new Error(data.message || "Failed to create user");
    }

    return data; // { user: {...}, token: "..." }
}

// Get user by ID (optional, if you defined this route in Laravel)
export async function getUserById(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
}

// Update user (optional, depends on your Laravel routes)
export async function updateUser(userId, updatedData) {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT", // or PATCH if your backend accepts it
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Server error:", data);
        throw new Error(data.message || "Failed to update user");
    }

    return data;
}
