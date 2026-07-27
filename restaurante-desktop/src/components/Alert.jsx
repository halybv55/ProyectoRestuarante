function Alert({
  variant = "info",
  title,
  icon,
  children,
  className = "",
  role,
  ...props
}) {
  const classes = ["rs-alert", `rs-alert--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const alertRole = role || (variant === "danger" ? "alert" : "status");

  return (
    <div className={classes} role={alertRole} {...props}>
      {icon && (
        <span className="rs-alert__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="rs-alert__content">
        {title && <p className="rs-alert__title">{title}</p>}
        <div className="rs-alert__message">{children}</div>
      </div>
    </div>
  );
}

export default Alert;
