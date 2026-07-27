import api from "./axios";

/*==========================
    MENÚ
==========================*/

export const getMenus = async () => {

    const response = await api.get("/menu");

    return response.data;

};

export const getMenuActivo = async () => {

    const response = await api.get("/menu/activo");

    return response.data;

};

export const createMenu = async (fecha) => {

    const response = await api.post("/menu", {
        fecha
    });

    return response.data;

};

export const cerrarMenu = async (id) => {

    const response = await api.patch(`/menu/${id}/cerrar`);

    return response.data;

};

/*==========================
    DETALLE MENÚ
==========================*/

export const getDetalleMenu = async (idMenu) => {

    const response = await api.get(`/menu/detalle/${idMenu}`);

    return response.data;

};

export const agregarPlatosMenu = async (data) => {

    const response = await api.post("/menu/detalle", data);

    return response.data;

};