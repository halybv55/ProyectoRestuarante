import api from "./axios";
export const login = (username, password) => {
    return api.post("/auth/login", {
        username,
        password
    });
};

export const profile = (token) => {
    return api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};