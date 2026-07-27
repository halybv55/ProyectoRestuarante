import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdSave, MdTableRestaurant } from "react-icons/md";
import {
    getMesas,
    createMesa,
    updateMesa,
    deleteMesa
} from "../../api/mesa.api";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Table from "../../components/Table";

function Mesas() {
    const [mesas, setMesas] = useState([]);

    const [numero, setNumero] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [disponible, setDisponible] = useState(true);

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const cargarMesas = async () => {
        try {
            const response = await getMesas();

            setMesas(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Preserve the existing initial API load.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarMesas();
    }, []);

    const limpiar = () => {
        setNumero("");
        setCapacidad("");
        setDisponible(true);

        setEditando(false);
        setIdEditar(null);
    };

    const guardarMesa = async () => {
        try {
            await createMesa({
                numero: Number(numero),
                capacidad: Number(capacidad),
                disponible
            });

            limpiar();

            cargarMesas();
        } catch (error) {
            console.log(error);
        }
    };

    const editarMesa = (mesa) => {
        setEditando(true);

        setIdEditar(mesa.idmesa);

        setNumero(mesa.numero);

        setCapacidad(mesa.capacidad);

        setDisponible(mesa.disponible);
    };

    const actualizarMesa = async () => {
        try {
            await updateMesa(idEditar, {
                numero: Number(numero),
                capacidad: Number(capacidad),
                disponible
            });

            limpiar();

            cargarMesas();
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarMesa = async (id) => {
        if (!window.confirm("¿Eliminar mesa?")) return;

        try {
            await deleteMesa(id);

            cargarMesas();
        } catch (error) {
            console.log(error);
        }
    };

    const enviarFormulario = (event) => {
        event.preventDefault();
        if (editando) {
            actualizarMesa();
        } else {
            guardarMesa();
        }
    };

    return (
        <div className="rs-admin-page">
            <PageHeader
                title="Mesas"
                description="Configura las mesas existentes y su disponibilidad."
            />

            <div className="rs-admin-work-area">
                <Card
                    title={editando ? "Editar mesa" : "Nueva mesa"}
                    subtitle={
                        editando
                            ? "Actualiza los datos de la mesa seleccionada."
                            : "Registra una mesa para la operación."
                    }
                >
                    <form
                        className="rs-admin-form"
                        onSubmit={enviarFormulario}
                        noValidate
                    >
                        <div className="rs-admin-form__grid rs-admin-form__grid--2">
                            <Input
                                type="number"
                                label="Número"
                                placeholder="Número"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />

                            <Input
                                type="number"
                                label="Capacidad"
                                placeholder="Capacidad"
                                value={capacidad}
                                onChange={(e) => setCapacidad(e.target.value)}
                            />

                            <Select
                                label="Estado"
                                value={disponible ? "true" : "false"}
                                onChange={(e) =>
                                    setDisponible(e.target.value === "true")
                                }
                            >
                                <option value="true">Disponible</option>
                                <option value="false">Ocupada</option>
                            </Select>
                        </div>

                        <div className="rs-admin-form__actions">
                            <Button type="submit" icon={<MdSave />}>
                                {editando ? "Actualizar" : "Guardar"}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={limpiar}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card
                    title="Mesas registradas"
                    subtitle="Configuración actual del salón."
                    className={mesas.length === 0 ? "rs-admin-empty-card" : ""}
                >
                    {mesas.length === 0 ? (
                        <EmptyState
                            icon={<MdTableRestaurant />}
                            title="No hay mesas registradas"
                            message="Las mesas creadas aparecerán en este listado."
                        />
                    ) : (
                        <Table className="rs-admin-table">
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Capacidad</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mesas.map((mesa) => (
                                    <tr key={mesa.idmesa}>
                                        <td className="rs-admin-cell--numeric">
                                            {mesa.numero}
                                        </td>
                                        <td className="rs-admin-cell--numeric">
                                            {mesa.capacidad}
                                        </td>
                                        <td>
                                            <Badge
                                                variant={
                                                    mesa.disponible
                                                        ? "success"
                                                        : "warning"
                                                }
                                            >
                                                {mesa.disponible
                                                    ? "Disponible"
                                                    : "Ocupada"}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="rs-admin-row-actions">
                                                <Button
                                                    variant="secondary"
                                                    icon={<MdEdit />}
                                                    onClick={() =>
                                                        editarMesa(mesa)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    icon={<MdDelete />}
                                                    onClick={() =>
                                                        eliminarMesa(mesa.idmesa)
                                                    }
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default Mesas;
