import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from '@site/src/components/LicensingAdvisor/styles.module.css';

const STORE_URL =
  'https://chromewebstore.google.com/detail/shadow-it/bhclmjkpohgbahbogfncffijlpnccegb';

/** Chrome Web Store listing facts — update here when a new version ships. */
const VERSION = '1.0.0';
const UPDATED = '3 August 2026';

const CHECKS: {record: string; summary: string; body: ReactNode}[] = [
  {
    record: 'SPF',
    summary: 'who is allowed to send',
    body: (
      <>
        Resolves the sending policy and follows the <code>include</code> and <code>redirect</code> chains
        rather than stopping at the first record. SPF silently fails once evaluation needs more than ten DNS
        lookups, so the extension counts them and flags the domain when it has gone over — the failure mode
        that breaks mail without anything visible having changed.
      </>
    ),
  },
  {
    record: 'DKIM',
    summary: 'is the mail actually signed',
    body: (
      <>
        Checks the selectors the major platforms use, and takes a custom selector if the domain publishes
        under one of its own. A domain can look fine on SPF and still be signing nothing.
      </>
    ),
  },
  {
    record: 'DMARC',
    summary: 'what happens when it fails',
    body: (
      <>
        Reads the policy and grades it — <code>reject</code>, <code>quarantine</code>, or <code>none</code>.
        A published DMARC record set to <code>none</code> is monitoring, not enforcement, and that
        distinction is the one most often misread as cover.
      </>
    ),
  },
];

const STEPS: {title: string; body: ReactNode}[] = [
  {
    title: 'Open the site you want to check',
    body: (
      <>
        Any page on the domain will do. The extension reads the hostname of the active tab and nothing else
        — not the page content, not your other tabs, not your history.
      </>
    ),
  },
  {
    title: 'Click the icon',
    body: (
      <>
        It resolves the hostname down to the organisational domain first, so a deep subdomain or an
        Australian <code>.com.au</code> address is checked against the domain that actually publishes the
        records, not the label in front of it.
      </>
    ),
  },
  {
    title: 'Read the verdict',
    body: (
      <>
        Each record comes back with the interpretation attached, so the answer is &quot;DMARC is set to
        none&quot; rather than a raw TXT string you then have to parse yourself.
      </>
    ),
  },
];

export default function ChromeExtensionPage(): ReactNode {
  return (
    <Layout
      title="Chrome Extension"
      description="A free Chrome extension that reads the SPF, DKIM, and DMARC records for whatever site you're on — chain-aware, with the verdict attached. No account, no data collection.">
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--lg">
          <Heading as="h1">Shadow IT for Chrome</Heading>
          <p style={{maxWidth: '44rem', margin: '0 auto'}}>
            Checking whether a domain&apos;s email authentication is actually set up usually means three
            lookups and a careful read of what comes back. This does it in one click. Open any site, click
            the icon, and the extension reports that domain&apos;s SPF, DKIM, and DMARC records — with the
            verdict attached, not just the raw record.
          </p>
          <div style={{marginTop: '1.5rem'}}>
            <a
              className="button button--primary button--lg"
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer">
              Add to Chrome — free
            </a>
          </div>
          <p style={{marginTop: '0.9rem', fontSize: '0.8rem', opacity: 0.75}}>
            Chrome Web Store · version {VERSION} · updated {UPDATED} · about 26 KB · no account, no sign-up
          </p>
        </div>

        <section style={{maxWidth: '780px', margin: '0 auto 2rem'}}>
          <Heading as="h2" style={{fontSize: '1.3rem'}}>
            What it checks
          </Heading>
          <dl>
            {CHECKS.map((check) => (
              <div key={check.record} style={{marginBottom: '1.1rem'}}>
                <dt style={{fontWeight: 700}}>
                  {check.record}{' '}
                  <span style={{fontWeight: 400, opacity: 0.75, fontSize: '0.86rem'}}>
                    · {check.summary}
                  </span>
                </dt>
                <dd style={{margin: '0.2rem 0 0', fontSize: '0.92rem', lineHeight: 1.55}}>{check.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section style={{maxWidth: '780px', margin: '0 auto'}}>
          <Heading as="h2" style={{fontSize: '1.3rem'}}>
            How it works
          </Heading>
          <div className="stepGrid">
            {STEPS.map((step, i) => (
              <div className="stepCard" key={step.title}>
                <span className="stepBadge">{i + 1}</span>
                <Heading as="h3" style={{fontSize: '1.05rem'}}>
                  {step.title}
                </Heading>
                <p style={{fontSize: '0.92rem', lineHeight: 1.55}}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{maxWidth: '780px', margin: '0 auto 2rem'}}>
          <Heading as="h2" style={{fontSize: '1.3rem'}}>
            What it doesn&apos;t do
          </Heading>
          <p style={{fontSize: '0.92rem', lineHeight: 1.6}}>
            There is no account, no sign-up, and no analytics. It asks for two permissions — the active tab,
            so it can read the domain you&apos;re on, and access to Cloudflare&apos;s DNS-over-HTTPS
            endpoint, so it can run the lookups. Domain names go to Cloudflare because that is what a DNS
            query is; nothing is sent to me, and nothing is stored. The full detail is in the{' '}
            <Link to="/extension-privacy-policy">extension privacy policy</Link>.
          </p>
          <p style={{fontSize: '0.92rem', lineHeight: 1.6}}>
            It also isn&apos;t a mail-flow audit. It reports what a domain publishes to the world, which is
            the first question rather than the last one — it can&apos;t see your tenant, your connectors, or
            who is actually sending on your behalf.
          </p>
        </section>

        <section className={styles.cta}>
          <Heading as="h2" className={styles.ctaTitle}>
            Built for the quick check
          </Heading>
          <p className={styles.ctaBody}>
            It came out of doing the same three lookups over and over — onboarding a client, sizing up a
            supplier, or sanity-checking a domain before trusting mail from it. If you do that often, this
            saves the round trip. If it turns up something you&apos;d like a hand fixing, or it gets a
            domain wrong, I&apos;d like to hear about it —{' '}
            <a href="mailto:hello@shadowit.com.au">get in touch</a>.
          </p>
          <a
            className="button button--primary"
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer">
            Get it on the Chrome Web Store
          </a>
        </section>
      </main>
    </Layout>
  );
}
