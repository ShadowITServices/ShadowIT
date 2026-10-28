import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import CoworkEstimator from '@site/src/components/LicensingAdvisor/CoworkEstimator';
import {
  AGENT365_PRICE_AUD,
  COPILOT_PRICE_AUD,
  LAST_VERIFIED,
} from '@site/src/components/LicensingAdvisor/data';
import {MsLinkRow} from '@site/src/components/LicensingAdvisor/shared';
import styles from '@site/src/components/LicensingAdvisor/styles.module.css';

/**
 * Copilot is priced on two different models at once — a per-seat license plus
 * metered credits — which is why it gets its own page rather than another tab
 * on the licensing advisor. The estimator below is the usage half.
 */
const LAYERS: {name: string; price: string; body: ReactNode}[] = [
  {
    name: 'Microsoft 365 Copilot',
    price: `${COPILOT_PRICE_AUD} per user / per month`,
    body: (
      <>
        The per-seat license, and the prerequisite for everything else. Buys Copilot across Word, Excel,
        PowerPoint, Outlook and Teams, plus Copilot Chat and the built-in Researcher, Analyst and
        Facilitator agents. Sits on top of a base license — Business Premium, E3 or E5 — rather than
        replacing one.
      </>
    ),
  },
  {
    name: 'Copilot Cowork',
    price: 'usage-based — Copilot Credits',
    body: (
      <>
        Agentic work that runs a task through to a result rather than helping you write one. Needs a
        Copilot license first, then bills separately on credits, pay-as-you-go or pre-purchased. There is
        no per-seat number to quote, which is what the estimator below is for.
      </>
    ),
  },
  {
    name: 'Copilot Studio',
    price: 'separate consumption spend',
    body: (
      <>
        Where custom agents are actually built and run. Priced on its own consumption, so budget it apart
        from seats — and plan the governance before, not after, the first agent goes live.
      </>
    ),
  },
  {
    name: 'Agent 365',
    price: `${AGENT365_PRICE_AUD} per user / per month`,
    body: (
      <>
        Identity, inventory and monitoring for agents — onboarding a digital worker the way you would a
        human one. Worth it the moment agents start acting on data without a person driving each step.
      </>
    ),
  },
  {
    name: 'Security Copilot',
    price: 'Security Compute Units',
    body: (
      <>
        The SOC-side Copilot, metered in SCUs rather than seats. The top enterprise bundles include an
        allocation — the <Link to="/tools/licensing">licensing tool</Link> shows which.
      </>
    ),
  },
];

export default function CopilotPage(): ReactNode {
  return (
    <Layout
      title="Copilot"
      description="What Microsoft Copilot actually costs — the per-seat license, the usage-based credits behind Cowork, and a planning estimate for a month of agentic work.">
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--lg">
          <Heading as="h1">Microsoft Copilot</Heading>
          <p style={{maxWidth: '44rem', margin: '0 auto'}}>
            Copilot isn&apos;t one product with one price. It&apos;s a per-seat license, a pool of metered
            credits for the agentic work on top, and a separate governance layer once agents start acting
            on their own. Quoting it as a single per-user figure is how budgets get missed — so here are
            the layers, and an estimate of what the metered part costs in a month.
          </p>
          <p style={{maxWidth: '44rem', margin: '0.75rem auto 0', fontSize: '0.9rem'}}>
            Working out the license underneath it first?{' '}
            <Link to="/tools/licensing">Microsoft Licensing</Link> takes four questions to the base stack.
          </p>
        </div>

        <section style={{maxWidth: '780px', margin: '0 auto 2rem'}}>
          <Heading as="h2" style={{fontSize: '1.3rem'}}>
            What you&apos;re actually buying
          </Heading>
          <dl>
            {LAYERS.map((layer) => (
              <div key={layer.name} style={{marginBottom: '1.1rem'}}>
                <dt style={{fontWeight: 700}}>
                  {layer.name}{' '}
                  <span style={{fontWeight: 400, opacity: 0.75, fontSize: '0.86rem'}}>
                    · {layer.price}
                  </span>
                </dt>
                <dd style={{margin: '0.2rem 0 0', fontSize: '0.92rem', lineHeight: 1.55}}>{layer.body}</dd>
              </div>
            ))}
          </dl>
          <MsLinkRow ids={['copilot', 'cowork', 'studio', 'agent365', 'seccopilot']} />
          <p style={{marginTop: '0.9rem', fontSize: '0.8rem', opacity: 0.75}}>
            Per-seat prices are Australian list (AUD, excluding GST) on an annual commitment, last checked{' '}
            {LAST_VERIFIED}. Consumption-based items have no list seat price by design.
          </p>
        </section>

        <CoworkEstimator />

        <section className={styles.cta}>
          <Heading as="h2" className={styles.ctaTitle}>
            Before you license the whole org
          </Heading>
          <p className={styles.ctaBody}>
            Copilot pays off where the data underneath it is already governed — and surfaces every
            oversharing problem you have where it isn&apos;t. A readiness pass over permissions, sharing
            links and labelling is cheaper than discovering it through Copilot, and it&apos;s the part most
            rollouts skip.
          </p>
          <p className={styles.ctaBody}>
            If you&apos;re sizing a pilot or sanity-checking a quote, I&apos;m happy to look at it properly
            — <a href="mailto:hello@shadowit.com.au">get in touch</a>.
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
