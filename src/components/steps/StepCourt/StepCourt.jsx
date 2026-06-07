import courts from '../../../data/courts';
import { generateSlots } from '../../../utils/slots';
import CourtCard from '../../CourtCard/CourtCard';
import SlotGrid from '../../SlotGrid/SlotGrid';
import styles from './StepCourt.module.css';

export default function StepCourt({ date, isSlotTaken, onSlotSelect, onBack }) {
  function formatDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <button className={styles.back} onClick={onBack}>← Back</button>
        <h2 className={styles.heading}>Pick a court &amp; time — {formatDate(date)}</h2>
      </div>
      <div className={styles.courts}>
        {courts.map(court => {
          const slots = generateSlots(court.id, date);
          const takenSlots = new Set(
            slots.filter(s => isSlotTaken(court.id, date, s.startTime)).map(s => s.startTime)
          );
          return (
            <CourtCard key={court.id} court={court}>
              <SlotGrid
                slots={slots}
                takenSlots={takenSlots}
                onSelect={slot => onSlotSelect({ court, slot })}
              />
            </CourtCard>
          );
        })}
      </div>
    </div>
  );
}
