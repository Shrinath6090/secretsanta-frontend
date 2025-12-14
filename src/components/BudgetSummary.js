export default function BudgetSummary({ data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  return (
    <div className="budget-summary">
      <h3 className="budget-title">Budget Summary</h3>

      <div className="budget-total">
        Total Nominations: <strong>{total}</strong>
      </div>

      {Object.entries(data).map(([key, value]) => {
        const percent = total ? Math.round((value / total) * 100) : 0;

        return (
          <div key={key} className="budget-row">
            <div className="budget-header">
              <span className="budget-label">{key}</span>
              <span className="budget-count">{value}</span>
            </div>

            <div className="budget-bar">
              <div
                className="budget-progress"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
