import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Security & Governance',
    Svg: require('@site/static/img/feature_security.svg').default,
    description: (
      <>
        Practical, layered protection for small and mid-sized businesses —
        identity, endpoints, and data hardened against everyday threats, with
        governance that stands up to scrutiny.
      </>
    ),
  },
  {
    title: 'Managed Microsoft 365',
    Svg: require('@site/static/img/feature_cloud.svg').default,
    description: (
      <>
        Microsoft 365 and cloud workloads configured, monitored, and maintained
        to best practice — so the platform stays fast, secure, and out of your
        way.
      </>
    ),
  },
  {
    title: 'Managing the Unseen',
    Svg: require('@site/static/img/feature_monitor.svg').default,
    description: (
      <>
        Proactive monitoring and clear communication that surface the risks and
        work happening behind the scenes — no jargon, no surprises.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
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
