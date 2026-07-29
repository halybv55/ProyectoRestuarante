import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdCategory,
  MdPayments,
  MdRestaurantMenu,
  MdSave,
  MdTrendingUp,
} from "react-icons/md";
import {
  getPlatos,
  createPlato,
  updatePlato,
  deletePlato,
} from "../../api/plato.api";
import { getCategorias } from "../../api/categoria.api";
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
import Textarea from "../../components/Textarea";
import useClientTable from "../../hooks/useClientTable";

const PLATE_SEARCH_KEYS = ["nombre", "descripcion"];
const PLATE_SORT_OPTIONS = [
  { value: "nombre:asc", label: "Nombre A–Z" },
  { value: "nombre:desc", label: "Nombre Z–A" },
  { value: "precio:asc", label: "Precio menor a mayor" },
  { value: "precio:desc", label: "Precio mayor a menor" },
  { value: "categoriaNombre:asc", label: "Categoría A–Z" },
  { value: "categoriaNombre:desc", label: "Categoría Z–A" },
];

function formatNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("es-BO", { maximumFractionDigits: 2 })
    : value;
}

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [idcategoria, setIdCategoria] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

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

  const platosFiltrados = useMemo(
    () =>
      platos
        .filter(
          (plato) =>
            !categoriaFiltro ||
            String(plato?.categoria?.id) === categoriaFiltro,
        )
        .map((plato) => ({
          ...plato,
          categoriaNombre: plato?.categoria?.nombre || "",
        })),
    [categoriaFiltro, platos],
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
    items: platosFiltrados,
    searchKeys: PLATE_SEARCH_KEYS,
    initialPageSize: 10,
    initialSortKey: "nombre",
    initialSortDirection: "asc",
  });
  const metricas = useMemo(() => {
    const precios = platos
      .map((plato) => Number(plato.precio))
      .filter(Number.isFinite);
    const categoriasUtilizadas = new Set(
      platos
        .map((plato) => plato?.categoria?.id)
        .filter((id) => id !== null && id !== undefined)
        .map(String),
    ).size;
    const precioPromedio =
      precios.length > 0
        ? precios.reduce((total, value) => total + value, 0) /
          precios.length
        : null;
    const platoMayorPrecio = platos.reduce((seleccionado, plato) => {
      const value = Number(plato.precio);

      return Number.isFinite(value) && value > seleccionado.precio
        ? { nombre: plato.nombre, precio: value }
        : seleccionado;
    }, { nombre: "Sin datos", precio: Number.NEGATIVE_INFINITY });

    return {
      categoriasUtilizadas,
      precioPromedio:
        precioPromedio === null ? "Sin datos" : formatNumber(precioPromedio),
      platoMayorPrecio:
        platoMayorPrecio.precio === Number.NEGATIVE_INFINITY
          ? "Sin datos"
          : platoMayorPrecio.nombre,
      platoMayorPrecioMeta:
        platoMayorPrecio.precio === Number.NEGATIVE_INFINITY
          ? null
          : `Precio: ${formatNumber(platoMayorPrecio.precio)}`,
    };
  }, [platos]);

  const cambiarOrden = (value) => {
    const [key, direction] = value.split(":");
    setSort(key, direction);
  };

  const cambiarCategoriaFiltro = (value) => {
    setCategoriaFiltro(value);
    setPage(1);
  };

  const abrirNuevoPlato = () => {
    limpiar();
    setModalAbierto(true);
  };

  const abrirEdicionPlato = (plato) => {
    editarPlato(plato);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    limpiar();
  };

  const platoEnEdicion = platos.find(
    (plato) => plato.idplato === idEditar,
  );
  const sortValue = `${sortKey}:${sortDirection}`;
  const hasActiveView = Boolean(query || categoriaFiltro);
  const showResultsSummary = hasActiveView || totalPages > 1;

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Platos"
        description="Administra la oferta de platos y su clasificación."
        actions={
          <Button type="button" icon={<MdAdd />} onClick={abrirNuevoPlato}>
            Nuevo plato
          </Button>
        }
      />

      <AdminMetricGrid aria-label="Resumen de platos">
        <StatCard
          label="Total de platos"
          value={platos.length}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--primary"><MdRestaurantMenu /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Categorías utilizadas"
          value={metricas.categoriasUtilizadas}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--info"><MdCategory /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Precio promedio"
          value={metricas.precioPromedio}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--success"><MdPayments /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Mayor precio"
          value={metricas.platoMayorPrecio}
          meta={metricas.platoMayorPrecioMeta}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--warning"><MdTrendingUp /></span>}
          className="rs-admin-metric-card rs-admin-metric-card--text"
        />
      </AdminMetricGrid>

      <Card
        title="Platos registrados"
        subtitle="Oferta disponible para la operación del restaurante."
        className="rs-admin-data-card"
      >
        <DataToolbar
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Buscar por nombre o descripción"
          sortValue={sortValue}
          onSortChange={cambiarOrden}
          sortOptions={PLATE_SORT_OPTIONS}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          pageSizeOptions={platos.length > 5 ? [5, 10, 20] : []}
          actions={
            <Select
              label="Categoría"
              value={categoriaFiltro}
              onChange={(event) =>
                cambiarCategoriaFiltro(event.target.value)
              }
            >
              <option value="">Todas</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idcategoria}
                  value={String(categoria.idcategoria)}
                >
                  {categoria.nombre}
                </option>
              ))}
            </Select>
          }
        />

        {platos.length === 0 ? (
          <EmptyState
            icon={<MdRestaurantMenu />}
            title="No hay platos registrados"
            message="Los platos creados aparecerán en este listado."
          />
        ) : filteredTotal === 0 ? (
          <EmptyState
            icon={<MdRestaurantMenu />}
            title="Sin coincidencias"
            message="No encontramos platos con los criterios seleccionados."
            action={
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  cambiarCategoriaFiltro("");
                }}
              >
                Limpiar filtros
              </Button>
            }
            announce
          />
        ) : (
          <>
            <Table
              className="rs-admin-table rs-admin-entity-table rs-admin-table--medium"
              aria-label="Platos registrados"
            >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((plato) => (
                  <tr
                    key={plato.idplato}
                    className={
                      editando && plato.idplato === idEditar
                        ? "rs-admin-row--editing"
                        : undefined
                    }
                  >
                    <td className="rs-admin-entity-name">{plato.nombre}</td>
                    <td>{plato.categoriaNombre}</td>
                    <td className="rs-admin-cell--numeric">
                      {formatNumber(plato.precio)}
                    </td>
                    <td>
                      <span
                        className="rs-admin-clamped-text"
                        title={plato.descripcion}
                      >
                        {plato.descripcion}
                      </span>
                    </td>
                    <td>
                      <RowActions
                        editLabel={`Editar plato ${plato.nombre}`}
                        deleteLabel={`Eliminar plato ${plato.nombre}`}
                        onEdit={() => abrirEdicionPlato(plato)}
                        onDelete={() => eliminarPlato(plato.idplato)}
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
                total={platos.length}
                filteredTotal={filteredTotal}
                itemLabel="platos"
              />
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              aria-label="Páginas de platos"
            />
          </>
        )}
      </Card>

      <Modal
        open={modalAbierto}
        title={editando ? "Editar plato" : "Nuevo plato"}
        onClose={cerrarModal}
        size="md"
        className="rs-admin-entity-modal"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={cerrarModal}>
              {editando ? "Cancelar edición" : "Cancelar"}
            </Button>
            <Button type="submit" form="rs-plate-form" icon={<MdSave />}>
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </>
        }
      >
        <p className="rs-admin-modal-intro">
          {editando
            ? `Editando “${platoEnEdicion?.nombre || "plato seleccionado"}”.`
            : "Completa la información del nuevo plato."}
        </p>
        <form
          id="rs-plate-form"
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
            <Textarea
              label="Descripción"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Platos;
