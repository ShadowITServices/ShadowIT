import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Tool = {
  name: string;
  to: string;
  description: ReactNode;
};

const ToolList: Tool[] = [
  {
    name: 'Microsoft Licensing',
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
    to: '/tools/chrome-extension',
    description: (
      <>
        One click reads a domain&apos;s SPF, DKIM and DMARC — chain-aware, lookup-limit
        aware, and with the verdict attached rather than the raw record.
      </>
    ),
  },
];

function ToolRow({name, to, description}: Tool) {
  return (
    <li>
      <Link to={to} className={styles.toolRow}>
        <Heading as="h3" className={styles.toolTitle}>
          <span className={styles.toolName}>{name}</span>
          <span aria-hidden="true" className={styles.toolArrow}>
            →
          </span>
        </Heading>
        <p className={styles.toolText}>{description}</p>
      </Link>
    </li>
  );
}

export default function HomepageTools(): ReactNode {
  return (
    // The tools are a plain list rather than a row of cards: three items with
    // a name and a sentence each don't need a box apiece.
    //
    // Shade's anchor is the list itself. It is opaque (it paints the section's
    // own surface colour) and gets a stacking context from the [data-shade]
    // rule in custom.css, so the character can lift its head over the list's
    // top edge. The section can't be the anchor: the homepage snaps in
    // full-viewport panels, so its top edge always rests under the navbar.
    <section className={styles.tools} id="tools">
      <div className={clsx('container', styles.panel, 'panelIn')}>
        <div className={styles.inner}>
          <Heading as="h2" className={styles.headingTitle}>
            Things you can use right now
          </Heading>
          <ul className={styles.toolList} data-shade="peek-edge" data-shade-id="tools">
            {ToolList.map((tool) => (
              <ToolRow key={tool.name} {...tool} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
