import api from "./axios";

export const registrarVenta = async (venta) => {

    const response = await api.post(
        "/ventas",
        venta
    );

    return response.data;

};