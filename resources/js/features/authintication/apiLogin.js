// apiLogin.js
const BASE_URL = "http://localhost:5000/users";

// Login function
export async function loginUser({ name, email, password }) {
    const res = await fetch(BASE_URL);
    const users = await res.json();

    const user = users.find(
        (u) =>
            u.firstName === name && u.email === email && u.password === password
    );

    if (!user) return null;
    const token = btoa(`${user.email}:${user.password}`);
    return {
        id: user.id,
        role: user.role,
        token,
    };
}
export function logout() {
    localStorage.removeItem("authUser");
    window.location.href = "/";
}
