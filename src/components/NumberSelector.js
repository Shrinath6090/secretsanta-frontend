export default function NumberSelector({ numbers, selected, onSelect }) {
  return (
    <div className="number-grid">
      {numbers.length === 0 && (
        <p className="warning">No numbers available</p>
      )}

      {numbers.map(num => (
        <button
          key={num}
          className={selected === num ? "active" : ""}
          onClick={() => onSelect(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
