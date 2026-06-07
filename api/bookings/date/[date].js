import sql from '../../_db.js';
import { requireAuth } from '../../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const userId = requireAuth(req, res);
  if (!userId) return;

  const { date } = req.query;
  try {
    const rows = await sql`SELECT court_id, start_time FROM bookings WHERE date = ${date}`;
    res.json({ bookings: rows });
  } catch (err) {
    console.error('Date bookings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
