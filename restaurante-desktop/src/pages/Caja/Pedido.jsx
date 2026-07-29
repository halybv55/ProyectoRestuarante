import { useEffect, useState } from "react";
import {
    MdDeleteOutline,
    MdLocalDrink,
    MdPointOfSale,
    MdRestaurant,
    MdShoppingCart
} from "react-icons/md";
import { getMenuActivo, getDetalleMenu } from "../../api/menu.api";
import { getBebidas } from "../../api/bebida.api";
import { getMesas } from "../../api/mesa.api";
import { createPedido } from "../../api/pedido.api";
import { registrarVenta } from "../../api/venta.api";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Input from "../../components/Input";
import ProductCard from "../../components/caja/ProductCard";
import CajaLayout from "../../layouts/CajaLayout";

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

    useEffect(() => {
        // Conserva la carga inicial existente sin añadir estado asíncrono.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarDatos();
    }, []);

    useEffect(() => {
        // Conserva el total derivado original y su fórmula exacta.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        calcularTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detalle]);

    const agregarProducto = (producto) => {
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

    const limpiarFormulario = () => {
        setDetalle([]);

        setMesa("");

        setTipoPedido("RESTAURANTE");

        setMetodoPago(1);

        setDescuento(0);

        setTotal(0);
    };

    const registrarPedidoVenta = async () => {
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
        <CajaLayout>
            <div className="rs-caja-page">
                <PageHeader
                    title="Nuevo pedido"
                    description="Selecciona los productos y completa los datos de la venta."
                    breadcrumb="Operación / Nuevo pedido"
                    actions={menu ? (
                        <Badge variant="success">Menú activo</Badge>
                    ) : null}
                />

                <div className="rs-pos-layout">
                    <section
                        className="rs-pos-catalog"
                        aria-label="Catálogo de productos"
                    >
                        <Card
                            title="Datos del pedido"
                            subtitle="Define el tipo de servicio y la mesa"
                        >
                            <div className="rs-pos-catalog__controls">
                                <Select
                                    label="Tipo de pedido"
                                    value={tipoPedido}
                                    onChange={(e) => setTipoPedido(e.target.value)}
                                >
                                    <option value="RESTAURANTE">
                                        Restaurante
                                    </option>
                                    <option value="LLEVAR">
                                        Para llevar
                                    </option>
                                </Select>

                                {tipoPedido === "RESTAURANTE" && (
                                    <Select
                                        label="Mesa"
                                        value={mesa}
                                        onChange={(e) => setMesa(e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione una mesa
                                        </option>
                                        {mesas.map((mesaItem) => (
                                            <option
                                                key={mesaItem.idmesa}
                                                value={mesaItem.idmesa}
                                            >
                                                Mesa {mesaItem.numero}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </Card>

                        <Card
                            title="Menú del día"
                            subtitle="Platos y combos disponibles"
                        >
                            {productosMenu.length === 0 ? (
                                <EmptyState
                                    icon={<MdRestaurant />}
                                    title="Sin productos en el menú"
                                    message="No hay platos o combos disponibles para seleccionar."
                                />
                            ) : (
                                <div className="rs-pos-products">
                                    {productosMenu.map((producto) => (
                                        <ProductCard
                                            key={producto.iddetalle_menu ?? producto.idcombo}
                                            title={producto.nombre}
                                            price={`Bs. ${producto.precio}`}
                                            badge={producto.tipo ?? "PLATO"}
                                            badgeVariant="primary"
                                            onAction={() => agregarProducto(producto)}
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>

                        <Card
                            title="Bebidas"
                            subtitle="Bebidas disponibles para el pedido"
                        >
                            {bebidas.length === 0 ? (
                                <EmptyState
                                    icon={<MdLocalDrink />}
                                    title="Sin bebidas disponibles"
                                    message="No hay bebidas para seleccionar."
                                />
                            ) : (
                                <div className="rs-pos-products">
                                    {bebidas.map((bebida) => (
                                        <ProductCard
                                            key={bebida.idbebida}
                                            title={bebida.nombre}
                                            price={`Bs. ${bebida.precio}`}
                                            badge="BEBIDA"
                                            badgeVariant="info"
                                            onAction={() => agregarBebida(bebida)}
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>
                    </section>

                    <aside
                        className="rs-pos-summary"
                        aria-label="Resumen del pedido"
                    >
                        <Card
                            title="Detalle del pedido"
                            subtitle={`${detalle.length} producto${detalle.length === 1 ? "" : "s"}`}
                        >
                            {detalle.length === 0 ? (
                                <EmptyState
                                    icon={<MdShoppingCart />}
                                    title="Pedido vacío"
                                    message="Agrega productos del catálogo para preparar la venta."
                                />
                            ) : (
                                <div className="rs-pos-order-list">
                                    {detalle.map((item, index) => (
                                        <div
                                            className="rs-pos-order-item"
                                            key={index}
                                        >
                                            <div className="rs-pos-order-item__copy">
                                                <strong>{item.nombre}</strong>
                                                <span className="rs-pos-order-item__meta">
                                                    {item.cantidad} × Bs. {item.precio}
                                                </span>
                                            </div>
                                            <span className="rs-pos-order-item__subtotal">
                                                Bs. {item.precio * item.cantidad}
                                            </span>
                                            <div className="rs-pos-order-item__actions">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    icon={<MdDeleteOutline />}
                                                    onClick={() => eliminarItem(index)}
                                                    aria-label={`Eliminar ${item.nombre} del pedido`}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="rs-pos-totals">
                                <Select
                                    label="Método de pago"
                                    value={metodoPago}
                                    onChange={(e) => setMetodoPago(e.target.value)}
                                >
                                    <option value={1}>Efectivo</option>
                                    <option value={2}>QR</option>
                                    <option value={3}>Tarjeta</option>
                                </Select>

                                <Input
                                    label="Descuento"
                                    type="number"
                                    value={descuento}
                                    onChange={(e) => setDescuento(e.target.value)}
                                />

                                <div className="rs-pos-total" aria-live="polite">
                                    <span>Total</span>
                                    <strong>
                                        Bs. {total - Number(descuento)}
                                    </strong>
                                </div>

                                <Button
                                    type="button"
                                    size="lg"
                                    fullWidth
                                    icon={<MdPointOfSale />}
                                    onClick={registrarPedidoVenta}
                                >
                                    Registrar pedido y venta
                                </Button>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </CajaLayout>
    );
}

export default Pedido;
