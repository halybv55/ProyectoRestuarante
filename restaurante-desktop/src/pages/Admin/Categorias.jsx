import { useEffect, useState } from "react";
import { MdCategory, MdDelete, MdEdit, MdSave } from "react-icons/md";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../api/categoria.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Preserve the existing initial API load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarCategorias();
  }, []);

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

  const enviarFormulario = (event) => {
    event.preventDefault();
    if (editando) {
      actualizarCategoria();
    } else {
      guardarCategoria();
    }
  };

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Categorías"
        description="Organiza los grupos utilizados para clasificar los platos."
      />

      <div className="rs-admin-work-area">
        <Card
          title={editando ? "Editar categoría" : "Nueva categoría"}
          subtitle={
            editando
              ? "Actualiza la información seleccionada."
              : "Registra una categoría para el menú."
          }
        >
          <form
            className="rs-admin-form"
            onSubmit={enviarFormulario}
            noValidate
          >
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

            <div className="rs-admin-form__actions">
              <Button type="submit" icon={<MdSave />}>
                {editando ? "Actualizar" : "Guardar"}
              </Button>
              <Button type="button" variant="secondary" onClick={limpiar}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>

        <Card
          title="Categorías registradas"
          subtitle="Listado disponible para la clasificación del menú."
          className={categorias.length === 0 ? "rs-admin-empty-card" : ""}
        >
          {categorias.length === 0 ? (
            <EmptyState
              icon={<MdCategory />}
              title="No hay categorías registradas"
              message="Las categorías creadas aparecerán en este listado."
            />
          ) : (
            <Table className="rs-admin-table">
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
                      <div className="rs-admin-row-actions">
                        <Button
                          variant="secondary"
                          icon={<MdEdit />}
                          onClick={() => editarCategoria(categoria)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          icon={<MdDelete />}
                          onClick={() =>
                            eliminarCategoria(categoria.idcategoria)
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

export default Categorias;
