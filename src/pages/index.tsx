import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* Logo replaces the text title. It's rendered white via CSS filter so
            the wordmark reads cleanly on the brand purple gradient. The h1 stays
            for SEO/a11y, with the company name carried by the img alt text. */}
        <Heading as="h1" className={styles.heroLogoHeading}>
          <img
            src={useBaseUrl('/img/logo.png')}
            alt={siteConfig.title}
            className={styles.heroLogo}
            width={2639}
            height={609}
          />
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroLede}>
          Managed IT, security, and governance for businesses in regional
          Australia — written up, documented, and shared by Beau Dean.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Shadow IT is a collection of learning outcomes and documentation collected, documented and published by Beau Dean."
      wrapperClassName={styles.homeFit}>
      <HomepageHeader />
      <main className={styles.homeMain}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
