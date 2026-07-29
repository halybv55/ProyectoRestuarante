import { useEffect, useState } from "react";
import {
    MdEvent,
    MdInventory2,
    MdRestaurant,
    MdViewModule
} from "react-icons/md";
import {
    getMenuActivo,
    createMenu,
    cerrarMenu,
    getDetalleMenu,
    agregarPlatosMenu
} from "../../api/menu.api";
import { getPlatos } from "../../api/plato.api";
import { getCombos } from "../../api/combo.api";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import ProductCard from "../../components/caja/ProductCard";
import CajaLayout from "../../layouts/CajaLayout";

function MenuDia() {
    const [menu, setMenu] = useState(null);

    const [fecha, setFecha] = useState("");

    const [platos, setPlatos] = useState([]);

    const [combos, setCombos] = useState([]);

    // Productos agregados al menú
    const [detalle, setDetalle] = useState([]);

    // Temporal mientras el backend no soporte agregar combos al menú
    const [combosMenu, setCombosMenu] = useState([]);

    const cargarDatos = async () => {
        try {
            const menuResponse = await getMenuActivo();

            if (menuResponse.success && menuResponse.data) {
                setMenu(menuResponse.data);

                const detalleResponse = await getDetalleMenu(
                    menuResponse.data.idmenu
                );

                if (detalleResponse.success) {
                    setDetalle(
                        detalleResponse.data
                    );
                }
            }

            const platosResponse = await getPlatos();

            setPlatos(
                platosResponse
            );

            const combosResponse = await getCombos();

            setCombos(
                combosResponse
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Conserva la carga inicial existente sin añadir estado asíncrono.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarDatos();
    }, []);

    const crearMenuDia = async () => {
        if (!fecha) {
            alert("Seleccione una fecha.");

            return;
        }

        try {
            const response = await createMenu(fecha);

            if (response.success) {
                alert(response.message);

                setMenu(response.data);

                cargarDatos();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "No se pudo crear el menú."
            );
        }
    };

    const cerrarMenuDia = async () => {
        if (!window.confirm("¿Cerrar el menú del día?")) {
            return;
        }

        try {
            const response = await cerrarMenu(menu.idmenu);

            if (response.success) {
                alert(response.message);

                setMenu(null);

                setDetalle([]);

                setCombosMenu([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const agregarPlato = async (plato) => {
        const stock = Number(
            prompt(`Stock para ${plato.nombre}`, 10)
        );

        if (!stock || stock <= 0) return;

        try {
            const response = await agregarPlatosMenu({
                idmenu: menu.idmenu,

                platos: [
                    {
                        idplato: plato.idplato,

                        stock
                    }
                ]
            });

            if (response.success) {
                alert(response.message);

                cargarDatos();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error al agregar el plato."
            );
        }
    };

    // TEMPORAL
    // Cuando exista el endpoint del backend,
    // aquí solamente cambiaremos el POST.
    const agregarCombo = (combo) => {
        const stock = Number(
            prompt(`Stock para ${combo.nombre}`, 10)
        );

        if (!stock || stock <= 0) return;

        setCombosMenu((actual) => [
            ...actual,
            {
                idcombo: combo.idcombo,

                nombre: combo.nombre,

                precio: combo.precio,

                stock
            }
        ]);
    };

    return (
        <CajaLayout>
            <div className="rs-caja-page">
                <PageHeader
                    title="Menú del día"
                    description="Administra los productos disponibles para la operación actual."
                    breadcrumb="Operación / Menú del día"
                    actions={menu ? (
                        <Button
                            type="button"
                            variant="danger"
                            onClick={cerrarMenuDia}
                        >
                            Cerrar menú
                        </Button>
                    ) : null}
                />

                {!menu ? (
                    <Card
                        title="Crear menú"
                        subtitle="Selecciona la fecha para iniciar un nuevo menú"
                    >
                        <div className="rs-caja-form">
                            <Input
                                label="Fecha"
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                icon={<MdEvent />}
                            />
                            <div className="rs-caja-form__actions">
                                <Button
                                    type="button"
                                    onClick={crearMenuDia}
                                >
                                    Crear menú
                                </Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <>
                        <Card>
                            <div className="rs-caja-menu-header">
                                <div className="rs-caja-menu-header__status">
                                    <Badge variant="success">Menú activo</Badge>
                                    <strong>
                                        {new Date(menu.fecha).toLocaleDateString()}
                                    </strong>
                                </div>
                                <span className="rs-field__message">
                                    {detalle.length} platos · {combosMenu.length} combos
                                </span>
                            </div>
                        </Card>

                        <div className="rs-caja-menu-grid">
                            <Card
                                title="Platos disponibles"
                                subtitle="Agrega platos y define su stock mediante la operación existente"
                            >
                                {platos.length === 0 ? (
                                    <EmptyState
                                        icon={<MdRestaurant />}
                                        title="Sin platos disponibles"
                                        message="No hay platos para agregar al menú."
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

                            <Card
                                title="Combos disponibles"
                                subtitle="Selección temporal disponible durante esta sesión"
                            >
                                {combos.length === 0 ? (
                                    <EmptyState
                                        icon={<MdViewModule />}
                                        title="Sin combos disponibles"
                                        message="No hay combos para agregar al menú."
                                    />
                                ) : (
                                    <div className="rs-pos-products">
                                        {combos.map((combo) => (
                                            <ProductCard
                                                key={combo.idcombo}
                                                title={combo.nombre}
                                                price={`Bs. ${combo.precio}`}
                                                badge="COMBO"
                                                badgeVariant="info"
                                                onAction={() => agregarCombo(combo)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </div>

                        <Card
                            title="Productos del menú"
                            subtitle="Detalle actual de platos y combos agregados"
                        >
                            {detalle.length === 0 && combosMenu.length === 0 ? (
                                <EmptyState
                                    icon={<MdInventory2 />}
                                    title="Menú sin productos"
                                    message="Agrega platos o combos para completar el menú."
                                />
                            ) : (
                                <Table className="rs-caja-table">
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Nombre</th>
                                            <th>Stock</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalle.map((item) => (
                                            <tr key={"P" + item.iddetalle_menu}>
                                                <td>
                                                    <Badge variant="primary">
                                                        Plato
                                                    </Badge>
                                                </td>
                                                <td>{item.nombre}</td>
                                                <td className="rs-caja-cell--numeric">
                                                    {item.stock}
                                                </td>
                                                <td className="rs-caja-cell--numeric">
                                                    Bs. {item.precio}
                                                </td>
                                            </tr>
                                        ))}
                                        {combosMenu.map((combo, index) => (
                                            <tr key={"C" + index}>
                                                <td>
                                                    <Badge variant="info">
                                                        Combo
                                                    </Badge>
                                                </td>
                                                <td>{combo.nombre}</td>
                                                <td className="rs-caja-cell--numeric">
                                                    {combo.stock}
                                                </td>
                                                <td className="rs-caja-cell--numeric">
                                                    Bs. {combo.precio}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card>
                    </>
                )}
            </div>
        </CajaLayout>
    );
}

export default MenuDia;
