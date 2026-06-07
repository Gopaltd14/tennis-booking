import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('.env', import.meta.url) });

const sql = neon(process.env.DATABASE_URL);

export default sql;
