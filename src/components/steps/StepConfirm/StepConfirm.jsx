import styles from './StepConfirm.module.css';

export default function StepConfirm({ date, court, slot, onConfirm, onBack }) {
  function formatDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Confirm your booking</h2>
      <div className={styles.summary}>
        <Row label="Court" value={`${court.name} — ${court.surface}, ${court.indoor ? 'Indoor' : 'Outdoor'}`} />
        <Row label="Date" value={formatDate(date)} />
        <Row label="Time" value={`${slot.label} – ${slot.endTime}`} />
      </div>
      <div className={styles.actions}>
        <button className={styles.back} onClick={onBack}>← Back</button>
        <button className={styles.confirm} onClick={onConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
