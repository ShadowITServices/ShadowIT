import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import {useHistory, useLocation} from '@docusaurus/router';

import Advisor from './Advisor';
import Glossary from './Glossary';
import Ladder from './Ladder';
import WhatsNew from './WhatsNew';
import styles from './styles.module.css';

type TabId = 'advisor' | 'whats-new' | 'ladder' | 'features';

const TABS: {id: TabId; label: string; hash: string}[] = [
  {id: 'advisor', label: 'Find the license', hash: ''},
  {id: 'whats-new', label: "What's new", hash: '#whats-new'},
  {id: 'ladder', label: 'The upgrade ladder', hash: '#ladder'},
  {id: 'features', label: 'Learn the features', hash: '#features'},
];

const tabFromHash = (hash: string): TabId =>
  TABS.find((t) => t.hash && t.hash === hash)?.id ?? 'advisor';

export default function LicensingAdvisor(): ReactNode {
  const location = useLocation();
  const history = useHistory();
  // Always render the advisor first so the server-rendered HTML is stable, then
  // reconcile with the URL hash once we're on the client.
  const [tab, setTab] = useState<TabId>('advisor');

  useEffect(() => {
    setTab(tabFromHash(location.hash));
  }, [location.hash]);

  const selectTab = (next: TabId) => {
    setTab(next);
    const {hash} = TABS.find((t) => t.id === next)!;
    history.replace(`${location.pathname}${hash}`);
  };

  return (
    <div className={styles.advisor}>
      <div className={styles.tabs} role="tablist" aria-label="Licensing advisor sections">
        {TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            role="tab"
            id={`licensing-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`licensing-panel-${t.id}`}
            className={clsx(styles.tab, tab === t.id && styles.tabActive)}
            onClick={() => selectTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`licensing-panel-${tab}`}
        aria-labelledby={`licensing-tab-${tab}`}
        tabIndex={-1}>
        {tab === 'advisor' && <Advisor />}
        {tab === 'whats-new' && <WhatsNew />}
        {tab === 'ladder' && <Ladder />}
        {tab === 'features' && <Glossary />}
      </div>
    </div>
  );
}
