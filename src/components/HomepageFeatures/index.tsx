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
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Open Docs',
    Svg: require('@site/static/img/feature_docs.svg').default,
    description: (
      <>
        Open-source, non-paywalled documentation — runbooks, guides, and
        how-tos on Microsoft 365 and security. No sign-up, no paywall, just the
        knowledge.
      </>
    ),
    to: '/docs/intro',
  },
  {
    title: 'About Beau',
    Svg: require('@site/static/img/feature_about.svg').default,
    description: (
      <>
        A decade-plus across managed services, education, and healthcare — the
        person and the professional standards behind Shadow IT.
      </>
    ),
    to: '/about',
  },
];

function Feature({title, Svg, description, to}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureText}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
