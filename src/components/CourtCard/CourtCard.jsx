import styles from './CourtCard.module.css';

export default function CourtCard({ court, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{court.name}</span>
        <span className={styles.badge}>{court.surface}</span>
        <span className={styles.badge}>{court.indoor ? 'Indoor' : 'Outdoor'}</span>
      </div>
      {children}
    </div>
  );
}
