import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const CREDENTIALS = [
  'MBA, cybersecurity focus — CSU',
  'Microsoft 365 · Security · Identity',
  'ASD cyber security frameworks',
  'ACS Code of Professional Conduct',
];

export default function HomepageClosing(): ReactNode {
  return (
    <section className={styles.closing}>
      <div className={clsx('container', styles.inner, 'revealUp')}>
        <p className={styles.eyebrow}>Albury–Wodonga · NSW–VIC border</p>
        <Heading as="h2" className={styles.title}>
          Managing the unseen
        </Heading>
        <p className={styles.body}>
          Security, sensible governance, and the part most people never see — written down
          so it can be checked, handed over, and understood a year from now. That habit is
          what the docs here come from.
        </p>
        <ul className={styles.chips}>
          {CREDENTIALS.map((c) => (
            <li key={c} className={styles.chip}>
              {c}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link className={clsx(styles.btn, styles.btnSolid)} to="/docs/intro">
            Browse the docs
          </Link>
          <a className={clsx(styles.btn, styles.btnGhost)} href="mailto:hello@shadowit.com.au">
            Get in touch
          </a>
        </div>
        <p className={styles.note}>
          If something here is useful, wrong, or worth a conversation, I&apos;d like to hear it.
          More about the person behind it on the <Link to="/about">about page</Link>.
        </p>
      </div>
    </section>
  );
}
