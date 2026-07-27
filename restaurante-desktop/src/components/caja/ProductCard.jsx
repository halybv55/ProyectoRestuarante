import { MdAdd } from "react-icons/md";
import Badge from "../Badge";
import Button from "../Button";

function ProductCard({
    title,
    price,
    meta,
    badge,
    badgeVariant = "neutral",
    actionLabel = "Agregar",
    onAction,
    className = "",
    ...props
}) {
    const classes = ["rs-pos-product", className].filter(Boolean).join(" ");

    return (
        <article className={classes} {...props}>
            <div className="rs-pos-product__content">
                <div className="rs-pos-product__heading">
                    <h3>{title}</h3>
                    {badge && (
                        <Badge variant={badgeVariant}>
                            {badge}
                        </Badge>
                    )}
                </div>
                {meta && <p className="rs-pos-product__meta">{meta}</p>}
                <strong className="rs-pos-product__price">
                    {price}
                </strong>
            </div>
            <Button
                type="button"
                variant="secondary"
                icon={<MdAdd />}
                onClick={onAction}
                aria-label={`${actionLabel}: ${title}`}
            >
                {actionLabel}
            </Button>
        </article>
    );
}

export default ProductCard;
