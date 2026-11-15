import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageTools from '@site/src/components/HomepageTools';
import HomepageClosing from '@site/src/components/HomepageClosing';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Shadow IT is a collection of learning outcomes and documentation collected, documented and published by Beau Dean."
      wrapperClassName="homepage-panels">
      <main>
        {/* First screen: the three entry cards, centred in the viewport on
            desktop. Everything below is reached by scrolling.

            There was a full-width gradient hero here. It repeated the wordmark
            already sitting in the navbar a few pixels above it, and because
            this screen is sized to the viewport, its height came straight out
            of the cards — the part that actually does work. The radar motif it
            carried survives as the backdrop below, that being the bit of it
            which said something the navbar did not. */}
        <div className={styles.firstScreen}>
          {/* The hero held this page's only h1. Keeping one, unseen, so the
              document still has a name for search engines and screen readers:
              the visible heading here is "Three ways in", an h2, and a page
              that begins at h2 is a page with no title. */}
          <Heading as="h1" className={styles.visuallyHidden}>
            {siteConfig.title} — {siteConfig.tagline}
          </Heading>

          <div className={styles.backdrop} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

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
