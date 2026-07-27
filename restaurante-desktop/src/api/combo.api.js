import api from "./axios";

export const getCombos = async () => {

    const response = await api.get("/menu/combos");

    return response.data;

};

export const getCombo = async(id)=>{

    const response = await api.get(`/menu/combos/${id}`);

    return response.data;

};

export const createCombo = async(data)=>{

    const response = await api.post("/menu/combos",data);

    return response.data;

};