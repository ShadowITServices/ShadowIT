import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  to: string;
  cta: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Open Docs',
    Svg: require('@site/static/img/feature_docs.svg').default,
    to: '/docs/intro',
    cta: 'Browse the docs',
    description: (
      <>
        Open-source, non-paywalled documentation — runbooks, guides, and
        how-tos on Microsoft 365 and security. No sign-up, no paywall, just the
        knowledge.
      </>
    ),
  },
  {
    title: 'About Beau',
    Svg: require('@site/static/img/feature_about.svg').default,
    to: '/about',
    cta: 'Meet Beau',
    description: (
      <>
        A decade-plus across managed services, education, and healthcare — the
        person and the professional standards behind Shadow IT.
      </>
    ),
  },
  {
    title: 'How I work',
    Svg: require('@site/static/img/feature_monitor.svg').default,
    to: '/services',
    cta: 'See the process',
    description: (
      <>
        Project by project — scoping, solution design, implementation, and
        hand-off, at my availability. No price list, no packages.
      </>
    ),
  },
];

function Feature({title, Svg, description, to, cta}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={to} className={styles.featureCard}>
        <span className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </span>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureText}>{description}</p>
        <span className={styles.featureCta}>
          {cta}
          <span aria-hidden="true" className={styles.featureArrow}>
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Start here</p>
          <Heading as="h2" className={styles.headingTitle}>
            Three ways in
          </Heading>
          <p className={styles.headingSub}>
            Open documentation, the person behind it, and how an engagement
            runs — pick wherever you'd like to begin.
          </p>
        </div>
        <div className={clsx('row', styles.cardRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
