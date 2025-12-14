export default function Popup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>{message}</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
