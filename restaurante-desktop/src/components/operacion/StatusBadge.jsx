import Badge from "../Badge";

const statusVariants = {
    PENDIENTE: "warning",
    "En preparación": "info",
    LISTO: "success",
    Listo: "success",
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
