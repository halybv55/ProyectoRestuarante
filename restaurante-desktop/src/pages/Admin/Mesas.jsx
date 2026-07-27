import { useEffect, useState } from "react";
import {
    getMesas,
    createMesa,
    updateMesa,
    deleteMesa
} from "../../api/mesa.api";
function Mesas() {

    const [mesas, setMesas] = useState([]);

    const [numero, setNumero] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [disponible, setDisponible] = useState(true);

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {

        cargarMesas();

    }, []);

    const cargarMesas = async () => {

        try {

            const response = await getMesas();

            setMesas(response.data);

        } catch (error) {

            console.log(error);

        }

    };

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
      return (
    <div>

      <h2>Mesas</h2>

      <hr />

      <h3>{editando ? "Editar Mesa" : "Nueva Mesa"}</h3>

      <input
        type="number"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Capacidad"
        value={capacidad}
        onChange={(e) => setCapacidad(e.target.value)}
      />

      <br />
      <br />

      <select
        value={disponible ? "true" : "false"}
        onChange={(e) => setDisponible(e.target.value === "true")}
      >
        <option value="true">Disponible</option>
        <option value="false">Ocupada</option>
      </select>

      <br />
      <br />

      {editando ? (
        <button onClick={actualizarMesa}>
          Actualizar
        </button>
      ) : (
        <button onClick={guardarMesa}>
          Guardar
        </button>
      )}

      <button onClick={limpiar}>
        Cancelar
      </button>

      <hr />

      <table border="1">

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

              <td>{mesa.numero}</td>

              <td>{mesa.capacidad}</td>

              <td>

                {mesa.disponible
                  ? "Disponible"
                  : "Ocupada"}

              </td>

              <td>

                <button
                  onClick={() => editarMesa(mesa)}
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarMesa(mesa.idmesa)}
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );

}

export default Mesas;