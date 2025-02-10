// pages/about.js
import { useRouter } from 'next/router';
import styles from '../scss/about.module.css';

export default function About() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About InvestBuddy</h1>
      <p className={styles.description}>
        InvestBuddy is your intelligent stock market companion. We use AI to provide real-time insights, predictions, and a risk-free trading simulator to help you master investing.
      </p>

      <h2 className={styles.subtitle}>Key Features</h2>
      <ul className={styles.featuresList}>
        <li>📈 Real-time market analysis</li>
        <li>🤖 AI-powered stock predictions</li>
        <li>📊 Virtual trading simulator</li>
        <li>🔔 Personalized alerts & insights</li>
      </ul>

      <h2 className={styles.subtitle}>Meet the Team</h2>
      <div className={styles.team}>
        <p>👩🏽 <b>Exaucée </b> – Data Scientist</p>
        <p>👩🏽 <b>Amina</b> – Lead Developer </p>
        <p>👨🏽 <b>Ajmal</b> – Backend Engineer</p>
      </div>

      <button className={styles.button} onClick={() => router.push('/')}>
        Back to Home
      </button>
    </div>
  );
}
