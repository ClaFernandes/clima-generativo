import './StatusMessages.css'

export function Loading() {
  return (
    <div className="status-message status-message--loading">
      <div className="status-message__spinner" />
      <p>Calibrando leitura...</p>
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="status-message status-message--error">
      <p>{message}</p>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="status-message status-message--empty">
      <p>Permita a localização no navegador ou busque uma cidade para ver o clima ganhar vida.</p>
    </div>
  )
}
