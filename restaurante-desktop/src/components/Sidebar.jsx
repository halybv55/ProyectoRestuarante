import { useEffect, useRef } from "react";
import lockBodyScroll from "./bodyScrollLock";
import {
  isTopDismissableLayer,
  registerDismissableLayer,
} from "./dismissableLayer";
import getFocusableElements from "./focusableElements";

function Sidebar({
  open = false,
  onClose,
  mobile = false,
  header,
  footer,
  children,
  className = "",
  "aria-label": ariaLabel = "Navegación lateral",
  role,
  tabIndex,
  ...props
}) {
  const closeButtonRef = useRef(null);
  const sidebarRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const layerTokenRef = useRef(Symbol("sidebar"));

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!mobile || !open) return undefined;

    const releaseScrollLock = lockBodyScroll();
    const token = layerTokenRef.current;
    const unregisterLayer = registerDismissableLayer(token);
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (!isTopDismissableLayer(token)) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements(sidebarRef.current);
      if (elements.length === 0) {
        event.preventDefault();
        sidebarRef.current?.focus();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (
          activeElement === firstElement ||
          activeElement === sidebarRef.current ||
          !sidebarRef.current?.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (
        activeElement === lastElement ||
        !sidebarRef.current?.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      const wasTopLayer = isTopDismissableLayer(token);

      document.removeEventListener("keydown", handleKeyDown);
      unregisterLayer();
      releaseScrollLock();

      if (
        wasTopLayer &&
        previousFocusRef.current?.isConnected &&
        typeof previousFocusRef.current.focus === "function"
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [mobile, open]);

  const classes = [
    "rs-sidebar",
    mobile ? "rs-sidebar--mobile" : "",
    mobile && open ? "rs-sidebar--open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {mobile && open && (
        <button
          type="button"
          className="rs-sidebar-overlay"
          onClick={onClose}
          aria-label="Cerrar navegación lateral"
        />
      )}
      <aside
        {...props}
        ref={sidebarRef}
        className={classes}
        role={mobile ? "dialog" : role}
        aria-label={ariaLabel}
        aria-modal={mobile && open ? "true" : undefined}
        aria-hidden={mobile && !open ? "true" : undefined}
        inert={mobile && !open ? true : undefined}
        tabIndex={mobile ? -1 : tabIndex}
      >
        {(header || mobile) && (
          <div className="rs-sidebar__header">
            {header && <div className="rs-sidebar__heading">{header}</div>}
            {mobile && (
              <button
                ref={closeButtonRef}
                type="button"
                className="rs-sidebar__close"
                onClick={onClose}
                aria-label="Cerrar navegación lateral"
              >
                {"\u00d7"}
              </button>
            )}
          </div>
        )}
        <nav
          className="rs-sidebar__content"
          aria-label={`${ariaLabel} - opciones`}
        >
          {children}
        </nav>
        {footer && <div className="rs-sidebar__footer">{footer}</div>}
      </aside>
    </>
  );
}

export default Sidebar;
