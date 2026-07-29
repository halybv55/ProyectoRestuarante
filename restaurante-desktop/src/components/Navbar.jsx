function Navbar({
  brand,
  actions,
  children,
  className = "",
  "aria-label": ariaLabel = "Navegacion principal",
  ...props
}) {
  const classes = ["rs-navbar", className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label={ariaLabel} {...props}>
      <div className="rs-navbar__inner">
        {brand && <div className="rs-navbar__brand">{brand}</div>}
        <div className="rs-navbar__content">{children}</div>
        {actions && <div className="rs-navbar__actions">{actions}</div>}
      </div>
    </nav>
  );
}

export default Navbar;
