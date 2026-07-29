function ResultsSummary({
  start,
  end,
  total,
  filteredTotal = total,
  itemLabel = "resultados",
  className = "",
  ...props
}) {
  const classes = ["rs-admin-results-summary", className]
    .filter(Boolean)
    .join(" ");
  const hasFilter = filteredTotal !== total;

  return (
    <p className={classes} aria-live="polite" {...props}>
      Mostrando {start}–{end} de {filteredTotal} {itemLabel}
      {hasFilter && ` (${total} en total)`}
    </p>
  );
}

export default ResultsSummary;
