import api from "./axios";

export const getMesas = async () => {
    const response = await api.get("/mesas");
    return response.data;
};

export const getMesa = async (id) => {
    const response = await api.get(`/mesas/${id}`);
    return response.data;
};

export const createMesa = async (data) => {
    const response = await api.post("/mesas", data);
    return response.data;
};

export const updateMesa = async (id, data) => {
    const response = await api.put(`/mesas/${id}`, data);
    return response.data;
};

export const deleteMesa = async (id) => {
    const response = await api.delete(`/mesas/${id}`);
    return response.data;
};