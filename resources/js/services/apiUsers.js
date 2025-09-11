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


