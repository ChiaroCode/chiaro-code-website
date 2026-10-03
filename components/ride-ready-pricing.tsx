import styles from './ride-ready-pricing.module.css';

export function RideReadyPricing() {
  return (
    <div className={styles.review} aria-label="RideReady pricing status">
      <p>Pricing under review</p>
      <p>Contact for pilot availability.</p>
    </div>
  );
}
