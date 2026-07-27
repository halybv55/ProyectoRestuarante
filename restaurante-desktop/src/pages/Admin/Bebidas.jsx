import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdLocalDrink, MdSave } from "react-icons/md";
import {
  getBebidas,
  createBebida,
  updateBebida,
  deleteBebida,
} from "../../api/bebida.api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

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

  const cargarBebidas = async () => {
    try {
      const response = await getBebidas();

      setBebidas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Preserve the existing initial API load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarBebidas();
  }, []);

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

  const enviarFormulario = (event) => {
    event.preventDefault();
    if (editando) {
      actualizarBebida();
    } else {
      guardarBebida();
    }
  };

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Bebidas"
        description="Gestiona precios y existencias de las bebidas disponibles."
      />

      <div className="rs-admin-work-area">
        <Card
          title={editando ? "Editar bebida" : "Nueva bebida"}
          subtitle={
            editando
              ? "Actualiza la bebida seleccionada."
              : "Registra una bebida y sus niveles de stock."
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
                label="Tipo de bebida"
                placeholder="Tipo de bebida"
                value={tipo_bebida}
                onChange={(e) => setTipoBebida(e.target.value)}
              />

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
                type="number"
                label="Stock total"
                placeholder="Stock Total"
                value={stock_total}
                onChange={(e) => setStockTotal(e.target.value)}
              />

              <Input
                type="number"
                label="Stock disponible"
                placeholder="Stock Disponible"
                value={stock_disponible}
                onChange={(e) => setStockDisponible(e.target.value)}
              />

              <Input
                type="number"
                label="Stock mínimo"
                placeholder="Stock Mínimo"
                value={stock_minimo}
                onChange={(e) => setStockMinimo(e.target.value)}
              />
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
          title="Bebidas registradas"
          subtitle="Inventario configurado para la operación."
          className={bebidas.length === 0 ? "rs-admin-empty-card" : ""}
        >
          {bebidas.length === 0 ? (
            <EmptyState
              icon={<MdLocalDrink />}
              title="No hay bebidas registradas"
              message="Las bebidas creadas aparecerán en este listado."
            />
          ) : (
            <Table className="rs-admin-table rs-admin-table--wide">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock total</th>
                  <th>Stock disponible</th>
                  <th>Stock mínimo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bebidas.map((bebida) => (
                  <tr key={bebida.idbebida}>
                    <td>{bebida.tipo_bebida}</td>
                    <td>{bebida.nombre}</td>
                    <td className="rs-admin-cell--numeric">{bebida.precio}</td>
                    <td className="rs-admin-cell--numeric">
                      {bebida.stock_total}
                    </td>
                    <td className="rs-admin-cell--numeric">
                      {bebida.stock_disponible}
                    </td>
                    <td className="rs-admin-cell--numeric">
                      {bebida.stock_minimo}
                    </td>
                    <td>
                      <div className="rs-admin-row-actions">
                        <Button
                          variant="secondary"
                          icon={<MdEdit />}
                          onClick={() => editarBebida(bebida)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          icon={<MdDelete />}
                          onClick={() => eliminarBebida(bebida.idbebida)}
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

export default Bebidas;
