import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../contexts/AuthContext';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [slotCache, setSlotCache] = useState({ date: null, slots: [] });

  useEffect(() => {
    apiFetch('/api/bookings')
      .then(data => setBookings(data.bookings))
      .catch(() => {});
  }, []);

  async function addBooking(booking) {
    const data = await apiFetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
    setBookings(prev => [...prev, data.booking]);
    setSlotCache({ date: null, slots: [] });
  }

  const loadSlotsForDate = useCallback(async (date) => {
    if (slotCache.date === date) return slotCache.slots;
    const data = await apiFetch(`/api/bookings/date/${date}`);
    setSlotCache({ date, slots: data.bookings });
    return data.bookings;
  }, [slotCache.date]);

  function isSlotTaken(courtId, date, startTime) {
    return slotCache.slots.some(
      b => b.court_id === courtId && b.start_time === startTime
    );
  }

  return { bookings, addBooking, isSlotTaken, loadSlotsForDate };
}
