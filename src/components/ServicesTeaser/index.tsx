import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Stage = {
  num: string;
  title: string;
  blurb: string;
};

const STAGES: Stage[] = [
  {
    num: '1',
    title: 'Scoping',
    blurb: 'Map the environment and name the real problem before any solution.',
  },
  {
    num: '2',
    title: 'Solution design',
    blurb: 'Options with trade-offs and the reasoning on paper — your call, informed.',
  },
  {
    num: '3',
    title: 'Implementation',
    blurb: 'Staged, change-managed delivery, documented as it’s built.',
  },
  {
    num: '4',
    title: 'Hand-off',
    blurb: 'Runbooks and a walk-through so the knowledge lives with you.',
  },
];

export default function ServicesTeaser(): ReactNode {
  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2" className={styles.heading}>
            How I work
          </Heading>
          <p className={styles.lede}>
            Project by project — no price list, no packages. Every engagement runs
            through four stages, at my availability.
          </p>
        </div>
        <div className={styles.steps}>
          {STAGES.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <Heading as="h3" className={styles.stepTitle}>
                {s.title}
              </Heading>
              <p className={styles.stepBlurb}>{s.blurb}</p>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link className="button button--primary button--lg" to="/services">
            See how I work
          </Link>
        </div>
      </div>
    </section>
  );
}
