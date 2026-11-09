import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Tool = {
  name: string;
  tag: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  to: string;
  description: ReactNode;
};

const ToolList: Tool[] = [
  {
    name: 'Microsoft Licensing',
    tag: 'Advisor',
    Svg: require('@site/static/img/feature_cloud.svg').default,
    to: '/tools/licensing',
    description: (
      <>
        Four questions to the licence stack that actually fits — Australian list pricing,
        what you give up by stopping there, and the event that means it&apos;s time to move up.
      </>
    ),
  },
  {
    name: 'Copilot Estimator',
    // Not 'Estimator' — the name already says that, and the pills exist to
    // tell the three cards apart at a glance.
    tag: 'Pricing',
    Svg: require('@site/static/img/feature_spark.svg').default,
    to: '/tools/copilot',
    description: (
      <>
        The seats, the metered credits behind Cowork, and a planning range for a month
        of it — so Copilot gets budgeted as the two things it actually bills as.
      </>
    ),
  },
  {
    name: 'Chrome Extension',
    tag: 'Chrome',
    Svg: require('@site/static/img/feature_browser.svg').default,
    to: '/tools/chrome-extension',
    description: (
      <>
        One click reads a domain&apos;s SPF, DKIM and DMARC — chain-aware, lookup-limit
        aware, and with the verdict attached rather than the raw record.
      </>
    ),
  },
];

function ToolCard({name, tag, Svg, to, description, anchor}: Tool & {anchor?: boolean}) {
  return (
    <div className={clsx('col col--4', styles.toolCol)}>
      <Link
        to={to}
        className={styles.toolCard}
        // Shade may lift its head over this card's top edge. The card is
        // opaque and gets its own stacking context from the [data-shade] rule
        // in custom.css, so it hides two thirds of the character, and the
        // section's flat background sits behind both.
        data-shade={anchor ? 'peek-edge' : undefined}
        data-shade-id={anchor ? 'tools' : undefined}>
        <span className={styles.toolTop} aria-hidden="true" />
        <div className={styles.toolHead}>
          <span className={styles.toolIcon}>
            <Svg className={styles.toolSvg} role="img" />
          </span>
          <span className={styles.toolTag}>{tag}</span>
        </div>
        <Heading as="h3" className={styles.toolTitle}>
          {name}
        </Heading>
        <p className={styles.toolText}>{description}</p>
        <span className={styles.toolCta}>
          Open it
          <span aria-hidden="true" className={styles.toolArrow}>
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

export default function HomepageTools(): ReactNode {
  return (
    // The anchor is the first tool card, not this section: the homepage snaps
    // in full-viewport panels, so the section's own top edge always comes to
    // rest under the sticky navbar, where a peek would never be seen.
    <section className={styles.tools} id="tools">
      <div className={clsx('container', styles.panel, 'panelIn')}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Free tools</p>
          <Heading as="h2" className={styles.headingTitle}>
            Things you can use right now
          </Heading>
          <p className={styles.headingSub}>
            The work I was doing by hand often enough to be worth building properly.
            No sign-up, no email wall — open the page and go.
          </p>
        </div>
        <div className={clsx('row', styles.cardRow)}>
          {ToolList.map((tool, i) => (
            <ToolCard key={tool.name} {...tool} anchor={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
