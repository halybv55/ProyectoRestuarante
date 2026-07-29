import { useCallback, useEffect, useState } from "react";
import { MdCheck, MdPlayArrow, MdReceiptLong } from "react-icons/md";
import { cambiarEstado } from "../../api/cocina.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import OrderTicket from "../../components/operacion/OrderTicket";
import CocinaLayout from "../../layouts/CocinaLayout";
import { getOrderDetailsByState } from "../../utils/orderWorkflow";

function Cocina(){
    const [pedidos,setPedidos]=useState([]);

    const cargarPedidos = useCallback(async()=>{
        try{
            const pedidosActuales = await getOrderDetailsByState([
                "PENDIENTE",
                "PREPARANDO",
            ]);
            setPedidos(pedidosActuales);
        }catch(error){
            console.log(error);
        }
    }, []);

    useEffect(()=>{
        // La consulta inicial y el intervalo sincronizan la cola operativa.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarPedidos();
        const refreshInterval = window.setInterval(cargarPedidos, 8000);

        return () => window.clearInterval(refreshInterval);
    },[cargarPedidos]);

    const preparar = async(idDetalle)=>{
        try{
            await cambiarEstado(
                idDetalle,
                2
            );
            cargarPedidos();
        }catch(error){
            console.log(error);
        }
    };

    const listo = async(idDetalle)=>{
        try{
            await cambiarEstado(
                idDetalle,
                4
            );
            cargarPedidos();
        }catch(error){
            console.log(error);
        }
    };

    return (
        <CocinaLayout>
            <div className="rs-kitchen-page">
                <PageHeader
                    title="Pedidos pendientes"
                    description="Detalles que requieren preparación o cambio al estado listo."
                    breadcrumb="Cocina / Pedidos"
                />

                {pedidos.length === 0 ? (
                    <Card className="rs-kitchen-empty-card">
                        <EmptyState
                            icon={<MdReceiptLong />}
                            title="Sin pedidos pendientes"
                            message="No hay detalles disponibles para procesar en este momento."
                        />
                    </Card>
                ) : (
                    <section
                        className="rs-order-grid"
                        aria-label="Pedidos pendientes de Cocina"
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
                                    pedido.estado==="PENDIENTE"
                                    ?
                                    <Button
                                        type="button"
                                        variant="primary"
                                        icon={<MdPlayArrow />}
                                        onClick={()=>
                                            preparar(
                                                pedido.iddetalle
                                            )
                                        }
                                    >
                                        Preparando
                                    </Button>
                                    :
                                    <Button
                                        type="button"
                                        variant="success"
                                        icon={<MdCheck />}
                                        onClick={()=>
                                            listo(
                                                pedido.iddetalle
                                            )
                                        }
                                    >
                                        Listo
                                    </Button>
                                }
                            />
                        ))}
                    </section>
                )}
            </div>
        </CocinaLayout>
    );
}

export default Cocina;
