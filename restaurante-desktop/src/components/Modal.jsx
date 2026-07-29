import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import lockBodyScroll from "./bodyScrollLock";
import {
  isTopDismissableLayer,
  registerDismissableLayer,
} from "./dismissableLayer";
import getFocusableElements from "./focusableElements";

function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  className = "",
  tabIndex = -1,
  "aria-label": ariaLabel,
  ...props
}) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const modalTokenRef = useRef(Symbol("modal"));

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const token = modalTokenRef.current;
    const releaseScrollLock = lockBodyScroll();
    const unregisterLayer = registerDismissableLayer(token);
    previousFocusRef.current = document.activeElement;

    const dialog = dialogRef.current;
    const focusableElements = dialog ? getFocusableElements(dialog) : [];
    (focusableElements[0] || dialog)?.focus();

    const handleKeyDown = (event) => {
      if (!isTopDismissableLayer(token)) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const elements = getFocusableElements(dialogRef.current);
      if (elements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (
          activeElement === firstElement ||
          activeElement === dialogRef.current ||
          !dialogRef.current.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (
        activeElement === lastElement ||
        !dialogRef.current.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      const wasTopModal = isTopDismissableLayer(token);

      document.removeEventListener("keydown", handleKeyDown);
      unregisterLayer();
      releaseScrollLock();

      if (
        wasTopModal &&
        previousFocusRef.current?.isConnected &&
        typeof previousFocusRef.current.focus === "function"
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  const dialogClasses = [
    "rs-modal__dialog",
    `rs-modal__dialog--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <div className="rs-modal">
      <div
        className="rs-modal__overlay"
        aria-hidden="true"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <section
        {...props}
        ref={dialogRef}
        className={dialogClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel || "Ventana de diálogo"}
        tabIndex={tabIndex}
      >
        <header className="rs-modal__header">
          {title && (
            <h2 id={titleId} className="rs-modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="rs-modal__close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            {"\u00d7"}
          </button>
        </header>
        <div className="rs-modal__body">{children}</div>
        {footer && <footer className="rs-modal__footer">{footer}</footer>}
      </section>
    </div>,
    document.body,
  );
}

export default Modal;
