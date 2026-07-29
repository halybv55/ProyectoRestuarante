import { useEffect, useState } from "react";
import {
    MdDeleteOutline,
    MdRestaurant,
    MdSave,
    MdViewModule
} from "react-icons/md";
import { getPlatos } from "../../api/plato.api";
import { createCombo } from "../../api/combo.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Textarea from "../../components/Textarea";
import ProductCard from "../../components/caja/ProductCard";
import CajaLayout from "../../layouts/CajaLayout";

function Combos(){
    const [platos,setPlatos]=useState([]);

    const [detalle,setDetalle]=useState([]);

    const [nombre,setNombre]=useState("");

    const [descripcion,setDescripcion]=useState("");

    const [precio,setPrecio]=useState("");

    const cargarPlatos = async()=>{
        try{
            const response = await getPlatos();

            setPlatos(response);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        // Conserva la carga inicial existente sin añadir estado asíncrono.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarPlatos();
    },[]);

    const agregarPlato = (plato) => {
        const cantidad = Number(
            prompt(`Cantidad de ${plato.nombre}`, 1)
        );

        if (!cantidad || cantidad <= 0) return;

        setDetalle((actual) => [
            ...actual,
            {
                idplato: plato.idplato,
                nombre: plato.nombre,
                cantidad
            }
        ]);
    };

    const eliminarPlato = (index) => {
        setDetalle(
            detalle.filter((_, i) => i !== index)
        );
    };

    const guardarCombo = async () => {
        if (!nombre) {
            alert("Ingrese el nombre del combo.");

            return;
        }

        if (!precio) {
            alert("Ingrese el precio.");

            return;
        }

        if (detalle.length === 0) {
            alert("Debe agregar al menos un plato.");

            return;
        }

        try {
            await createCombo({
                nombre,

                descripcion,

                precio: Number(precio),

                platos: detalle.map((item) => ({
                    idplato: item.idplato,

                    cantidad: item.cantidad
                }))
            });

            alert("Combo creado correctamente.");

            setNombre("");

            setDescripcion("");

            setPrecio("");

            setDetalle([]);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "No se pudo crear el combo."
            );
        }
    };

    return (
        <CajaLayout>
            <div className="rs-caja-page">
                <PageHeader
                    title="Crear combo"
                    description="Configura un combo con los platos existentes."
                    breadcrumb="Operación / Combos"
                />

                <div className="rs-pos-layout">
                    <section
                        className="rs-pos-catalog"
                        aria-label="Configuración y catálogo de platos"
                    >
                        <Card
                            title="Información del combo"
                            subtitle="Completa los datos comerciales existentes"
                        >
                            <div className="rs-caja-form rs-caja-form--2">
                                <Input
                                    label="Nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                <Input
                                    label="Precio"
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                                <div className="rs-caja-form__full">
                                    <Textarea
                                        label="Descripción"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card
                            title="Platos disponibles"
                            subtitle="Selecciona los platos que formarán parte del combo"
                        >
                            {platos.length === 0 ? (
                                <EmptyState
                                    icon={<MdRestaurant />}
                                    title="Sin platos disponibles"
                                    message="No hay platos para agregar al combo."
                                />
                            ) : (
                                <div className="rs-pos-products">
                                    {platos.map((plato) => (
                                        <ProductCard
                                            key={plato.idplato}
                                            title={plato.nombre}
                                            price={`Bs. ${plato.precio}`}
                                            badge="PLATO"
                                            badgeVariant="primary"
                                            onAction={() => agregarPlato(plato)}
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>
                    </section>

                    <aside
                        className="rs-pos-summary"
                        aria-label="Detalle del combo"
                    >
                        <Card
                            title="Detalle del combo"
                            subtitle={`${detalle.length} selección${detalle.length === 1 ? "" : "es"}`}
                        >
                            {detalle.length === 0 ? (
                                <EmptyState
                                    icon={<MdViewModule />}
                                    title="Combo vacío"
                                    message="Agrega al menos un plato para crear el combo."
                                />
                            ) : (
                                <div className="rs-pos-order-list">
                                    {detalle.map((item,index) => (
                                        <div
                                            className="rs-pos-order-item"
                                            key={index}
                                        >
                                            <div className="rs-pos-order-item__copy">
                                                <strong>{item.nombre}</strong>
                                                <span className="rs-pos-order-item__meta">
                                                    Cantidad: {item.cantidad}
                                                </span>
                                            </div>
                                            <div className="rs-pos-order-item__actions">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    icon={<MdDeleteOutline />}
                                                    onClick={() => eliminarPlato(index)}
                                                    aria-label={`Quitar ${item.nombre} del combo`}
                                                >
                                                    Quitar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="rs-pos-totals">
                                <Button
                                    type="button"
                                    size="lg"
                                    fullWidth
                                    icon={<MdSave />}
                                    onClick={guardarCombo}
                                >
                                    Guardar combo
                                </Button>
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </CajaLayout>
    );
}

export default Combos;
