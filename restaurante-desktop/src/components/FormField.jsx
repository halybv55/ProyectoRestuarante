import { useId } from "react";

function FormField({
  id,
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const generatedId = useId();
  const usesRenderProp = typeof children === "function";
  const baseId = id || generatedId;
  const controlId = htmlFor || id || (usesRenderProp ? baseId : undefined);
  const helperId = helperText ? `${baseId}-helper` : undefined;
  const errorId = error ? `${baseId}-error` : undefined;
  const describedBy =
    [ariaDescribedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
  const classes = ["rs-field", className].filter(Boolean).join(" ");
  const controlProps = {
    id: controlId,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className={classes} {...props}>
      {label && (
        <label className="rs-field__label" htmlFor={controlId}>
          {label}
          {required && (
            <span className="rs-field__required" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      )}
      {usesRenderProp ? children(controlProps) : children}
      {helperText && (
        <p id={helperId} className="rs-field__message">
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="rs-field__message rs-field__message--error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
