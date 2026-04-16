function SummaryCard({ title, value, helperText }) {
  return (
    <div className="card summary-card">
      <span className="label">{title}</span>
      <strong>{value}</strong>
      <small>{helperText}</small>
    </div>
  );
}

export default SummaryCard;
