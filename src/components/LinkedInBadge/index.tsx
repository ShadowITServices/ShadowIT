import type {ReactNode} from 'react';
import {useEffect} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const SCRIPT_ID = 'li-badge-script';
const SCRIPT_SRC = 'https://platform.linkedin.com/badges/js/profile.js';

// The LinkedIn badge script scans the DOM for `.LI-profile-badge` nodes and
// replaces them with an iframe. We render the badge with a theme that follows
// Docusaurus' colour mode, and re-run the global render when the theme flips.
function BadgeInner(): ReactNode {
  const {colorMode} = useColorMode();

  useEffect(() => {
    const w = window as unknown as {LIRenderAll?: () => void};
    if (w.LIRenderAll) {
      w.LIRenderAll();
      return;
    }
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script');
      s.id = SCRIPT_ID;
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.type = 'text/javascript';
      document.body.appendChild(s);
    }
  }, [colorMode]);

  return (
    <section className={styles.badgeSection}>
      <Heading as="h2" className={styles.badgeHeading}>
        Connect with me on LinkedIn
      </Heading>
      {/* key forces a fresh badge node on theme change so the script can
          re-render it in the matching light/dark style. */}
      <div
        key={colorMode}
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme={colorMode === 'dark' ? 'dark' : 'light'}
        data-type="VERTICAL"
        data-vanity="beaudean"
        data-version="v1">
        <a
          className="badge-base__link LI-simple-link"
          href="https://au.linkedin.com/in/beaudean?trk=profile-badge">
          Beau Dean
        </a>
      </div>
    </section>
  );
}

export default function LinkedInBadge(): ReactNode {
  // BrowserOnly: the badge depends on a client-side script and the DOM, so it
  // must not render during static server-side generation.
  return <BrowserOnly>{() => <BadgeInner />}</BrowserOnly>;
}
