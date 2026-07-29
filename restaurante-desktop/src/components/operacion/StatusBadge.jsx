import Badge from "../Badge";

const statusVariants = {
    PENDIENTE: "warning",
    PREPARANDO: "info",
    "En preparación": "info",
    LISTO: "success",
    Listo: "success",
    PARCIAL: "warning",
    ENTREGADO: "neutral",
    Entregado: "neutral"
};

function StatusBadge({ status, className = "", ...props }) {
    const variant = statusVariants[status] || "neutral";

    return (
        <Badge
            variant={variant}
            className={className}
            {...props}
        >
            {status}
        </Badge>
    );
}

export default StatusBadge;
