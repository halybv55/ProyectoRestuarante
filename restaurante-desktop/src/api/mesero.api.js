import api from "./axios";

export const getListos = async () => {

    const response = await api.get("/pedidos/cocina/listos");

    return response.data;

};

export const entregarPedido = async (idDetalle) => {

    const response = await api.put(

        `/pedidos/detalle/${idDetalle}/estado`,

        {

            idEstado: 4

        }

    );

    return response.data;

};