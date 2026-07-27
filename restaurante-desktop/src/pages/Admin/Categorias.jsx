import { useEffect, useState } from "react";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../api/categoria.api";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarCategoria = async () => {
    try {
      await createCategoria({
        nombre,
        descripcion,
      });

      limpiar();
      cargarCategorias();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Error al guardar la categoría."
      );
    }
  };

  const editarCategoria = (categoria) => {
    setEditando(true);
    setIdEditar(categoria.idcategoria);

    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
  };

  const actualizarCategoria = async () => {
    try {
      await updateCategoria(idEditar, {
        nombre,
        descripcion,
      });

      limpiar();
      cargarCategorias();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;

    try {
      await deleteCategoria(id);

      cargarCategorias();
    } catch (error) {
      console.log(error);
    }
  };

  const limpiar = () => {
    setNombre("");
    setDescripcion("");

    setEditando(false);
    setIdEditar(null);
  };

  return (
    <div>
      <h2>Categorías</h2>

      <hr />

      <h3>
        {editando ? "Editar Categoría" : "Nueva Categoría"}
      </h3>

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

      {editando ? (
        <button onClick={actualizarCategoria}>
          Actualizar
        </button>
      ) : (
        <button onClick={guardarCategoria}>
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
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.idcategoria}>
              <td>{categoria.nombre}</td>

              <td>{categoria.descripcion}</td>

              <td>
                <button
                  onClick={() => editarCategoria(categoria)}
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    eliminarCategoria(categoria.idcategoria)
                  }
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

export default Categorias;