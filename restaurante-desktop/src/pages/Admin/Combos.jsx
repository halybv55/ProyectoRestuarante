import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdDescription,
  MdMoney,
  MdRestaurantMenu,
  MdSave,
  MdTrendingUp,
  MdViewModule,
} from "react-icons/md";
import { getPlatos } from "../../api/plato.api";
import { createCombo, getCombos } from "../../api/combo.api";
import AdminMetricGrid from "../../components/admin/AdminMetricGrid";
import DataToolbar from "../../components/admin/DataToolbar";
import Pagination from "../../components/admin/Pagination";
import ResultsSummary from "../../components/admin/ResultsSummary";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import Table from "../../components/Table";
import Textarea from "../../components/Textarea";
import useClientTable from "../../hooks/useClientTable";

const COMBO_SEARCH_KEYS = ["nombre", "descripcion"];
const COMBO_SORT_OPTIONS = [
  { value: "nombre:asc", label: "Nombre A–Z" },
  { value: "nombre:desc", label: "Nombre Z–A" },
  { value: "precio:asc", label: "Precio menor a mayor" },
  { value: "precio:desc", label: "Precio mayor a menor" },
];

function formatNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("es-BO", { maximumFractionDigits: 2 })
    : value;
}

function Combos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const [platos, setPlatos] = useState([]);

  const [seleccionados, setSeleccionados] = useState([]);
  const [combos, setCombos] = useState([]);
  const [constructorAbierto, setConstructorAbierto] = useState(false);

  const cargarPlatos = async () => {
    try {
      const data = await getPlatos();

      setPlatos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Preserve the existing initial API load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarPlatos();
  }, []);

  const cambiarSeleccion = (plato) => {
    const existe = seleccionados.find(
      p => p.idplato === plato.idplato
    );

    if (existe) {
      setSeleccionados(
        seleccionados.filter(
          p => p.idplato !== plato.idplato
        )
      );

      return;
    }

    setSeleccionados([
      ...seleccionados,
      {
        idplato: plato.idplato,
        cantidad: 1
      }
    ]);
  };

  const cambiarCantidad = (id, cantidad) => {
    setSeleccionados(
      seleccionados.map((p) =>
        p.idplato === id
          ? {
            ...p,
            cantidad: Number(cantidad)
          }
          : p
      )
    );
  };

  const guardarCombo = async () => {
    try {
      await createCombo({
        nombre,
        descripcion,
        precio: Number(precio),
        platos: seleccionados
      });

      alert("Combo registrado.");

      setNombre("");
      setDescripcion("");
      setPrecio("");

      setSeleccionados([]);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarFormulario = (event) => {
    event.preventDefault();
    guardarCombo();
  };

  useEffect(() => {
    let activo = true;

    const cargarCombosDisponibles = async () => {
      try {
        const data = await getCombos();

        if (activo) {
          setCombos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    cargarCombosDisponibles();

    return () => {
      activo = false;
    };
  }, []);

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
    items: combos,
    searchKeys: COMBO_SEARCH_KEYS,
    initialPageSize: 10,
    initialSortKey: "nombre",
    initialSortDirection: "asc",
  });
  const metricas = useMemo(() => {
    const precios = combos
      .map((combo) => Number(combo.precio))
      .filter(Number.isFinite);
    const promedio =
      precios.length > 0
        ? precios.reduce((total, value) => total + value, 0) /
          precios.length
        : null;
    const mayorPrecio = combos.reduce((seleccionado, combo) => {
      const value = Number(combo.precio);

      return Number.isFinite(value) && value > seleccionado.precio
        ? { nombre: combo.nombre, precio: value }
        : seleccionado;
    }, { nombre: "Sin datos", precio: Number.NEGATIVE_INFINITY });

    return {
      conDescripcion: combos.filter(
        (combo) => String(combo.descripcion || "").trim().length > 0,
      ).length,
      precioPromedio:
        promedio === null ? "Sin datos" : formatNumber(promedio),
      mayorPrecio:
        mayorPrecio.precio === Number.NEGATIVE_INFINITY
          ? "Sin datos"
          : mayorPrecio.nombre,
      mayorPrecioMeta:
        mayorPrecio.precio === Number.NEGATIVE_INFINITY
          ? null
          : `Precio: ${formatNumber(mayorPrecio.precio)}`,
    };
  }, [combos]);
  const seleccionadosDetalle = useMemo(
    () =>
      seleccionados.map((seleccionado) => ({
        ...seleccionado,
        plato: platos.find(
          (plato) => plato.idplato === seleccionado.idplato,
        ),
      })),
    [platos, seleccionados],
  );

  const cambiarOrden = (value) => {
    const [key, direction] = value.split(":");
    setSort(key, direction);
  };

  const limpiarConstructor = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setSeleccionados([]);
  };

  const abrirConstructor = () => {
    limpiarConstructor();
    setConstructorAbierto(true);
  };

  const cerrarConstructor = () => {
    setConstructorAbierto(false);
    limpiarConstructor();
  };

  const sortValue = `${sortKey}:${sortDirection}`;
  const showResultsSummary = Boolean(query) || totalPages > 1;

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Combos"
        description="Crea combinaciones de platos respetando sus cantidades."
        actions={
          <Button
            type="button"
            icon={<MdAdd />}
            onClick={abrirConstructor}
          >
            Nuevo combo
          </Button>
        }
      />

      <AdminMetricGrid aria-label="Resumen de combos disponibles">
        <StatCard
          label="Combos disponibles"
          value={combos.length}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--primary"><MdViewModule /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Con descripción"
          value={metricas.conDescripcion}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--info"><MdDescription /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Precio promedio"
          value={metricas.precioPromedio}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--success"><MdMoney /></span>}
          className="rs-admin-metric-card"
        />
        <StatCard
          label="Mayor precio"
          value={metricas.mayorPrecio}
          meta={metricas.mayorPrecioMeta}
          icon={<span className="rs-admin-stat-icon rs-admin-stat-icon--warning"><MdTrendingUp /></span>}
          className="rs-admin-metric-card rs-admin-metric-card--text"
        />
      </AdminMetricGrid>

      <Card
        title="Combos del menú activo"
        subtitle="Combinaciones disponibles actualmente para la operación."
        className="rs-admin-data-card"
      >
        <DataToolbar
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Buscar por nombre o descripción"
          sortValue={sortValue}
          onSortChange={cambiarOrden}
          sortOptions={COMBO_SORT_OPTIONS}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          pageSizeOptions={combos.length > 5 ? [5, 10, 20] : []}
        />

        {combos.length === 0 ? (
          <EmptyState
            icon={<MdViewModule />}
            title="No hay combos disponibles"
            message="No existen combos asociados al menú activo."
          />
        ) : filteredTotal === 0 ? (
          <EmptyState
            icon={<MdViewModule />}
            title="Sin coincidencias"
            message="No encontramos combos para la búsqueda actual."
            action={
              <Button
                type="button"
                variant="secondary"
                onClick={() => setQuery("")}
              >
                Limpiar búsqueda
              </Button>
            }
            announce
          />
        ) : (
          <>
            <Table
              className="rs-admin-table rs-admin-entity-table"
              aria-label="Combos del menú activo"
            >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((combo) => (
                  <tr key={combo.idcombo}>
                    <td className="rs-admin-entity-name">{combo.nombre}</td>
                    <td>
                      <span
                        className="rs-admin-clamped-text"
                        title={combo.descripcion}
                      >
                        {combo.descripcion}
                      </span>
                    </td>
                    <td className="rs-admin-cell--numeric">
                      {formatNumber(combo.precio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {showResultsSummary && (
              <ResultsSummary
                start={startIndex}
                end={endIndex}
                total={combos.length}
                filteredTotal={filteredTotal}
                itemLabel="combos"
              />
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              aria-label="Páginas de combos"
            />
          </>
        )}
      </Card>

      <Modal
        open={constructorAbierto}
        title="Nuevo combo"
        onClose={cerrarConstructor}
        size="xl"
        className="rs-admin-combo-modal"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={cerrarConstructor}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="rs-combo-form"
              icon={<MdSave />}
            >
              Guardar combo
            </Button>
          </>
        }
      >
        <form
          id="rs-combo-form"
          className="rs-admin-form"
          onSubmit={enviarFormulario}
          noValidate
        >
          <div className="rs-admin-form__grid rs-admin-form__grid--3">
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
            <Textarea
              label="Descripción"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
            />
          </div>

          <div className="rs-admin-combo-builder">
            <section
              className="rs-admin-combo-builder__catalog"
              aria-labelledby="rs-combo-catalog-title"
            >
              <div className="rs-admin-combo-builder__heading">
                <div>
                  <h3 id="rs-combo-catalog-title">Catálogo de platos</h3>
                  <p>Selecciona los platos que formarán el combo.</p>
                </div>
                <span className="rs-admin-combo-builder__count">
                  {platos.length} disponibles
                </span>
              </div>

              {platos.length === 0 ? (
                <EmptyState
                  icon={<MdRestaurantMenu />}
                  title="No hay platos disponibles"
                  message="Los platos registrados aparecerán para su selección."
                />
              ) : (
                <Table className="rs-admin-table rs-admin-combo-table">
                  <thead>
                    <tr>
                      <th scope="col">Agregar</th>
                      <th scope="col">Plato</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platos.map((plato) => {
                      const seleccionado = seleccionados.find(
                        (item) => item.idplato === plato.idplato,
                      );

                      return (
                        <tr key={plato.idplato}>
                          <td>
                            <label className="rs-admin-selection">
                              <input
                                type="checkbox"
                                checked={!!seleccionado}
                                onChange={() => cambiarSeleccion(plato)}
                              />
                              <span className="rs-sr-only">
                                Agregar {plato.nombre}
                              </span>
                            </label>
                          </td>
                          <td className="rs-admin-entity-name">
                            {plato.nombre}
                          </td>
                          <td className="rs-admin-cell--numeric">
                            {formatNumber(plato.precio)}
                          </td>
                          <td>
                            {seleccionado && (
                              <input
                                type="number"
                                min="1"
                                className="rs-admin-quantity"
                                aria-label={`Cantidad de ${plato.nombre}`}
                                value={seleccionado.cantidad}
                                onChange={(e) =>
                                  cambiarCantidad(
                                    plato.idplato,
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </section>

            <aside
              className="rs-admin-combo-builder__summary"
              aria-labelledby="rs-combo-summary-title"
            >
              <div className="rs-admin-combo-builder__heading">
                <div>
                  <h3 id="rs-combo-summary-title">Resumen del combo</h3>
                  <p>Platos y cantidades seleccionadas.</p>
                </div>
                <span className="rs-admin-combo-builder__count">
                  {seleccionados.length} seleccionados
                </span>
              </div>

              {seleccionadosDetalle.length === 0 ? (
                <EmptyState
                  icon={<MdRestaurantMenu />}
                  title="Sin platos seleccionados"
                  message="Marca al menos un plato en el catálogo."
                />
              ) : (
                <ul className="rs-admin-combo-selection-list">
                  {seleccionadosDetalle.map((item) => (
                    <li key={item.idplato}>
                      <span>{item.plato?.nombre || `Plato ${item.idplato}`}</span>
                      <strong>{item.cantidad}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Combos;
