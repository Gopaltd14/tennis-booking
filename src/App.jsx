import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useBookings } from './hooks/useBookings';
import Wizard from './components/Wizard/Wizard';
import BookingList from './components/BookingList/BookingList';
import AuthForm from './components/AuthForm/AuthForm';
import styles from './App.module.css';

function Main() {
  const { user, logout, loading } = useAuth();
  const { bookings, addBooking, isSlotTaken, loadSlotsForDate } = useBookings();

  if (loading) return null;
  if (!user) return <AuthForm />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>🎾</span>
        <h1 className={styles.title}>Court Booking</h1>
        <div className={styles.spacer} />
        <span className={styles.email}>{user.email}</span>
        <button className={styles.logout} onClick={logout}>Sign out</button>
      </header>
      <main className={styles.main}>
        <section className={styles.wizard}>
          <Wizard addBooking={addBooking} isSlotTaken={isSlotTaken} loadSlotsForDate={loadSlotsForDate} />
        </section>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>My Bookings</h2>
          <BookingList bookings={bookings} />
        </aside>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
