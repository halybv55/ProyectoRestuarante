import api from "./axios";

export const getBebidas = async () => {

    const response = await api.get("/bebidas");

    return response.data;

};

export const getBebida = async (id) => {

    const response = await api.get(`/bebidas/${id}`);

    return response.data;

};

export const createBebida = async (data) => {

    const response = await api.post("/bebidas", data);

    return response.data;

};

export const updateBebida = async (id,data) => {

    const response = await api.put(`/bebidas/${id}`,data);

    return response.data;

};

export const deleteBebida = async (id) => {

    const response = await api.delete(`/bebidas/${id}`);

    return response.data;

};