import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea(
  {
    id,
    label,
    error,
    helperText,
    required = false,
    className = "",
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const messageId = `${textareaId}-message`;
  const describedBy =
    [ariaDescribedBy, error || helperText ? messageId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const classes = ["rs-textarea", className].filter(Boolean).join(" ");

  return (
    <div className="rs-field">
      {label && (
        <label className="rs-field__label" htmlFor={textareaId}>
          {label}
          {required && (
            <span className="rs-field__required" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={classes}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        {...props}
      />
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

export default Textarea;
