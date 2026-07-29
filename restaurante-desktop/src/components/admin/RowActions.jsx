import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../Button";

function RowActions({
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  className = "",
  ...props
}) {
  const classes = ["rs-admin-row-actions", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {onEdit && (
        <Button
          type="button"
          variant="secondary"
          className="rs-admin-row-action"
          icon={<MdEdit />}
          title={editLabel}
          aria-label={editLabel}
          onClick={onEdit}
        >
          Editar
        </Button>
      )}
      {onDelete && (
        <Button
          type="button"
          variant="ghost"
          className="rs-admin-row-action rs-admin-action--danger"
          icon={<MdDelete />}
          title={deleteLabel}
          aria-label={deleteLabel}
          onClick={onDelete}
        >
          Eliminar
        </Button>
      )}
    </div>
  );
}

export default RowActions;
