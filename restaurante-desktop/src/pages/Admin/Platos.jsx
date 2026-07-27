import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdRestaurantMenu, MdSave } from "react-icons/md";
import {
  getPlatos,
  createPlato,
  updatePlato,
  deletePlato,
} from "../../api/plato.api";
import { getCategorias } from "../../api/categoria.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Table from "../../components/Table";

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [idcategoria, setIdCategoria] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

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

  useEffect(() => {
    // Preserve the existing initial API loads.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarPlatos();
    cargarCategorias();
  }, []);

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

  const enviarFormulario = (event) => {
    event.preventDefault();
    if (editando) {
      actualizarPlato();
    } else {
      guardarPlato();
    }
  };

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Platos"
        description="Administra la oferta de platos y su clasificación."
      />

      <div className="rs-admin-work-area">
        <Card
          title={editando ? "Editar plato" : "Nuevo plato"}
          subtitle={
            editando
              ? "Actualiza los datos del plato seleccionado."
              : "Completa la información del nuevo plato."
          }
        >
          <form
            className="rs-admin-form"
            onSubmit={enviarFormulario}
            noValidate
          >
            <div className="rs-admin-form__grid rs-admin-form__grid--2">
              <Input
                type="text"
                label="Nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <Input
                type="number"
                label="Precio"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />

              <Input
                type="text"
                label="Descripción"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <Select
                label="Categoría"
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
              </Select>
            </div>

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
          title="Platos registrados"
          subtitle="Oferta disponible para la operación del restaurante."
          className={platos.length === 0 ? "rs-admin-empty-card" : ""}
        >
          {platos.length === 0 ? (
            <EmptyState
              icon={<MdRestaurantMenu />}
              title="No hay platos registrados"
              message="Los platos creados aparecerán en este listado."
            />
          ) : (
            <Table className="rs-admin-table rs-admin-table--medium">
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
                    <td className="rs-admin-cell--numeric">{plato.precio}</td>
                    <td>{plato.categoria.nombre}</td>
                    <td>
                      <div className="rs-admin-row-actions">
                        <Button
                          variant="secondary"
                          icon={<MdEdit />}
                          onClick={() => editarPlato(plato)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          icon={<MdDelete />}
                          onClick={() => eliminarPlato(plato.idplato)}
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

export default Platos;
