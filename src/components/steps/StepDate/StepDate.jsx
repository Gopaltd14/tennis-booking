import styles from './StepDate.module.css';

function isoToday() {
  return new Date().toISOString().split('T')[0];
}

function isoPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export default function StepDate({ onDateSelect }) {
  function handleChange(e) {
    if (e.target.value) onDateSelect(e.target.value);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Choose a date</h2>
      <input
        type="date"
        className={styles.input}
        min={isoToday()}
        max={isoPlus(30)}
        onChange={handleChange}
      />
    </div>
  );
}
