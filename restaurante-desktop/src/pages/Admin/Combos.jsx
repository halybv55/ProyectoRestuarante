import { useEffect, useState } from "react";
import { MdRestaurantMenu, MdSave } from "react-icons/md";
import { getPlatos } from "../../api/plato.api";
import { createCombo } from "../../api/combo.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

function Combos() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    const [platos, setPlatos] = useState([]);

    const [seleccionados, setSeleccionados] = useState([]);

    const cargarPlatos = async () => {
        try {
            const data = await getPlatos();

            setPlatos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Preserve the existing initial API load.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarPlatos();
    }, []);

    const cambiarSeleccion = (plato) => {
        const existe = seleccionados.find(
            p => p.idplato === plato.idplato
        );

        if (existe) {
            setSeleccionados(
                seleccionados.filter(
                    p => p.idplato !== plato.idplato
                )
            );

            return;
        }

        setSeleccionados([
            ...seleccionados,
            {
                idplato: plato.idplato,
                cantidad: 1
            }
        ]);
    };

    const cambiarCantidad = (id, cantidad) => {
        setSeleccionados(
            seleccionados.map((p) =>
                p.idplato === id
                    ? {
                        ...p,
                        cantidad: Number(cantidad)
                    }
                    : p
            )
        );
    };

    const guardarCombo = async () => {
        try {
            await createCombo({
                nombre,
                descripcion,
                precio: Number(precio),
                platos: seleccionados
            });

            alert("Combo registrado.");

            setNombre("");
            setDescripcion("");
            setPrecio("");

            setSeleccionados([]);
        } catch (error) {
            console.log(error);
        }
    };

    const enviarFormulario = (event) => {
        event.preventDefault();
        guardarCombo();
    };

    return (
        <div className="rs-admin-page">
            <PageHeader
                title="Combos"
                description="Crea combinaciones de platos respetando sus cantidades."
            />

            <form
                className="rs-admin-combo-grid"
                onSubmit={enviarFormulario}
                noValidate
            >
                <Card
                    title="Información del combo"
                    subtitle="Define los datos generales antes de seleccionar platos."
                >
                    <div className="rs-admin-form">
                        <Input
                            type="text"
                            label="Nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <Input
                            type="text"
                            label="Descripción"
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />

                        <Input
                            type="number"
                            label="Precio"
                            placeholder="Precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />

                        <div className="rs-admin-form__actions">
                            <Button type="submit" icon={<MdSave />}>
                                Guardar combo
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card
                    title="Platos del combo"
                    subtitle="Selecciona los platos y conserva la cantidad requerida."
                    className={platos.length === 0 ? "rs-admin-empty-card" : ""}
                >
                    {platos.length === 0 ? (
                        <EmptyState
                            icon={<MdRestaurantMenu />}
                            title="No hay platos disponibles"
                            message="Los platos registrados aparecerán para su selección."
                        />
                    ) : (
                        <Table className="rs-admin-table">
                            <thead>
                                <tr>
                                    <th>Agregar</th>
                                    <th>Plato</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {platos.map((plato) => {
                                    const seleccionado = seleccionados.find(
                                        (p) => p.idplato === plato.idplato
                                    );

                                    return (
                                        <tr key={plato.idplato}>
                                            <td>
                                                <label className="rs-admin-selection">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!seleccionado}
                                                        onChange={() =>
                                                            cambiarSeleccion(plato)
                                                        }
                                                    />
                                                    <span className="rs-sr-only">
                                                        Agregar {plato.nombre}
                                                    </span>
                                                </label>
                                            </td>
                                            <td>{plato.nombre}</td>
                                            <td className="rs-admin-cell--numeric">
                                                {plato.precio}
                                            </td>
                                            <td>
                                                {seleccionado && (
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="rs-admin-quantity"
                                                        aria-label={`Cantidad de ${plato.nombre}`}
                                                        value={
                                                            seleccionado.cantidad
                                                        }
                                                        onChange={(e) =>
                                                            cambiarCantidad(
                                                                plato.idplato,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Card>
            </form>

        </div>
    );
}

export default Combos;
