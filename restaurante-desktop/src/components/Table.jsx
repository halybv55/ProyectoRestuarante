function Table({
  children,
  responsive = true,
  empty = false,
  emptyMessage = "No hay datos disponibles.",
  className = "",
  ...props
}) {
  const regionClasses = [
    "rs-table-region",
    responsive ? "rs-table-region--responsive" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const tableClasses = ["rs-table", className].filter(Boolean).join(" ");

  if (empty) {
    return (
      <div className="rs-state" role="status">
        <p className="rs-state__message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={regionClasses}
      role={responsive ? "region" : undefined}
      tabIndex={responsive ? 0 : undefined}
      aria-label={responsive ? "Tabla con desplazamiento horizontal" : undefined}
    >
      <table className={tableClasses} {...props}>
        {children}
      </table>
    </div>
  );
}

export default Table;
