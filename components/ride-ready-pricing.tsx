import { rideReadyPlans } from '@/lib/ride-ready-pricing';
import styles from './ride-ready-pricing.module.css';

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function RideReadyPricing() {
  return (
    <dl className={styles.plans} aria-label="RideReady pilot pricing">
      {rideReadyPlans.map((plan) => (
        <div key={plan.name}>
          <dt>{plan.name}</dt>
          <dd>{dollars.format(plan.amount)}</dd>
        </div>
      ))}
    </dl>
  );
}
