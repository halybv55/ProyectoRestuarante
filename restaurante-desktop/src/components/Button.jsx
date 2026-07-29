import { forwardRef } from "react";

// Icon-only buttons must provide an aria-label.
const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
    fullWidth = false,
    type = "button",
    className = "",
    children,
    ...props
  },
  ref,
) {
  const classes = [
    "rs-button",
    `rs-button--${variant}`,
    size !== "md" ? `rs-button--${size}` : "",
    fullWidth ? "rs-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="rs-button__spinner" aria-hidden="true" />
      ) : (
        icon && (
          <span className="rs-button__icon" aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span>{children}</span>
    </button>
  );
});

export default Button;
