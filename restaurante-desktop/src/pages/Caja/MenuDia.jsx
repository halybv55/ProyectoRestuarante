import { useEffect, useState } from "react";

import {
    getMenuActivo,
    createMenu,
    cerrarMenu,
    getDetalleMenu,
    agregarPlatosMenu
} from "../../api/menu.api";

import { getPlatos } from "../../api/plato.api";
import { getCombos } from "../../api/combo.api";

function MenuDia() {

    const [menu, setMenu] = useState(null);

    const [fecha, setFecha] = useState("");

    const [platos, setPlatos] = useState([]);

    const [combos, setCombos] = useState([]);

    // Productos agregados al menú
    const [detalle, setDetalle] = useState([]);

    // Temporal mientras el backend no soporte agregar combos al menú
    const [combosMenu, setCombosMenu] = useState([]);

    useEffect(() => {

        cargarDatos();

    }, []);

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

    };    const crearMenuDia = async () => {

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

    };    return (

        <div>

            <h2>Menú del Día</h2>

            <hr />

            {

                !menu ? (

                    <>

                        <h3>Crear Menú</h3>

                        <input
                            type="date"
                            value={fecha}
                            onChange={(e)=>setFecha(e.target.value)}
                        />

                        <br />
                        <br />

                        <button
                            onClick={crearMenuDia}
                        >

                            Crear Menú

                        </button>

                    </>

                ) : (

                    <>

                        <h3>

                            Menú Activo

                        </h3>

                        <p>

                            Fecha:

                            {" "}

                            {

                                new Date(

                                    menu.fecha

                                ).toLocaleDateString()

                            }

                        </p>

                        <button

                            onClick={cerrarMenuDia}

                        >

                            Cerrar Menú

                        </button>

                        <hr />

                        <h3>

                            Platos Disponibles

                        </h3>

                        <table border="1">

                            <thead>

                                <tr>

                                    <th>

                                        Nombre

                                    </th>

                                    <th>

                                        Precio

                                    </th>

                                    <th>

                                        Acción

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    platos.map((plato)=>(

                                        <tr key={plato.idplato}>

                                            <td>

                                                {plato.nombre}

                                            </td>

                                            <td>

                                                Bs. {plato.precio}

                                            </td>

                                            <td>

                                                <button

                                                    onClick={()=>

                                                        agregarPlato(plato)

                                                    }

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
                                                <h3>

                            Combos Disponibles

                        </h3>

                        <table border="1">

                            <thead>

                                <tr>

                                    <th>

                                        Nombre

                                    </th>

                                    <th>

                                        Precio

                                    </th>

                                    <th>

                                        Acción

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    combos.map((combo)=>(

                                        <tr key={combo.idcombo}>

                                            <td>

                                                {combo.nombre}

                                            </td>

                                            <td>

                                                Bs. {combo.precio}

                                            </td>

                                            <td>

                                                <button

                                                    onClick={()=>

                                                        agregarCombo(combo)

                                                    }

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
                        <h3>
                            Productos del Menú
                        </h3>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>
                                        Tipo
                                    </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Stock
                                    </th>
                                    <th>
                                        Precio
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detalle.map((item)=>(
                                        <tr key={"P"+item.iddetalle_menu}>
                                            <td>
                                                 Plato
                                            </td>
                                            <td>
                                                {item.nombre}
                                            </td>
                                            <td>
                                                {item.stock}
                                            </td>
                                            <td>
                                                Bs. {item.precio}
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    combosMenu.map((combo,index)=>(
                                        <tr key={"C"+index}>
                                            <td>
                                                 Combo
                                            </td>
                                            <td>
                                                {combo.nombre}
                                            </td>
                                            <td>
                                                {combo.stock}
                                            </td>
                                            <td>
                                                Bs. {combo.precio}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <hr />
                        <h3>
                            Resumen
                        </h3>
                        <p>
                            Platos agregados:
                            {" "}
                            <strong>
                                {detalle.length}
                            </strong>
                        </p>
                        <p>
                            Combos agregados:
                            {" "}
                            <strong>
                                {combosMenu.length}
                            </strong>
                        </p>
                    </>
                )
            }
        </div>
    );
}
export default MenuDia;