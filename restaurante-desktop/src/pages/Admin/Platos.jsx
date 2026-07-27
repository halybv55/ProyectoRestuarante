import { useEffect, useState } from "react";

import {
  getPlatos,
  createPlato,
  updatePlato,
  deletePlato,
} from "../../api/plato.api";

import { getCategorias } from "../../api/categoria.api";

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [idcategoria, setIdCategoria] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarPlatos();
    cargarCategorias();
  }, []);

  const cargarPlatos = async () => {
    try {
      const data = await getPlatos();

      setPlatos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();

      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const limpiar = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setIdCategoria("");

    setEditando(false);
    setIdEditar(null);
  };

  const guardarPlato = async () => {
    try {
      await createPlato({
        nombre,
        descripcion,
        precio: Number(precio),
        idcategoria: Number(idcategoria),
      });

      limpiar();

      cargarPlatos();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Error al registrar el plato."
      );
    }
  };

  const editarPlato = (plato) => {
    setEditando(true);

    setIdEditar(plato.idplato);

    setNombre(plato.nombre);
    setDescripcion(plato.descripcion);
    setPrecio(plato.precio);
    setIdCategoria(plato.categoria.id);
  };

  const actualizarPlato = async () => {
    try {
      await updatePlato(idEditar, {
        nombre,
        descripcion,
        precio: Number(precio),
        idcategoria: Number(idcategoria),
      });

      limpiar();

      cargarPlatos();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPlato = async (id) => {
    if (!window.confirm("¿Eliminar plato?")) return;

    try {
      await deletePlato(id);

      cargarPlatos();
    } catch (error) {
      console.log(error);
    }
  };

    return (
    <div>

      <h2>Platos</h2>

      <hr />

      <h3>{editando ? "Editar Plato" : "Nuevo Plato"}</h3>

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

      <br />
      <br />

      <select
        value={idcategoria}
        onChange={(e) => setIdCategoria(e.target.value)}
      >
        <option value="">Seleccione una categoría</option>

        {categorias.map((categoria) => (
          <option
            key={categoria.idcategoria}
            value={categoria.idcategoria}
          >
            {categoria.nombre}
          </option>
        ))}

      </select>

      <br />
      <br />

      {editando ? (
        <button onClick={actualizarPlato}>
          Actualizar
        </button>
      ) : (
        <button onClick={guardarPlato}>
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

            <th>Nombre</th>

            <th>Descripción</th>

            <th>Precio</th>

            <th>Categoría</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {platos.map((plato) => (

            <tr key={plato.idplato}>

              <td>{plato.nombre}</td>

              <td>{plato.descripcion}</td>

              <td>{plato.precio}</td>

              <td>{plato.categoria.nombre}</td>

              <td>

                <button
                  onClick={() => editarPlato(plato)}
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarPlato(plato.idplato)}
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

export default Platos;