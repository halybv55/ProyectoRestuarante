import { useEffect, useState } from "react";

import { getMenuActivo, getDetalleMenu } from "../../api/menu.api";
import { getBebidas } from "../../api/bebida.api";
import { getMesas } from "../../api/mesa.api";

import { createPedido } from "../../api/pedido.api";
import { registrarVenta } from "../../api/venta.api";

function Pedido() {

    const [menu, setMenu] = useState(null);

    // AQUÍ IRÁN LOS PLATOS Y COMBOS DEL MENÚ
    const [productosMenu, setProductosMenu] = useState([]);

    const [bebidas, setBebidas] = useState([]);

    const [mesas, setMesas] = useState([]);

    const [detalle, setDetalle] = useState([]);

    const [tipoPedido, setTipoPedido] = useState("RESTAURANTE");

    const [mesa, setMesa] = useState("");

    const [metodoPago, setMetodoPago] = useState(1);

    const [descuento, setDescuento] = useState(0);

    const [total, setTotal] = useState(0);

    useEffect(() => {

        cargarDatos();

    }, []);

    useEffect(() => {

        calcularTotal();

    }, [detalle]);

    const cargarDatos = async () => {

        try {

            const menuResponse = await getMenuActivo();

            if(menuResponse.success && menuResponse.data){

                setMenu(menuResponse.data);

                const detalleResponse = await getDetalleMenu(
                    menuResponse.data.idmenu
                );

                if(detalleResponse.success){

                    setProductosMenu(
                        detalleResponse.data
                    );

                }

            }

            const bebidaResponse = await getBebidas();

            if(bebidaResponse.success){

                setBebidas(
                    bebidaResponse.data
                );

            }

            const mesaResponse = await getMesas();

            if(mesaResponse.success){

                setMesas(
                    mesaResponse.data
                );

            }

        }catch(error){

            console.log(error);

        }

    };    const agregarProducto = (producto) => {

        const cantidad = Number(
            prompt(`Cantidad de ${producto.nombre}`, 1)
        );

        if (!cantidad || cantidad <= 0) return;

        setDetalle((actual) => [

            ...actual,

            {
                tipo: producto.tipo || "PLATO",

                idProducto:
                    producto.iddetalle_menu ??
                    producto.idplato ??
                    producto.idcombo,

                nombre: producto.nombre,

                precio: Number(producto.precio),

                cantidad,

                observacion: ""

            }

        ]);

    };

    const agregarBebida = (bebida) => {

        const cantidad = Number(
            prompt(`Cantidad de ${bebida.nombre}`, 1)
        );

        if (!cantidad || cantidad <= 0) return;

        setDetalle((actual) => [

            ...actual,

            {
                tipo: "BEBIDA",

                idBebida: bebida.idbebida,

                nombre: bebida.nombre,

                precio: Number(bebida.precio),

                cantidad

            }

        ]);

    };

    const eliminarItem = (index) => {

        setDetalle(
            detalle.filter((_, i) => i !== index)
        );

    };

    const calcularTotal = () => {

        let suma = 0;

        detalle.forEach((item) => {

            suma +=
                Number(item.precio) *
                Number(item.cantidad);

        });

        setTotal(suma);

    };

    const limpiarFormulario = () => {

        setDetalle([]);

        setMesa("");

        setTipoPedido("RESTAURANTE");

        setMetodoPago(1);

        setDescuento(0);

        setTotal(0);

    };     const registrarPedidoVenta = async () => {

        if (detalle.length === 0) {

            alert("Debe agregar al menos un producto.");

            return;

        }

        if (tipoPedido === "RESTAURANTE" && !mesa) {

            alert("Seleccione una mesa.");

            return;

        }

        try {

            const pedido = {

                tipoPedido,

                idMesa:
                    tipoPedido === "RESTAURANTE"
                        ? Number(mesa)
                        : null,

                idUsuario: 1,

                platos: detalle
                    .filter(item => item.tipo === "PLATO")
                    .map(item => ({
                        idPlato: item.idProducto,
                        cantidad: item.cantidad,
                        observacion: item.observacion
                    })),

                combos: detalle
                    .filter(item => item.tipo === "COMBO")
                    .map(item => ({
                        idCombo: item.idProducto,
                        cantidad: item.cantidad
                    })),

                bebidas: detalle
                    .filter(item => item.tipo === "BEBIDA")
                    .map(item => ({
                        idBebida: item.idBebida,
                        cantidad: item.cantidad
                    }))

            };

            const pedidoResponse = await createPedido(pedido);

            if (!pedidoResponse.success) {

                alert("No se pudo registrar el pedido.");

                return;

            }

            const venta = {

                idPedido: pedidoResponse.data.idpedido,

                idMetodoPago: Number(metodoPago),

                descuento: Number(descuento)

            };

            const ventaResponse = await registrarVenta(venta);

            if (ventaResponse.success) {

                alert("Pedido y venta registrados correctamente.");

                limpiarFormulario();

            } else {

                alert("El pedido fue registrado, pero la venta falló.");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error al registrar el pedido."
            );

        }

    };
        return (

        <div>

            <h2>Nuevo Pedido</h2>

            <hr />

            <label>Tipo de Pedido</label>

            <br />

            <select
                value={tipoPedido}
                onChange={(e) => setTipoPedido(e.target.value)}
            >
                <option value="RESTAURANTE">
                    Restaurante
                </option>

                <option value="LLEVAR">
                    Para Llevar
                </option>

            </select>

            <br /><br />

            {
                tipoPedido === "RESTAURANTE" && (

                    <>

                        <label>Mesa</label>

                        <br />

                        <select
                            value={mesa}
                            onChange={(e) => setMesa(e.target.value)}
                        >

                            <option value="">
                                Seleccione una mesa
                            </option>

                            {
                                mesas.map((mesa)=>(

                                    <option
                                        key={mesa.idmesa}
                                        value={mesa.idmesa}
                                    >

                                        Mesa {mesa.numero}

                                    </option>

                                ))
                            }

                        </select>

                        <br /><br />

                    </>

                )

            }

            <hr />

            <h3>Menú del Día</h3>

            <table border="1">

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Tipo</th>

                        <th>Precio</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        productosMenu.map((producto)=>(

                            <tr key={producto.iddetalle_menu ?? producto.idcombo}>

                                <td>

                                    {producto.nombre}

                                </td>

                                <td>

                                    {producto.tipo ?? "PLATO"}

                                </td>

                                <td>

                                    Bs. {producto.precio}

                                </td>

                                <td>

                                    <button
                                        onClick={()=>agregarProducto(producto)}
                                    >

                                        Agregar

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <hr />

            <h3>Bebidas</h3>

            <table border="1">

                <thead>

                    <tr>

                        <th>Bebida</th>

                        <th>Precio</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bebidas.map((bebida)=>(

                            <tr key={bebida.idbebida}>

                                <td>

                                    {bebida.nombre}

                                </td>

                                <td>

                                    Bs. {bebida.precio}

                                </td>

                                <td>

                                    <button
                                        onClick={()=>agregarBebida(bebida)}
                                    >

                                        Agregar

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <hr />

            <h3>Detalle del Pedido</h3>

            <table border="1">

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Cantidad</th>

                        <th>Precio</th>

                        <th>Subtotal</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        detalle.map((item,index)=>(

                            <tr key={index}>

                                <td>

                                    {item.nombre}

                                </td>

                                <td>

                                    {item.cantidad}

                                </td>

                                <td>

                                    Bs. {item.precio}

                                </td>

                                <td>

                                    Bs. {item.precio * item.cantidad}

                                </td>

                                <td>

                                    <button
                                        onClick={()=>eliminarItem(index)}
                                    >

                                        Eliminar

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

            <hr />

            <h2>

                Total: Bs. {total - Number(descuento)}

            </h2>

            <label>Método de Pago</label>

            <br />

            <select
                value={metodoPago}
                onChange={(e)=>setMetodoPago(e.target.value)}
            >

                <option value={1}>Efectivo</option>

                <option value={2}>QR</option>

                <option value={3}>Tarjeta</option>

            </select>

            <br /><br />

            <label>Descuento</label>

            <br />

            <input
                type="number"
                value={descuento}
                onChange={(e)=>setDescuento(e.target.value)}
            />

            <br /><br />

            <button
                onClick={registrarPedidoVenta}
            >

                Registrar Pedido y Venta

            </button>

        </div>

    );

}

export default Pedido;