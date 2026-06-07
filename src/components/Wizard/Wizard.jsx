import { useState } from 'react';
import StepDate from '../steps/StepDate/StepDate';
import StepCourt from '../steps/StepCourt/StepCourt';
import StepConfirm from '../steps/StepConfirm/StepConfirm';
import styles from './Wizard.module.css';

export default function Wizard({ addBooking, isSlotTaken, loadSlotsForDate }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  async function handleDateSelect(date) {
    setSelectedDate(date);
    await loadSlotsForDate(date);
    setStep(2);
  }

  function handleSlotSelect({ court, slot }) {
    setSelectedCourt(court);
    setSelectedSlot(slot);
    setStep(3);
  }

  async function handleConfirm() {
    setError('');
    try {
      await addBooking({
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
      const msg = `Booked ${selectedCourt.name} on ${selectedDate} at ${selectedSlot.label}`;
      setStep(1);
      setSelectedDate(null);
      setSelectedCourt(null);
      setSelectedSlot(null);
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message);
    }
  }

  const steps = ['Date', 'Court & Time', 'Confirm'];

  return (
    <div className={styles.wizard}>
      <div className={styles.stepper}>
        {steps.map((label, i) => (
          <div key={label} className={`${styles.stepItem} ${step === i + 1 ? styles.active : ''} ${step > i + 1 ? styles.done : ''}`}>
            <span className={styles.circle}>{step > i + 1 ? '✓' : i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
            {i < steps.length - 1 && <span className={styles.line} />}
          </div>
        ))}
      </div>

      {successMsg && <div className={styles.success}>{successMsg}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.body}>
        {step === 1 && <StepDate onDateSelect={handleDateSelect} />}
        {step === 2 && (
          <StepCourt
            date={selectedDate}
            isSlotTaken={isSlotTaken}
            onSlotSelect={handleSlotSelect}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepConfirm
            date={selectedDate}
            court={selectedCourt}
            slot={selectedSlot}
            onConfirm={handleConfirm}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}
