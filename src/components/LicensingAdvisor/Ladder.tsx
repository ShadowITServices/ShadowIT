import {useState, type ReactNode} from 'react';
import clsx from 'clsx';

import {LADDER} from './data';
import {MsLinkRow, NewBadge, RichText, toneClass} from './shared';
import styles from './styles.module.css';

type Track = 'biz' | 'ent' | 'frn';

const TRACKS: {id: Track; label: string}[] = [
  {id: 'biz', label: 'Business · ≤300 users'},
  {id: 'ent', label: 'Enterprise · 300+ users'},
  {id: 'frn', label: 'Frontline · deskless/shift'},
];

const COST = ['$', '$$', '$$$'];

export default function Ladder(): ReactNode {
  const [track, setTrack] = useState<Track>('biz');
  const rungs = LADDER[track];

  return (
    <div>
      <div className={styles.trackToggle} role="group" aria-label="Licensing track">
        {TRACKS.map((t) => (
          <button
            type="button"
            key={t.id}
            className={clsx(styles.tab, track === t.id && styles.tabActive)}
            aria-pressed={track === t.id}
            onClick={() => setTrack(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Rendered top tier first so the ladder reads downward from the ceiling. */}
      <div className={styles.ladder}>
        {[...rungs].reverse().map((rung, i) => {
          const costIndex = rungs.length - 1 - i;
          return (
            <div key={rung.word}>
              <div className={styles.rung}>
                <div className={clsx(styles.rungLeft, toneClass(rung.tone))}>
                  <div className={styles.rungWord}>{rung.word}</div>
                  <div className={styles.rungCost}>{COST[costIndex]}</div>
                </div>
                <div className={styles.rungRight}>
                  {rung.includes && (
                    <RichText className={styles.rungIncludes} html={`✓ ${rung.includes}`} />
                  )}
                  <div className={styles.rungStack}>
                    {rung.stack}
                    {rung.stackNew && <NewBadge />}
                  </div>
                  <div className={styles.rungPrice}>
                    {rung.price} <span>/ user / mo · ex GST</span>
                  </div>
                  <RichText className={styles.rungFor} html={rung.forWho} />
                  <div className={styles.rungTrigger}>{rung.trigger}</div>
                  <div className={styles.rungLinks}>
                    <MsLinkRow ids={rung.links} />
                  </div>
                </div>
              </div>
              {i < rungs.length - 1 && (
                <div className={styles.rungArrow} aria-hidden="true">
                  ↑
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
