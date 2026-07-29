function AdminMetricGrid({
  children,
  className = "",
  "aria-label": ariaLabel = "Resumen",
  ...props
}) {
  const classes = ["rs-admin-metric-grid", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </section>
  );
}

export default AdminMetricGrid;
