import { Router } from 'express';
import sql from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const rows = await sql`
      SELECT id, court_id, court_name, date, start_time, end_time, booked_at
      FROM bookings WHERE user_id = ${req.userId}
      ORDER BY date, start_time
    `;
    res.json({ bookings: rows });
  } catch (err) {
    console.error('List bookings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/date/:date', requireAuth, async (req, res) => {
  try {
    const rows = await sql`
      SELECT court_id, start_time FROM bookings WHERE date = ${req.params.date}
    `;
    res.json({ bookings: rows });
  } catch (err) {
    console.error('Date bookings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  const { courtId, courtName, date, startTime, endTime } = req.body;
  if (!courtId || !courtName || !date || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const rows = await sql`
      INSERT INTO bookings (user_id, court_id, court_name, date, start_time, end_time)
      VALUES (${req.userId}, ${courtId}, ${courtName}, ${date}, ${startTime}, ${endTime})
      RETURNING id, court_id, court_name, date, start_time, end_time, booked_at
    `;
    res.status(201).json({ booking: rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'This time slot is already booked' });
    }
    console.error('Create booking error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
