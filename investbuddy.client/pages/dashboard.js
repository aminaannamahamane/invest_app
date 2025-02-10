import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../scss/dashboard.module.scss';  // Modifie l'extension en .module.scss
; // Importe ton fichier SCSS personnalisé pour les styles

const Dashboard = () => {
  const { user, logout, loading, error } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <h2>You are not logged in.</h2>
        <p>Please log in first.</p>
        <Link href="/signin-light" className={styles.loginLink}>Go to Login Page</Link>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Welcome, {user.name}!</h1>
      </header>
      <section className={styles.profileCard}>
        <img src={user.imageUrl} alt="User Profile" className={styles.profileImage} />
        <div className={styles.userInfo}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </section>
      <section className={styles.logoutSection}>
        <button 
          onClick={handleLogout} 
          className={styles.logoutButton} 
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </section>
      {/* Ajout du bouton pour revenir à la page d'accueil */}
      <section className={styles.homeSection}>
        <Link href="/" className={styles.homeButton}>Back to Home</Link>
      </section>
    </div>
  );
};

export default Dashboard;
