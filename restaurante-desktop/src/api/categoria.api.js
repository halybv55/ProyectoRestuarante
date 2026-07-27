import api from "./axios";

export const getCategorias = async () => {

    const response = await api.get("/menu/categorias");

    return response.data;

};

export const getCategoria = async (id) => {

    const response = await api.get(`/menu/categorias/${id}`);

    return response.data;

};

export const createCategoria = async (data) => {

    const response = await api.post("/menu/categorias", data);

    return response.data;

};

export const updateCategoria = async (id, data) => {

    const response = await api.put(`/menu/categorias/${id}`, data);

    return response.data;

};

export const deleteCategoria = async (id) => {

    const response = await api.delete(`/menu/categorias/${id}`);

    return response.data;

};