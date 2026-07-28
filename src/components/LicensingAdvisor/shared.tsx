import type {ReactNode} from 'react';
import clsx from 'clsx';

import {LINKS} from './data';
import styles from './styles.module.css';

/**
 * Renders the light inline markup (<b>, <i>) authored in data.ts.
 *
 * The strings are static, build-time content committed to this repo — there is
 * no user input anywhere in this component tree — so injecting them is safe.
 * Keeping the emphasis inline in the copy is much easier to maintain than
 * splitting every sentence into JSX fragments.
 */
export function RichText({
  html,
  as: Tag = 'div',
  className,
}: {
  html: string;
  as?: 'div' | 'span' | 'p' | 'li';
  className?: string;
}): ReactNode {
  return <Tag className={className} dangerouslySetInnerHTML={{__html: html}} />;
}

/** A chip linking out to official Microsoft documentation. */
export function MsLink({id}: {id: string}): ReactNode {
  const entry = LINKS[id];
  if (!entry) {
    return null;
  }
  const [label, href] = entry;
  return (
    <a className={styles.msLink} href={href} target="_blank" rel="noopener noreferrer">
      {label} ↗
    </a>
  );
}

export function MsLinkRow({ids}: {ids: string[]}): ReactNode {
  return (
    <div className={styles.chipRow}>
      {ids.map((id) => (
        <MsLink key={id} id={id} />
      ))}
    </div>
  );
}

export function NewBadge(): ReactNode {
  return <span className={styles.newBadge}>New</span>;
}

/**
 * Prints a price, or a muted "verify" marker where we deliberately hold back
 * rather than presenting a guess as a real figure.
 */
export function Price({value}: {value: string}): ReactNode {
  if (!value || value === 'verify') {
    return <span className={styles.verify}>verify</span>;
  }
  return <>{value}</>;
}

/** Maps a tier tone onto its gradient class. */
export function toneClass(tone: 'good' | 'better' | 'best'): string {
  return clsx({
    [styles.toneGood]: tone === 'good',
    [styles.toneBetter]: tone === 'better',
    [styles.toneBest]: tone === 'best',
  });
}

export const formatCount = (n: number): string => n.toLocaleString('en-AU');

export const formatUsd = (n: number): string =>
  `$${n.toLocaleString('en-AU', {maximumFractionDigits: 0})}`;
