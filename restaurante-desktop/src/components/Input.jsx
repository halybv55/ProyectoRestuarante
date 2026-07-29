import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    id,
    label,
    error,
    helperText,
    required = false,
    icon,
    className = "",
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const describedBy =
    [ariaDescribedBy, error || helperText ? messageId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const inputClasses = [
    "rs-input",
    icon ? "rs-input--with-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rs-field">
      {label && (
        <label className="rs-field__label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="rs-field__required" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      )}
      <div className="rs-field__control">
        {icon && (
          <span className="rs-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          {...props}
        />
      </div>
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

export default Input;
