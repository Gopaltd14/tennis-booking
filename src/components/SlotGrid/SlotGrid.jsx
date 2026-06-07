import styles from './SlotGrid.module.css';

export default function SlotGrid({ slots, takenSlots, onSelect }) {
  return (
    <div className={styles.grid}>
      {slots.map(slot => {
        const taken = takenSlots.has(slot.startTime);
        return (
          <button
            key={slot.id}
            className={`${styles.slot} ${taken ? styles.taken : styles.available}`}
            disabled={taken}
            onClick={() => onSelect(slot)}
            title={taken ? 'Already booked' : slot.label}
          >
            {slot.label}
          </button>
        );
      })}
    </div>
  );
}
