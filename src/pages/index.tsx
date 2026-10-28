import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageTools from '@site/src/components/HomepageTools';
import HomepageClosing from '@site/src/components/HomepageClosing';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {/* Decorative radar rings — echo the "managing the unseen" / monitoring
          theme. Purely decorative and motion-reduced-safe. */}
      <div className={styles.heroRings} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
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
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <span className={styles.heroDivider} aria-hidden="true" />
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Shadow IT is a collection of learning outcomes and documentation collected, documented and published by Beau Dean.">
      <main>
        {/* First screen: hero + the three entry cards, sized to the viewport on
            desktop so the page still opens as one composed screen. Everything
            below it is reached by scrolling. */}
        <div className={styles.firstScreen}>
          <HomepageHeader />
          <div className={styles.homeMain}>
            <HomepageFeatures />
          </div>
          <div className={styles.cueWrap}>
            <a className={styles.cue} href="#tools">
              See the tools
              <span className={styles.cueArrow} aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
        <HomepageTools />
        <HomepageClosing />
      </main>
    </Layout>
  );
}
