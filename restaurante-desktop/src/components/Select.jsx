import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  {
    id,
    label,
    error,
    helperText,
    required = false,
    className = "",
    children,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const messageId = `${selectId}-message`;
  const describedBy =
    [ariaDescribedBy, error || helperText ? messageId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const classes = ["rs-select", className].filter(Boolean).join(" ");

  return (
    <div className="rs-field">
      {label && (
        <label className="rs-field__label" htmlFor={selectId}>
          {label}
          {required && (
            <span className="rs-field__required" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={classes}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </select>
      {(error || helperText) && (
        <p
          id={messageId}
          className={`rs-field__message${error ? " rs-field__message--error" : ""}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export default Select;
