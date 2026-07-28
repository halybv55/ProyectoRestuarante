import { MdClose, MdSearch } from "react-icons/md";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

function DataToolbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Buscar",
  sortValue = "",
  onSortChange,
  sortOptions = [],
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20],
  actions,
  children,
  className = "",
  "aria-label": ariaLabel = "Herramientas del listado",
  ...props
}) {
  const classes = ["rs-admin-data-toolbar", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} aria-label={ariaLabel} {...props}>
      <div className="rs-admin-data-toolbar__search">
        <Input
          type="search"
          label="Buscar"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          icon={<MdSearch />}
          autoComplete="off"
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            icon={<MdClose />}
            onClick={() => onSearchChange?.("")}
            aria-label="Limpiar búsqueda"
            className="rs-admin-data-toolbar__clear"
          >
            Limpiar
          </Button>
        )}
      </div>

      {sortOptions.length > 0 && (
        <Select
          label="Ordenar por"
          value={sortValue}
          onChange={(event) => onSortChange?.(event.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}

      {pageSizeOptions.length > 0 && (
        <Select
          label="Filas por página"
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange?.(Number(event.target.value))
          }
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      )}

      {(actions || children) && (
        <div className="rs-admin-data-toolbar__actions">
          {actions}
          {children}
        </div>
      )}
    </section>
  );
}

export default DataToolbar;
