// apiLogin.js
const BASE_URL = "http://localhost:5000/users";

export async function loginUser({ name, email, password }) {
    // Fetch all users
    const res = await fetch(BASE_URL);
    const users = await res.json();
    const user = users.find(
        (u) =>
            u.firstName === name && u.email === email && u.password === password
    );

    if (!user) return null;

    // Optional: generate token
    const token = btoa(`${user.email}:${user.password}`);
    return { ...user, token };
}

export function logout() {
    localStorage.removeItem("authUser");
    window.location.href = "/";
}
