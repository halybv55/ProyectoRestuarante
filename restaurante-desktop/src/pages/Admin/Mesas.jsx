import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdEventSeat,
  MdGroups,
  MdSave,
  MdTableRestaurant,
} from "react-icons/md";
import {
  getMesas,
  createMesa,
  updateMesa,
  deleteMesa
} from "../../api/mesa.api";
import AdminMetricGrid from "../../components/admin/AdminMetricGrid";
import DataToolbar from "../../components/admin/DataToolbar";
import Pagination from "../../components/admin/Pagination";
import ResultsSummary from "../../components/admin/ResultsSummary";
import RowActions from "../../components/admin/RowActions";
import Badge from "../../components/Badge";
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

const TABLE_SEARCH_KEYS = ["numero"];
const TABLE_SORT_OPTIONS = [
  { value: "numero:asc", label: "Número ascendente" },
  { value: "numero:desc", label: "Número descendente" },
  { value: "capacidad:asc", label: "Menor capacidad" },
  { value: "capacidad:desc", label: "Mayor capacidad" },
];

function Mesas() {
  const [mesas, setMesas] = useState([]);

  const [numero, setNumero] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [disponible, setDisponible] = useState(true);

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const cargarMesas = async () => {
    try {
      const response = await getMesas();

      setMesas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Preserve the existing initial API load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarMesas();
  }, []);

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

  const enviarFormulario = (event) => {
    event.preventDefault();
    if (editando) {
      actualizarMesa();
    } else {
      guardarMesa();
    }
  };

  const mesasFiltradas = useMemo(
    () =>
      mesas.filter((mesa) => {
        if (estadoFiltro === "disponible") {
          return mesa.disponible === true;
        }

        if (estadoFiltro === "ocupada") {
          return mesa.disponible === false;
        }

        return true;
      }),
    [estadoFiltro, mesas],
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
    items: mesasFiltradas,
    searchKeys: TABLE_SEARCH_KEYS,
    initialPageSize: 10,
    initialSortKey: "numero",
    initialSortDirection: "asc",
  });
  const metricas = useMemo(
    () => ({
      disponibles: mesas.filter((mesa) => mesa.disponible === true).length,
      ocupadas: mesas.filter((mesa) => mesa.disponible === false).length,
      capacidadTotal: mesas.reduce((total, mesa) => {
        const value = Number(mesa.capacidad);

        return Number.isFinite(value) ? total + value : total;
      }, 0),
    }),
    [mesas],
  );

  const cambiarOrden = (value) => {
    const [key, direction] = value.split(":");
    setSort(key, direction);
  };

  const cambiarEstadoFiltro = (value) => {
    setEstadoFiltro(value);
    setPage(1);
  };

  const abrirNuevaMesa = () => {
    limpiar();
    setModalAbierto(true);
  };

  const abrirEdicionMesa = (mesa) => {
    editarMesa(mesa);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    limpiar();
  };

  const mesaEnEdicion = mesas.find((mesa) => mesa.idmesa === idEditar);
  const sortValue = `${sortKey}:${sortDirection}`;
  const hasActiveView = Boolean(query || estadoFiltro);
  const showResultsSummary = hasActiveView || totalPages > 1;

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Mesas"
        description="Configura las mesas existentes y su disponibilidad."
        actions={
          <Button type="button" icon={<MdAdd />} onClick={abrirNuevaMesa}>
            Nueva mesa
          </Button>
        }
      />

      <AdminMetricGrid aria-label="Resumen de mesas">
        <StatCard
          label="Total de mesas"
          value={mesas.length}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--primary"><MdTableRestaurant /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Disponibles"
          value={metricas.disponibles}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--success"><MdEventSeat /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Ocupadas"
          value={metricas.ocupadas}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--warning"><MdEventSeat /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Capacidad total"
          value={metricas.capacidadTotal}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--info"><MdGroups /></span>}
          className="rs-admin-metric-card"
        />
      </AdminMetricGrid>

      <Card
        title="Mesas registradas"
        subtitle="Configuración actual del salón."
        className="rs-admin-data-card"
      >
        <DataToolbar
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Buscar por número"
          sortValue={sortValue}
          onSortChange={cambiarOrden}
          sortOptions={TABLE_SORT_OPTIONS}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          pageSizeOptions={mesas.length > 5 ? [5, 10, 20] : []}
          actions={
            <Select
              label="Estado"
              value={estadoFiltro}
              onChange={(event) =>
                cambiarEstadoFiltro(event.target.value)
              }
            >
              <option value="">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
            </Select>
          }
        />

        {mesas.length === 0 ? (
          <EmptyState
            icon={<MdTableRestaurant />}
            title="No hay mesas registradas"
            message="Las mesas creadas aparecerán en este listado."
          />
        ) : filteredTotal === 0 ? (
          <EmptyState
            icon={<MdTableRestaurant />}
            title="Sin coincidencias"
            message="No encontramos mesas con los criterios seleccionados."
            action={
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  cambiarEstadoFiltro("");
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
              className="rs-admin-table rs-admin-entity-table"
              aria-label="Mesas registradas"
            >
              <thead>
                <tr>
                  <th scope="col">Número</th>
                  <th scope="col">Capacidad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((mesa) => (
                  <tr
                    key={mesa.idmesa}
                    className={
                      editando && mesa.idmesa === idEditar
                        ? "rs-admin-row--editing"
                        : undefined
                    }
                  >
                    <td className="rs-admin-cell--numeric rs-admin-entity-name">
                      {mesa.numero}
                    </td>
                    <td className="rs-admin-cell--numeric">
                      {mesa.capacidad}
                    </td>
                    <td>
                      <Badge variant={mesa.disponible ? "success" : "warning"}>
                        {mesa.disponible ? "Disponible" : "Ocupada"}
                      </Badge>
                    </td>
                    <td>
                      <RowActions
                        editLabel={`Editar mesa ${mesa.numero}`}
                        deleteLabel={`Eliminar mesa ${mesa.numero}`}
                        onEdit={() => abrirEdicionMesa(mesa)}
                        onDelete={() => eliminarMesa(mesa.idmesa)}
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
                total={mesas.length}
                filteredTotal={filteredTotal}
                itemLabel="mesas"
              />
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              aria-label="Páginas de mesas"
            />
          </>
        )}
      </Card>

      <Modal
        open={modalAbierto}
        title={editando ? "Editar mesa" : "Nueva mesa"}
        onClose={cerrarModal}
        size="sm"
        className="rs-admin-entity-modal"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={cerrarModal}>
              {editando ? "Cancelar edición" : "Cancelar"}
            </Button>
            <Button type="submit" form="rs-table-form" icon={<MdSave />}>
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </>
        }
      >
        <p className="rs-admin-modal-intro">
          {editando
            ? `Editando mesa ${mesaEnEdicion?.numero || "seleccionada"}.`
            : "Registra una mesa para la operación."}
        </p>
        <form
          id="rs-table-form"
          className="rs-admin-form"
          onSubmit={enviarFormulario}
          noValidate
        >
          <Input
            type="number"
            label="Número"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <Input
            type="number"
            label="Capacidad"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
          <Select
            label="Estado"
            value={disponible ? "true" : "false"}
            onChange={(e) => setDisponible(e.target.value === "true")}
          >
            <option value="true">Disponible</option>
            <option value="false">Ocupada</option>
          </Select>
        </form>
      </Modal>
    </div>
  );
}

export default Mesas;
