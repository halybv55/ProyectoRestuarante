import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdCategory,
  MdDelete,
  MdDescription,
  MdEdit,
  MdRestaurantMenu,
  MdSave,
  MdTrendingUp,
} from "react-icons/md";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../../api/categoria.api";
import { getPlatos } from "../../api/plato.api";
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

const CATEGORY_SEARCH_KEYS = ["nombre", "descripcion"];
const CATEGORY_SORT_OPTIONS = [
  { value: "nombre:asc", label: "Nombre A–Z" },
  { value: "nombre:desc", label: "Nombre Z–A" },
  { value: "descripcion:asc", label: "Descripción A–Z" },
  { value: "descripcion:desc", label: "Descripción Z–A" },
];

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [platosResumen, setPlatosResumen] = useState(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

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
    totalItems,
    filteredTotal,
    totalPages,
    startIndex,
    endIndex,
  } = useClientTable({
    items: categorias,
    searchKeys: CATEGORY_SEARCH_KEYS,
    initialPageSize: 10,
    initialSortKey: "nombre",
    initialSortDirection: "asc",
  });

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

  useEffect(() => {
    let activo = true;

    const cargarPlatosParaResumen = async () => {
      try {
        const data = await getPlatos();

        if (activo) {
          setPlatosResumen(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    cargarPlatosParaResumen();

    return () => {
      activo = false;
    };
  }, []);

  const abrirNuevaCategoria = () => {
    limpiar();
    setModalAbierto(true);
  };

  const abrirEdicionCategoria = (categoria) => {
    editarCategoria(categoria);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    limpiar();
  };

  const cambiarOrden = (value) => {
    const [key, direction] = value.split(":");
    setSort(key, direction);
  };

  const categoriaEnEdicion = categorias.find(
    (categoria) => categoria.idcategoria === idEditar,
  );
  const sortValue = `${sortKey}:${sortDirection}`;
  const metricas = useMemo(() => {
    const categoryIds = new Set(
      categorias.map((categoria) => String(categoria.idcategoria)),
    );

    if (!Array.isArray(platosResumen)) {
      return {
        platosClasificados: "—",
        categoriasSinPlatos: "—",
        categoriaMasUtilizada: "Sin datos",
      };
    }

    const usosPorCategoria = new Map();
    let platosClasificados = 0;

    platosResumen.forEach((plato) => {
      const categoryId = plato?.categoria?.id;
      const normalizedId =
        categoryId === null || categoryId === undefined
          ? null
          : String(categoryId);

      if (!normalizedId || !categoryIds.has(normalizedId)) {
        return;
      }

      platosClasificados += 1;
      usosPorCategoria.set(
        normalizedId,
        (usosPorCategoria.get(normalizedId) || 0) + 1,
      );
    });

    const categoriasSinPlatos = categorias.filter(
      (categoria) =>
        !usosPorCategoria.has(String(categoria.idcategoria)),
    ).length;
    const categoriaMasUtilizada = categorias.reduce(
      (seleccionada, categoria) => {
        const usos =
          usosPorCategoria.get(String(categoria.idcategoria)) || 0;

        if (usos > seleccionada.usos) {
          return { nombre: categoria.nombre, usos };
        }

        return seleccionada;
      },
      { nombre: "Sin datos", usos: 0 },
    );

    return {
      platosClasificados,
      categoriasSinPlatos,
      categoriaMasUtilizada:
        categoriaMasUtilizada.usos > 0
          ? categoriaMasUtilizada.nombre
          : "Sin datos",
    };
  }, [categorias, platosResumen]);
  const showResultsSummary = Boolean(query) || totalPages > 1;

  return (
    <div className="rs-admin-page">
      <PageHeader
        title="Categorías"
        description="Organiza los grupos utilizados para clasificar los platos."
        actions={
          <Button
            type="button"
            icon={<MdAdd />}
            onClick={abrirNuevaCategoria}
          >
            Nueva categoría
          </Button>
        }
      />

      <section
        className="rs-admin-category-summary"
        aria-label="Resumen de categorías"
      >
        <StatCard
          label="Total categorías"
          value={totalItems}
          icon={
            <span className="rs-admin-stat-icon rs-admin-stat-icon--primary">
              <MdCategory />
            </span>
          }
          className="rs-admin-category-stat"
        />
        <StatCard
          label="Platos clasificados"
          value={metricas.platosClasificados}
          icon={
            <span className="rs-admin-stat-icon rs-admin-stat-icon--info">
              <MdRestaurantMenu />
            </span>
          }
          className="rs-admin-category-stat"
        />
        <StatCard
          label="Categorías sin platos"
          value={metricas.categoriasSinPlatos}
          icon={
            <span className="rs-admin-stat-icon rs-admin-stat-icon--warning">
              <MdDescription />
            </span>
          }
          className="rs-admin-category-stat"
        />
        <StatCard
          label="Categoría más utilizada"
          value={metricas.categoriaMasUtilizada}
          icon={
            <span className="rs-admin-stat-icon rs-admin-stat-icon--success">
              <MdTrendingUp />
            </span>
          }
          className="rs-admin-category-stat rs-admin-category-stat--text"
        />
      </section>

      <Card
        title="Categorías registradas"
        subtitle="Gestiona la clasificación disponible para el menú."
        className="rs-admin-category-data-card"
      >
        <DataToolbar
          searchValue={query}
          onSearchChange={setQuery}
          searchPlaceholder="Buscar por nombre o descripción"
          sortValue={sortValue}
          onSortChange={cambiarOrden}
          sortOptions={CATEGORY_SORT_OPTIONS}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          pageSizeOptions={totalItems > 5 ? [5, 10, 20] : []}
        />

        {totalItems === 0 ? (
          <EmptyState
            icon={<MdCategory />}
            title="No hay categorías registradas"
            message="Las categorías creadas aparecerán en este listado."
          />
        ) : filteredTotal === 0 ? (
          <EmptyState
            icon={<MdCategory />}
            title="Sin coincidencias"
            message={`No encontramos categorías para “${query}”.`}
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
              className="rs-admin-table rs-admin-category-table"
              aria-label="Categorías registradas"
            >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((categoria) => {
                  const isEditing =
                    editando && categoria.idcategoria === idEditar;

                  return (
                    <tr
                      key={categoria.idcategoria}
                      className={
                        isEditing ? "rs-admin-row--editing" : undefined
                      }
                    >
                      <td className="rs-admin-category-name">
                        {categoria.nombre}
                      </td>
                      <td>
                        <span
                          className="rs-admin-category-description"
                          title={categoria.descripcion}
                        >
                          {categoria.descripcion}
                        </span>
                      </td>
                      <td>
                        <div className="rs-admin-row-actions">
                          <Button
                            variant="secondary"
                            className="rs-admin-row-action"
                            icon={<MdEdit />}
                            title={`Editar ${categoria.nombre}`}
                            aria-label={`Editar categoría ${categoria.nombre}`}
                            onClick={() =>
                              abrirEdicionCategoria(categoria)
                            }
                          >
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            className="rs-admin-row-action rs-admin-action--danger"
                            icon={<MdDelete />}
                            title={`Eliminar ${categoria.nombre}`}
                            aria-label={`Eliminar categoría ${categoria.nombre}`}
                            onClick={() =>
                              eliminarCategoria(categoria.idcategoria)
                            }
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            {showResultsSummary && (
              <ResultsSummary
                start={startIndex}
                end={endIndex}
                total={totalItems}
                filteredTotal={filteredTotal}
                itemLabel="categorías"
              />
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              aria-label="Páginas de categorías"
            />
          </>
        )}
      </Card>

      <Modal
        open={modalAbierto}
        title={editando ? "Editar categoría" : "Nueva categoría"}
        onClose={cerrarModal}
        size="sm"
        className="rs-admin-category-modal"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={cerrarModal}
            >
              {editando ? "Cancelar edición" : "Cancelar"}
            </Button>
            <Button
              type="submit"
              form="rs-category-form"
              icon={<MdSave />}
            >
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </>
        }
      >
        <div className="rs-admin-category-modal__intro">
          <p>
            {editando
              ? `Editando “${categoriaEnEdicion?.nombre || "categoría seleccionada"}”.`
              : "Registra una categoría para organizar el menú."}
          </p>
        </div>

        <form
          id="rs-category-form"
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

          <Textarea
            label="Descripción"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
          />
        </form>
      </Modal>
    </div>
  );
}

export default Categorias;
