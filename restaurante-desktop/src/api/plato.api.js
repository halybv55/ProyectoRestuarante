import api from "./axios";

export const getPlatos = async () => {
    const response = await api.get("/menu/platos");
    return response.data;
};

export const getPlato = async (id) => {
    const response = await api.get(`/menu/platos/${id}`);
    return response.data;
};

export const createPlato = async (data) => {
    const response = await api.post("/menu/platos", data);
    return response.data;
};

export const updatePlato = async (id, data) => {
    const response = await api.put(`/menu/platos/${id}`, data);
    return response.data;
};

export const deletePlato = async (id) => {
    const response = await api.delete(`/menu/platos/${id}`);
    return response.data;
};