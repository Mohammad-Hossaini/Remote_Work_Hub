import { createContext, useContext, useEffect, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Provide context
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user from localStorage on page refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function
    const login = (userData) => {
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("authUser");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Hook to use context
export function useAuth() {
    return useContext(AuthContext);
}
