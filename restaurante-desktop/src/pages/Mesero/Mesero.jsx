import { useEffect, useState } from "react";
import { MdDoneAll, MdReceiptLong } from "react-icons/md";
import {
    getListos,
    entregarPedido
} from "../../api/mesero.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import OrderTicket from "../../components/operacion/OrderTicket";
import MeseroLayout from "../../layouts/MeseroLayout";

function Mesero() {
    const [pedidos, setPedidos] = useState([]);

    const cargarPedidos = async () => {
        try {
            const response = await getListos();

            setPedidos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Conserva la carga inicial existente sin añadir polling.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarPedidos();
    }, []);

    const entregar = async (idDetalle) => {
        try {
            await entregarPedido(idDetalle);

            cargarPedidos();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MeseroLayout>
            <div className="rs-waiter-page">
                <PageHeader
                    title="Pedidos listos"
                    description="Pedidos disponibles para entregar en mesa."
                    breadcrumb="Mesero / Pedidos"
                />

                {pedidos.length === 0 ? (
                    <Card className="rs-waiter-empty-card">
                        <EmptyState
                            icon={<MdReceiptLong />}
                            title="Sin pedidos listos"
                            message="No hay detalles disponibles para entregar en este momento."
                        />
                    </Card>
                ) : (
                    <section
                        className="rs-order-grid"
                        aria-label="Pedidos listos para entregar"
                    >
                        {pedidos.map((pedido) => (
                            <OrderTicket
                                key={pedido.iddetalle}
                                code={pedido.codigo_pedido}
                                table={pedido.mesa}
                                product={pedido.plato}
                                quantity={pedido.cantidad}
                                status={pedido.estado}
                                actions={
                                    <Button
                                        type="button"
                                        variant="success"
                                        icon={<MdDoneAll />}
                                        fullWidth
                                        onClick={() =>
                                            entregar(
                                                pedido.iddetalle
                                            )
                                        }
                                    >
                                        Entregar
                                    </Button>
                                }
                            />
                        ))}
                    </section>
                )}
            </div>
        </MeseroLayout>
    );
}

export default Mesero;
