import styles from './BookingList.module.css';

export default function BookingList({ bookings }) {
  if (bookings.length === 0) {
    return <p className={styles.empty}>No bookings yet.</p>;
  }

  const sorted = [...bookings].sort((a, b) => a.date.localeCompare(b.date) || (a.start_time || a.startTime || '').localeCompare(b.start_time || b.startTime || ''));

  const byDate = sorted.reduce((acc, b) => {
    (acc[b.date] = acc[b.date] || []).push(b);
    return acc;
  }, {});

  return (
    <div className={styles.list}>
      {Object.entries(byDate).map(([date, items]) => (
        <div key={date} className={styles.group}>
          <div className={styles.date}>
            {new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
              weekday: 'short', month: 'short', day: 'numeric',
            })}
          </div>
          {items.map(b => (
            <div key={b.id} className={styles.item}>
              <span className={styles.court}>{b.court_name || b.courtName}</span>
              <span className={styles.time}>{b.start_time || b.startTime}–{b.end_time || b.endTime}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
