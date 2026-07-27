function EmptyState({
  title = "Sin resultados",
  message,
  icon,
  action,
  announce = false,
  className = "",
  role,
  "aria-live": ariaLive,
  ...props
}) {
  const classes = ["rs-state", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      role={role || (announce ? "status" : undefined)}
      aria-live={ariaLive || (announce ? "polite" : undefined)}
      {...props}
    >
      <div className="rs-state__content">
        {icon && (
          <span className="rs-state__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <h2 className="rs-state__title">{title}</h2>
        {message && <p className="rs-state__message">{message}</p>}
        {action}
      </div>
    </div>
  );
}

export default EmptyState;
