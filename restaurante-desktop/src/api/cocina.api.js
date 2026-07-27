import api from "./axios";

export const getPendientes = async () => {

    const response = await api.get("/pedidos/cocina/pendientes");

    return response.data;

};

export const getListos = async () => {

    const response = await api.get("/pedidos/cocina/listos");

    return response.data;

};

export const cambiarEstado = async (idDetalle,idEstado)=>{

    const response = await api.put(

        `/pedidos/detalle/${idDetalle}/estado`,

        {

            idEstado

        }

    );

    return response.data;

};