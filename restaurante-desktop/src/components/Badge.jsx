const supportedVariants = new Set([
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
]);

function Badge({
  variant = "neutral",
  children,
  className = "",
  ...props
}) {
  const safeVariant = supportedVariants.has(variant) ? variant : "neutral";
  const classes = ["rs-badge", `rs-badge--${safeVariant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export default Badge;
