import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

import {WHATS_NEW} from './data';
import {MsLinkRow} from './shared';
import styles from './styles.module.css';

const SOURCES = [
  {
    href: 'https://www.microsoft.com/en-us/microsoft-365/roadmap',
    title: 'Microsoft 365 Roadmap',
    body: 'Every feature in development, rolling out, or launched — searchable by product.',
  },
  {
    href: 'https://learn.microsoft.com/en-us/microsoft-365/admin/manage/message-center',
    title: 'Message Center',
    body: 'Tenant-specific change announcements in the admin centre, and how to actually use it.',
  },
  {
    href: 'https://www.microsoft.com/en-us/microsoft-365/blog/',
    title: 'Microsoft 365 Blog',
    body: 'Official launch announcements — where Scout, Cowork, and E7 were unveiled.',
  },
  {
    href: 'https://www.microsoft.com/en-us/microsoft-365-copilot/frontier-features',
    title: 'Frontier program features',
    body: 'The earliest-access channel — upcoming Copilot features, timelines, and status.',
  },
];

export default function WhatsNew(): ReactNode {
  return (
    <div>
      <div className={styles.newsGrid}>
        {WHATS_NEW.map((item) => (
          <article className={styles.newsCard} key={item.title}>
            <div className={styles.newsHead}>
              <span className={styles.newsIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.newsDate}>{item.date}</span>
            </div>
            <Heading as="h3" className={styles.newsTitle}>
              {item.title}
            </Heading>
            <p className={styles.newsWhat}>{item.what}</p>
            <div className={styles.newsWhy}>
              <b>Why it matters for licensing:</b> {item.why}
            </div>
            <div className={styles.newsLinks}>
              <MsLinkRow ids={item.links} />
            </div>
          </article>
        ))}
      </div>

      <div className={styles.stayCurrent}>
        <div className={styles.stayTitle}>Stay current — official Microsoft sources</div>
        <div className={styles.staySub}>
          Bookmark these. They&apos;re where Microsoft announces what&apos;s coming next, and they stay
          current long after the cards above go stale.
        </div>
        <div className={styles.stayGrid}>
          {SOURCES.map((s) => (
            <a
              className={styles.stayLink}
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer">
              <b>{s.title} ↗</b>
              <span>{s.body}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
