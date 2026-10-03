import styles from './ride-ready-pricing.module.css';
export function RideReadyPricing() {
  return (
    <div
      className={styles.review}
      aria-label="RideReady location plan and founding pilot pricing"
    >
      <p>One location. One clear plan.</p>
      <p className={styles.price}>
        $199 <span>USD per location per 12 months</span>
      </p>
      <p>
        Includes a main and spare host computer. Phone controllers and displays
        do not count as hosts.
      </p>
      <p>
        For one school, church, camp, music school, childcare or after-school
        location. Multi-location arrangements are separate.
      </p>
      <div className={styles.pilots}>
        <h3>Founding pilot, first year</h3>
        <p>
          <strong>$99</strong> with self setup
        </p>
        <p>
          <strong>$149</strong> with one guided setup session
        </p>
      </div>
      <p className={styles.renewal}>
        All plans renew automatically at $199/year unless canceled. Canceling
        keeps access through the paid term.
      </p>
      <p>
        Bounded email support for setup and product questions. Contact for pilot
        availability.
      </p>
      <p>Checkout unavailable while launch readiness is being verified.</p>
    </div>
  );
}
