function LoadingState({
  message = "Cargando...",
  className = "",
  ...props
}) {
  const classes = ["rs-state", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="status" aria-live="polite" {...props}>
      <div className="rs-loading">
        <span className="rs-loading__spinner" aria-hidden="true" />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default LoadingState;
