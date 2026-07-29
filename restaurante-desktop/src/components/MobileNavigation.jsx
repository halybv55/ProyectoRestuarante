function MobileNavigation({
  children,
  reserveSpace = true,
  className = "",
  "aria-label": ariaLabel = "Navegación móvil",
  ...props
}) {
  const classes = ["rs-mobile-nav", className].filter(Boolean).join(" ");

  return (
    <>
      {reserveSpace && (
        <div className="rs-mobile-nav-spacer" aria-hidden="true" />
      )}
      <nav className={classes} aria-label={ariaLabel} {...props}>
        {children}
      </nav>
    </>
  );
}

export default MobileNavigation;
