const BASE_URL = "http://localhost:5000/users";

export async function loginUser({ name, email, password }) {
    const res = await fetch(`${BASE_URL}?name=${name}&email=${email}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();
    const user = users.find((u) => u.password === password);
    return user || null;
}
