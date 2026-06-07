import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <span className={styles.logo}>🎾</span>
          <h1 className={styles.title}>Court Booking</h1>
        </div>
        <h2 className={styles.heading}>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className={styles.input}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? '...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className={styles.toggle}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className={styles.link}
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
