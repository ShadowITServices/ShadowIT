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
        {/* Logo replaces the text title, rendered white via CSS filter so the
            wordmark reads on the brand purple gradient. The h1 stays for SEO/a11y. */}
        <Heading as="h1" className={styles.heroLogoHeading}>
          <img
            src={useBaseUrl('/img/logo.png')}
            alt={siteConfig.title}
            className={styles.heroLogo}
            width={2639}
            height={609}
          />
        </Heading>
        {/* Tagline intentionally faded to 25% opacity. */}
        <p className="hero__subtitle" style={{opacity: 0.25}}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/about">
            About
          </Link>
          <Link className="button button--secondary button--lg" to="/services">
            Services
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Docs
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
