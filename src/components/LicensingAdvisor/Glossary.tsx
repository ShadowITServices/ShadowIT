import {useMemo, useState, type ReactNode} from 'react';
import clsx from 'clsx';

import {GLOSSARY, type Feature, type Suite} from './data';
import {MsLink, NewBadge} from './shared';
import styles from './styles.module.css';

function FeatureBlock({feature}: {feature: Feature}): ReactNode {
  return (
    <div className={styles.feature}>
      <div className={styles.featureName}>
        {feature.name}
        {feature.isNew && <NewBadge />}
      </div>
      <div className={styles.featureWhat}>
        <b>What it does:</b> {feature.what}
      </div>
      <div className={styles.featureWhy}>
        <b>Why it matters:</b> {feature.why}
      </div>
      {feature.frontline && <div className={styles.featureFrontline}>🦺 Frontline: {feature.frontline}</div>}
      <div className={styles.featureLink}>
        <MsLink id={feature.link} />
      </div>
    </div>
  );
}

function SuiteHeader({
  suite,
  count,
  countLabel,
}: {
  suite: Suite;
  count: number;
  countLabel: string;
}): ReactNode {
  return (
    <>
      <span className={styles.suiteIcon} aria-hidden="true">
        {suite.icon}
      </span>
      <span className={styles.suiteTitle}>
        <span className={styles.suiteName}>
          {suite.suite}
          {suite.isNew && <NewBadge />}
        </span>
        <span className={styles.suiteBlurb}>{suite.blurb}</span>
      </span>
      <span className={styles.suiteCount}>
        {count} {countLabel}
      </span>
    </>
  );
}

export default function Glossary(): ReactNode {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const term = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!term) {
      return null;
    }
    return GLOSSARY.map((suite) => ({
      suite,
      hits: suite.features.filter((f) =>
        `${f.name} ${f.what} ${f.why} ${suite.suite}`.toLowerCase().includes(term),
      ),
    })).filter((entry) => entry.hits.length > 0);
  }, [term]);

  const totalHits = matches ? matches.reduce((n, m) => n + m.hits.length, 0) : 0;

  return (
    <div>
      <div className={styles.searchWrap}>
        <input
          type="search"
          className={styles.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search features — try DLP, PIM, Cowork, eDiscovery…"
          aria-label="Search Microsoft 365 features"
          autoComplete="off"
        />
      </div>

      <div className={styles.glossary}>
        {matches ? (
          totalHits === 0 ? (
            <div className={styles.noResults}>
              No features match “<b>{query.trim()}</b>”. Try something shorter, like “DLP”, “PIM”, or
              “agent”.
            </div>
          ) : (
            matches.map(({suite, hits}) => (
              <div className={styles.suite} key={suite.suite}>
                <div className={clsx(styles.suiteHead, styles.suiteStatic)}>
                  <SuiteHeader
                    suite={suite}
                    count={hits.length}
                    countLabel={hits.length === 1 ? 'match' : 'matches'}
                  />
                </div>
                <div className={styles.suiteBody}>
                  {hits.map((f) => (
                    <FeatureBlock key={f.name} feature={f} />
                  ))}
                </div>
              </div>
            ))
          )
        ) : (
          GLOSSARY.map((suite) => {
            const isOpen = Boolean(open[suite.suite]);
            return (
              <div className={styles.suite} key={suite.suite}>
                <button
                  type="button"
                  className={styles.suiteHead}
                  aria-expanded={isOpen}
                  onClick={() => setOpen((prev) => ({...prev, [suite.suite]: !prev[suite.suite]}))}>
                  <SuiteHeader
                    suite={suite}
                    count={suite.features.length}
                    countLabel={`features ${isOpen ? '▴' : '▾'}`}
                  />
                </button>
                {isOpen && (
                  <div className={styles.suiteBody}>
                    <div className={styles.suiteOverview}>
                      Suite overview: <MsLink id={suite.link} />
                    </div>
                    {suite.features.map((f) => (
                      <FeatureBlock key={f.name} feature={f} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
