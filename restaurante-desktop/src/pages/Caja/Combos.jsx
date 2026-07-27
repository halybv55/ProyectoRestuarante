import { useEffect,useState } from "react";

import { getPlatos } from "../../api/plato.api";

import { createCombo } from "../../api/combo.api";

function Combos(){

    const [platos,setPlatos]=useState([]);

    const [detalle,setDetalle]=useState([]);

    const [nombre,setNombre]=useState("");

    const [descripcion,setDescripcion]=useState("");

    const [precio,setPrecio]=useState("");

    useEffect(()=>{

        cargarPlatos();

    },[]);

    const cargarPlatos = async()=>{

        try{

            const response = await getPlatos();

            setPlatos(response);

        }catch(error){

            console.log(error);

        }

    };
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

            const response = await createCombo({

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

        <div>

            <h2>Crear Combo</h2>

            <hr />

            <label>Nombre</label>

            <br />

            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <br /><br />

            <label>Descripción</label>

            <br />

            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <br /><br />

            <label>Precio</label>

            <br />

            <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            <hr />

            <h3>Platos Disponibles</h3>

            <table border="1">

                <thead>

                    <tr>

                        <th>Plato</th>

                        <th>Precio</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        platos.map((plato)=>(

                            <tr key={plato.idplato}>

                                <td>{plato.nombre}</td>

                                <td>Bs. {plato.precio}</td>

                                <td>

                                    <button
                                        onClick={()=>agregarPlato(plato)}
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

            <h3>Detalle del Combo</h3>

            <table border="1">

                <thead>

                    <tr>

                        <th>Plato</th>

                        <th>Cantidad</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {
                        detalle.map((item,index)=>(

                            <tr key={index}>

                                <td>{item.nombre}</td>

                                <td>{item.cantidad}</td>

                                <td>

                                    <button
                                        onClick={()=>eliminarPlato(index)}
                                    >

                                        Quitar

                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            <br />

            <button onClick={guardarCombo}>

                Guardar Combo

            </button>

        </div>

    );

}

export default Combos;