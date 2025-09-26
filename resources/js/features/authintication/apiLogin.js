import { v4 as uuidv4 } from "uuid";
const BASE_URL = "http://localhost:5000/users";

export async function loginUser({ email, password }) {
    const res = await fetch(BASE_URL);
    const users = await res.json();

    const user = users.find(
        (u) => u.email === email && u.password === password
    );
    if (!user) return null;
    const fakeToken = uuidv4();

    return {
        id: user.id,
        role: user.role,
        token: fakeToken,
    };
}
