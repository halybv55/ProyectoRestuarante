import { MdReceiptLong, MdTableRestaurant } from "react-icons/md";
import StatusBadge from "./StatusBadge";

function OrderTicket({
    code,
    table,
    product,
    quantity,
    status,
    actions,
    className = "",
    ...props
}) {
    const classes = ["rs-order-ticket", className].filter(Boolean).join(" ");

    return (
        <article className={classes} {...props}>
            <header className="rs-order-ticket__header">
                <div className="rs-order-ticket__identifier">
                    <span
                        className="rs-order-ticket__icon"
                        aria-hidden="true"
                    >
                        <MdReceiptLong />
                    </span>
                    <div>
                        <span>Pedido</span>
                        <strong>{code}</strong>
                    </div>
                </div>
                <StatusBadge status={status} />
            </header>

            <div className="rs-order-ticket__meta">
                <MdTableRestaurant aria-hidden="true" />
                <span>Mesa</span>
                <strong>{table}</strong>
            </div>

            <div className="rs-order-ticket__item">
                <div>
                    <span>Producto</span>
                    <strong>{product}</strong>
                </div>
                <div className="rs-order-ticket__quantity">
                    <span>Cantidad</span>
                    <strong>{quantity}</strong>
                </div>
            </div>

            {actions && (
                <footer className="rs-order-ticket__actions">
                    {actions}
                </footer>
            )}
        </article>
    );
}

export default OrderTicket;
