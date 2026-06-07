import sql from '../_db.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  const userId = requireAuth(req, res);
  if (!userId) return;

  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT id, court_id, court_name, date, start_time, end_time, booked_at
        FROM bookings WHERE user_id = ${userId}
        ORDER BY date, start_time
      `;
      return res.json({ bookings: rows });
    } catch (err) {
      console.error('List bookings error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  if (req.method === 'POST') {
    const { courtId, courtName, date, startTime, endTime } = req.body;
    if (!courtId || !courtName || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const rows = await sql`
        INSERT INTO bookings (user_id, court_id, court_name, date, start_time, end_time)
        VALUES (${userId}, ${courtId}, ${courtName}, ${date}, ${startTime}, ${endTime})
        RETURNING id, court_id, court_name, date, start_time, end_time, booked_at
      `;
      return res.status(201).json({ booking: rows[0] });
    } catch (err) {
      if (err.code === '23505') return res.status(409).json({ error: 'This time slot is already booked' });
      console.error('Create booking error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
