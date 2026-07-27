import api from "./axios";

export const getPedidos = async () => {

    const response = await api.get("/pedidos");

    return response.data;

};

export const createPedido = async (data) => {

    const response = await api.post("/pedidos",data);

    return response.data;

};

export const getPedido = async(id)=>{

    const response = await api.get(`/pedidos/${id}`);

    return response.data;

};