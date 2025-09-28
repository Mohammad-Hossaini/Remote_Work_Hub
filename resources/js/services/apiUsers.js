// apiUsers.js
const BASE_URL = "http://127.0.0.1:8000/api"; // Laravel API base URL
export async function createNewUser(userData) {
    try {
        // =========================
        // مرحله 1: ثبت کاربر
        // =========================
        const basicData = {
            name: `${userData.firstName} ${userData.lastName}`,
            password: userData.password,
            email: userData.email,
            role: userData.role,
        };

        const resUser = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(basicData),
        });

        const createdUser = await resUser.json();

        if (!resUser.ok) {
            console.error("User Registration Error:", createdUser);
            throw new Error(createdUser.message || "Failed to register user!");
        }

        // فرض: لاراول بعد از ثبت کاربر توکن برمی‌گرداند
        const token = createdUser.token;
        if (!token) {
            throw new Error("Token not received from registration API!");
        }

        // =========================
        // مرحله 2: ثبت پروفایل برای job_seeker
        // =========================
        if (userData.role === "job_seeker") {
            const profileData = new FormData();
            profileData.append("user_id", createdUser.user.id);
            profileData.append("first_name", userData.firstName);
            profileData.append("last_name", userData.lastName);
            profileData.append("phone", userData.phone);
            profileData.append("skills", userData.skills || "");
            profileData.append("description", userData.description || "");

            // اگر فایل رزومه آپلود شده است
            if (userData.resume && userData.resume[0]) {
                profileData.append("resume", userData.resume[0]);
            }

            const resProfile = await fetch(`${BASE_URL}/profiles`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // ارسال توکن
                },
                body: profileData,
            });

            const profileResult = await resProfile.json();
            if (!resProfile.ok) {
                console.error("Profile Creation Error:", profileResult);
                throw new Error(
                    profileResult.message || "Failed to save profile data!"
                );
            }
        }

        return createdUser; // در صورت موفقیت
    } catch (error) {
        console.error("Error in createNewUser:", error);
        throw error;
    }
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
