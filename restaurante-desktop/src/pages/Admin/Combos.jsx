import { useEffect, useState } from "react";

import { getPlatos } from "../../api/plato.api";
import { createCombo } from "../../api/combo.api";

function Combos() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    const [platos, setPlatos] = useState([]);

    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {

        cargarPlatos();

    }, []);

    const cargarPlatos = async () => {

        try {

            const data = await getPlatos();

            setPlatos(data);

        } catch (error) {

            console.log(error);

        }

    };

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
      return (
    <div>

      <h2>Combos</h2>

      <hr />

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <hr />

      <h3>Platos del Combo</h3>

      <table border="1">

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

                  <input
                    type="checkbox"
                    checked={!!seleccionado}
                    onChange={() => cambiarSeleccion(plato)}
                  />

                </td>

                <td>{plato.nombre}</td>

                <td>{plato.precio}</td>

                <td>

                  {seleccionado && (

                    <input
                      type="number"
                      min="1"
                      value={seleccionado.cantidad}
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

      </table>

      <br />

      <button onClick={guardarCombo}>
        Guardar Combo
      </button>

    </div>
  );

}

export default Combos;