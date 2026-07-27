function Card({
  title,
  subtitle,
  actions,
  children,
  className = "",
  ...props
}) {
  const classes = ["rs-card", className].filter(Boolean).join(" ");
  const hasHeader = title || subtitle || actions;

  return (
    <section className={classes} {...props}>
      {hasHeader && (
        <header className="rs-card__header">
          <div className="rs-card__heading">
            {title && <h2 className="rs-card__title">{title}</h2>}
            {subtitle && <p className="rs-card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="rs-card__actions">{actions}</div>}
        </header>
      )}
      <div className="rs-card__body">{children}</div>
    </section>
  );
}

export default Card;
