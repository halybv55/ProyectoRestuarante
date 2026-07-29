import Card from "./Card";

function StatCard({
  label,
  value,
  meta,
  icon,
  className = "",
  ...props
}) {
  return (
    <Card
      title={label}
      actions={icon}
      className={`rs-stat-card ${className}`.trim()}
      {...props}
    >
      <p className="rs-stat-card__value">{value}</p>
      {meta && <p className="rs-stat-card__meta">{meta}</p>}
    </Card>
  );
}

export default StatCard;
