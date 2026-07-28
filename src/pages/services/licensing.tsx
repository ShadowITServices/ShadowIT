import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import LicensingAdvisor from '@site/src/components/LicensingAdvisor';
import {LAST_VERIFIED} from '@site/src/components/LicensingAdvisor/data';
import styles from '@site/src/components/LicensingAdvisor/styles.module.css';

export default function LicensingPage(): ReactNode {
  return (
    <Layout
      title="Microsoft 365 licensing advisor"
      description="Four questions to the Microsoft 365 license that actually fits — the stack to quote, what it costs, what you give up, and the event that means it's time to upgrade.">
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--lg">
          <Heading as="h1">Which Microsoft 365 license?</Heading>
          <p style={{maxWidth: '44rem', margin: '0 auto'}}>
            Microsoft 365 licensing is deliberately confusing, and most of the confusion is expensive.
            Buying too little means finding out at audit time. Buying too much means paying for governance
            nobody has switched on. Answer four questions and you&apos;ll get the license stack I&apos;d
            actually put on a quote, roughly what it costs, what you give up by stopping there, and the
            specific event that means it&apos;s time to move up.
          </p>
        </div>

        <LicensingAdvisor />

        <section className={styles.cta}>
          <Heading as="h2" className={styles.ctaTitle}>
            A tool is not a quote
          </Heading>
          <p className={styles.ctaBody}>
            This models the common cases well, but it can&apos;t see your tenant. Mixed licensing across
            departments, an existing agreement, a renewal date worth timing around, on-premises servers
            still in play, data residency obligations — all of that changes the answer, and none of it fits
            in four questions. Prices are Australian list (AUD, excluding GST) on an annual commitment, taken
            from Microsoft&apos;s Australian pricing pages and last checked {LAST_VERIFIED}.
          </p>
          <p className={styles.ctaBody}>
            If you want a second opinion on what you&apos;re paying, or you&apos;re sizing a move before a
            renewal, I&apos;m happy to look at it properly.{' '}
            <Link to="/services">How I work</Link> covers the process, or you can{' '}
            <a href="mailto:hello@shadowit.com.au">get in touch</a> directly.
          </p>
          <a className="button button--primary" href="mailto:hello@shadowit.com.au">
            Talk it through
          </a>
        </section>

        <p
          className="text--center margin-top--lg"
          style={{fontSize: '0.78rem', opacity: 0.7, maxWidth: '46rem', marginInline: 'auto'}}>
          Shadow IT is independent and is not affiliated with, endorsed by, or acting on behalf of
          Microsoft. Product names and documentation links belong to Microsoft, which changes both pricing
          and packaging without notice — always confirm current figures before you budget or quote.
        </p>
      </main>
    </Layout>
  );
}
