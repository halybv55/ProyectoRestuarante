import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Button from "../Button";

function createPageItems(currentPage, totalPages, siblingCount) {
  const visibleSlots = siblingCount * 2 + 5;

  if (totalPages <= visibleSlots) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;
  const items = [1];

  if (showLeftEllipsis) {
    items.push("left-ellipsis");
  } else {
    for (let page = 2; page < leftSibling; page += 1) {
      items.push(page);
    }
  }

  for (let page = leftSibling; page <= rightSibling; page += 1) {
    items.push(page);
  }

  if (showRightEllipsis) {
    items.push("right-ellipsis");
  } else {
    for (let page = rightSibling + 1; page < totalPages; page += 1) {
      items.push(page);
    }
  }

  items.push(totalPages);
  return items;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
  "aria-label": ariaLabel = "Paginación",
  ...props
}) {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const safeSiblingCount = Math.max(0, siblingCount);
  const pageItems = createPageItems(
    safeCurrentPage,
    totalPages,
    safeSiblingCount,
  );
  const classes = ["rs-admin-pagination", className]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes} aria-label={ariaLabel} {...props}>
      <p className="rs-admin-pagination__status" aria-live="polite">
        Página {safeCurrentPage} de {totalPages}
      </p>

      <div className="rs-admin-pagination__controls">
        <Button
          type="button"
          variant="secondary"
          icon={<MdChevronLeft />}
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange?.(safeCurrentPage - 1)}
        >
          Anterior
        </Button>

        <div className="rs-admin-pagination__pages">
          {pageItems.map((item) =>
            typeof item === "number" ? (
              <Button
                key={item}
                type="button"
                variant={item === safeCurrentPage ? "primary" : "ghost"}
                className="rs-admin-pagination__page"
                aria-label={`Ir a la página ${item}`}
                aria-current={item === safeCurrentPage ? "page" : undefined}
                onClick={() => onPageChange?.(item)}
              >
                {item}
              </Button>
            ) : (
              <span
                key={item}
                className="rs-admin-pagination__ellipsis"
                aria-hidden="true"
              >
                …
              </span>
            ),
          )}
        </div>

        <Button
          type="button"
          variant="secondary"
          icon={<MdChevronRight />}
          disabled={safeCurrentPage === totalPages}
          onClick={() => onPageChange?.(safeCurrentPage + 1)}
        >
          Siguiente
        </Button>
      </div>
    </nav>
  );
}

export default Pagination;
