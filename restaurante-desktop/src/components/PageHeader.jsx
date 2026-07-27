function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className = "",
  ...props
}) {
  const classes = ["rs-page-header", className].filter(Boolean).join(" ");

  return (
    <header className={classes} {...props}>
      {breadcrumb && (
        <div className="rs-page-header__breadcrumb">{breadcrumb}</div>
      )}
      <div className="rs-page-header__main">
        <div className="rs-page-header__copy">
          <h1 className="rs-page-header__title">{title}</h1>
          {description && (
            <p className="rs-page-header__description">{description}</p>
          )}
        </div>
        {actions && <div className="rs-page-header__actions">{actions}</div>}
      </div>
    </header>
  );
}

export default PageHeader;
