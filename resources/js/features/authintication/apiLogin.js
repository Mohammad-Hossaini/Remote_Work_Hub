const BASE_URL = "http://localhost:5000/users";

export async function loginUser({ name, email, password }) {
    // JSON Server query
    const res = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length === 0) return null;

    const user = users[0];
    const token = btoa(`${user.email}:${user.password}`);

    return { ...user, token };
}

export function logout() {
    localStorage.removeItem("authUser");
    window.location.href = "/";
}
