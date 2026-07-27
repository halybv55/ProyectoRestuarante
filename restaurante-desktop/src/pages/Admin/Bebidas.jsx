import { useEffect, useState } from "react";

import {
  getBebidas,
  createBebida,
  updateBebida,
  deleteBebida,
} from "../../api/bebida.api";

function Bebidas() {

  const [bebidas, setBebidas] = useState([]);

  const [tipo_bebida, setTipoBebida] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const [stock_total, setStockTotal] = useState("");
  const [stock_disponible, setStockDisponible] = useState("");
  const [stock_minimo, setStockMinimo] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {

    cargarBebidas();

  }, []);

  const cargarBebidas = async () => {

    try {

      const response = await getBebidas();

      setBebidas(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const limpiar = () => {

    setTipoBebida("");
    setNombre("");
    setPrecio("");

    setStockTotal("");
    setStockDisponible("");
    setStockMinimo("");

    setEditando(false);
    setIdEditar(null);

  };

  const guardarBebida = async () => {

    try {

      await createBebida({

        tipo_bebida,

        nombre,

        precio: Number(precio),

        stock_total: Number(stock_total),

        stock_disponible: Number(stock_disponible),

        stock_minimo: Number(stock_minimo),

      });

      limpiar();

      cargarBebidas();

    } catch (error) {

      console.log(error);

    }

  };

  const editarBebida = (bebida) => {

    setEditando(true);

    setIdEditar(bebida.idbebida);

    setTipoBebida(bebida.tipo_bebida);

    setNombre(bebida.nombre);

    setPrecio(bebida.precio);

    setStockTotal(bebida.stock_total);

    setStockDisponible(bebida.stock_disponible);

    setStockMinimo(bebida.stock_minimo);

  };

  const actualizarBebida = async () => {

    try {

      await updateBebida(idEditar, {

        tipo_bebida,

        nombre,

        precio: Number(precio),

        stock_total: Number(stock_total),

        stock_disponible: Number(stock_disponible),

        stock_minimo: Number(stock_minimo),

      });

      limpiar();

      cargarBebidas();

    } catch (error) {

      console.log(error);

    }

  };

  const eliminarBebida = async (id) => {

    if (!window.confirm("¿Eliminar bebida?")) return;

    try {

      await deleteBebida(id);

      cargarBebidas();

    } catch (error) {

      console.log(error);

    }

  };
    return (
    <div>

      <h2>Bebidas</h2>

      <hr />

      <h3>{editando ? "Editar Bebida" : "Nueva Bebida"}</h3>

      <input
        type="text"
        placeholder="Tipo de bebida"
        value={tipo_bebida}
        onChange={(e) => setTipoBebida(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Stock Total"
        value={stock_total}
        onChange={(e) => setStockTotal(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Stock Disponible"
        value={stock_disponible}
        onChange={(e) => setStockDisponible(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Stock Mínimo"
        value={stock_minimo}
        onChange={(e) => setStockMinimo(e.target.value)}
      />

      <br />
      <br />

      {editando ? (
        <button onClick={actualizarBebida}>
          Actualizar
        </button>
      ) : (
        <button onClick={guardarBebida}>
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

            <th>Tipo</th>

            <th>Nombre</th>

            <th>Precio</th>

            <th>Stock Total</th>

            <th>Stock Disponible</th>

            <th>Stock Mínimo</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {bebidas.map((bebida) => (

            <tr key={bebida.idbebida}>

              <td>{bebida.tipo_bebida}</td>

              <td>{bebida.nombre}</td>

              <td>{bebida.precio}</td>

              <td>{bebida.stock_total}</td>

              <td>{bebida.stock_disponible}</td>

              <td>{bebida.stock_minimo}</td>

              <td>

                <button
                  onClick={() => editarBebida(bebida)}
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarBebida(bebida.idbebida)}
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

export default Bebidas;