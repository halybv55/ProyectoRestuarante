import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdInventory,
  MdLocalDrink,
  MdMoney,
  MdSave,
  MdWarning,
} from "react-icons/md";
import {
  getBebidas,
  createBebida,
  updateBebida,
  deleteBebida,
} from "../../api/bebida.api";
import AdminMetricGrid from "../../components/admin/AdminMetricGrid";
import DataToolbar from "../../components/admin/DataToolbar";
import Pagination from "../../components/admin/Pagination";
import ResultsSummary from "../../components/admin/ResultsSummary";
import RowActions from "../../components/admin/RowActions";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import StatCard from "../../components/StatCard";
import Table from "../../components/Table";
import useClientTable from "../../hooks/useClientTable";

const DRINK_SEARCH_KEYS = ["nombre", "tipo_bebida"];
const DRINK_SORT_OPTIONS = [
  { value: "nombre:asc", label: "Nombre A–Z" },
  { value: "nombre:desc", label: "Nombre Z–A" },
  { value: "precio:asc", label: "Precio menor a mayor" },
  { value: "precio:desc", label: "Precio mayor a menor" },
  { value: "stock_disponible:asc", label: "Menor stock disponible" },
  { value: "stock_disponible:desc", label: "Mayor stock disponible" },
];

function formatNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("es-BO", { maximumFractionDigits: 2 })
    : value;
}

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
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [stockFiltro, setStockFiltro] = useState("");

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

  const tiposDisponibles = useMemo(
    () =>
      [...new Set(bebidas.map((bebida) => bebida.tipo_bebida))]
        .filter(Boolean)
        .sort((left, right) =>
          String(left).localeCompare(String(right), "es", {
            sensitivity: "base",
          }),
        ),
    [bebidas],
  );
  const bebidasFiltradas = useMemo(
    () =>
      bebidas.filter((bebida) => {
        if (tipoFiltro && bebida.tipo_bebida !== tipoFiltro) {
          return false;
        }

        const stock = Number(bebida.stock_disponible);

        if (stockFiltro === "con-stock") {
          return Number.isFinite(stock) && stock > 0;
        }

        if (stockFiltro === "sin-stock") {
          return Number.isFinite(stock) && stock === 0;
        }

        return true;
      }),
    [bebidas, stockFiltro, tipoFiltro],
  );
  const {
    query,
    setQuery,
    sortKey,
    sortDirection,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    paginatedItems,
    filteredTotal,
    totalPages,
    startIndex,
    endIndex,
  } = useClientTable({
    items: bebidasFiltradas,
    searchKeys: DRINK_SEARCH_KEYS,
    initialPageSize: 10,
    initialSortKey: "nombre",
    initialSortDirection: "asc",
  });
  const metricas = useMemo(() => {
    const stocks = bebidas
      .map((bebida) => Number(bebida.stock_disponible))
      .filter(Number.isFinite);
    const precios = bebidas
      .map((bebida) => Number(bebida.precio))
      .filter(Number.isFinite);
    const promedio =
      precios.length > 0
        ? precios.reduce((total, value) => total + value, 0) /
          precios.length
        : null;

    return {
      conStock: stocks.filter((stock) => stock > 0).length,
      sinStock: stocks.filter((stock) => stock === 0).length,
      precioPromedio:
        promedio === null ? "Sin datos" : formatNumber(promedio),
    };
  }, [bebidas]);

  const cambiarOrden = (value) => {
    const [key, direction] = value.split(":");
    setSort(key, direction);
  };

  const cambiarFiltro = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const limpiarFiltros = () => {
    setQuery("");
    setTipoFiltro("");
    setStockFiltro("");
    setPage(1);
  };

  const abrirNuevaBebida = () => {
    limpiar();
    setModalAbierto(true);
  };

  const abrirEdicionBebida = (bebida) => {
    editarBebida(bebida);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    limpiar();
  };

  const bebidaEnEdicion = bebidas.find(
    (bebida) => bebida.idbebida === idEditar,
  );
  const sortValue = `${sortKey}:${sortDirection}`;
  const hasActiveView = Boolean(query || tipoFiltro || stockFiltro);
  const showResultsSummary = hasActiveView || totalPages > 1;

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Bebidas"
        description="Gestiona precios y existencias de las bebidas disponibles."
        actions={
          <Button
            type="button"
            icon={<MdAdd />}
            onClick={abrirNuevaBebida}
          >
            Nueva bebida
          </Button>
        }
      />

      <AdminMetricGrid aria-label="Resumen de bebidas">
        <StatCard
          label="Total de bebidas"
          value={bebidas.length}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--primary"><MdLocalDrink /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Con stock"
          value={metricas.conStock}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--success"><MdInventory /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Sin stock"
          value={metricas.sinStock}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--warning"><MdWarning /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Precio promedio"
          value={metricas.precioPromedio}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--info"><MdMoney /></span>}
          className="rs-admin-metric-card"
        />
      </AdminMetricGrid>

      <Card
        title="Bebidas registradas"
        subtitle="Inventario configurado para la operación."
        className="rs-admin-data-card"
      >
        <DataToolbar
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Buscar por nombre o tipo"
          sortValue={sortValue}
          onSortChange={cambiarOrden}
          sortOptions={DRINK_SORT_OPTIONS}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          pageSizeOptions={bebidas.length > 5 ? [5, 10, 20] : []}
          actions={
            <>
              <Select
                label="Tipo"
                value={tipoFiltro}
                onChange={(event) =>
                  cambiarFiltro(setTipoFiltro, event.target.value)
                }
              >
                <option value="">Todos</option>
                {tiposDisponibles.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Select>
              <Select
                label="Stock"
                value={stockFiltro}
                onChange={(event) =>
                  cambiarFiltro(setStockFiltro, event.target.value)
                }
              >
                <option value="">Todo</option>
                <option value="con-stock">Con stock</option>
                <option value="sin-stock">Sin stock</option>
              </Select>
            </>
          }
        />

        {bebidas.length === 0 ? (
          <EmptyState
            icon={<MdLocalDrink />}
            title="No hay bebidas registradas"
            message="Las bebidas creadas aparecerán en este listado."
          />
        ) : filteredTotal === 0 ? (
          <EmptyState
            icon={<MdLocalDrink />}
            title="Sin coincidencias"
            message="No encontramos bebidas con los criterios seleccionados."
            action={
              <Button
                type="button"
                variant="secondary"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </Button>
            }
            announce
          />
        ) : (
          <>
            <Table
              className="rs-admin-table rs-admin-entity-table rs-admin-table--wide"
              aria-label="Bebidas registradas"
            >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock total</th>
                  <th scope="col">Disponible</th>
                  <th scope="col">Mínimo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((bebida) => (
                  <tr
                    key={bebida.idbebida}
                    className={
                      editando && bebida.idbebida === idEditar
                        ? "rs-admin-row--editing"
                        : undefined
                    }
                  >
                    <td className="rs-admin-entity-name">{bebida.nombre}</td>
                    <td>{bebida.tipo_bebida}</td>
                    <td className="rs-admin-cell--numeric">
                      {formatNumber(bebida.precio)}
                    </td>
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
                      <RowActions
                        editLabel={`Editar bebida ${bebida.nombre}`}
                        deleteLabel={`Eliminar bebida ${bebida.nombre}`}
                        onEdit={() => abrirEdicionBebida(bebida)}
                        onDelete={() => eliminarBebida(bebida.idbebida)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {showResultsSummary && (
              <ResultsSummary
                start={startIndex}
                end={endIndex}
                total={bebidas.length}
                filteredTotal={filteredTotal}
                itemLabel="bebidas"
              />
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              aria-label="Páginas de bebidas"
            />
          </>
        )}
      </Card>

      <Modal
        open={modalAbierto}
        title={editando ? "Editar bebida" : "Nueva bebida"}
        onClose={cerrarModal}
        size="lg"
        className="rs-admin-entity-modal"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={cerrarModal}>
              {editando ? "Cancelar edición" : "Cancelar"}
            </Button>
            <Button type="submit" form="rs-drink-form" icon={<MdSave />}>
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </>
        }
      >
        <p className="rs-admin-modal-intro">
          {editando
            ? `Editando “${bebidaEnEdicion?.nombre || "bebida seleccionada"}”.`
            : "Registra una bebida y sus niveles de stock."}
        </p>
        <form
          id="rs-drink-form"
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
        </form>
      </Modal>
    </div>
  );
}

export default Bebidas;
