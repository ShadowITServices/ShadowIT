/**
 * Shade — the Shadow IT AI avatar.
 *
 * The runtime itself is a plain classic script served from /shade/shade.js
 * (declared in docusaurus.config.ts headTags) so it is cached independently of
 * the app bundle. This module owns the two things that belong to the site:
 * what Shade is allowed to say, and when the scheduler is started and stopped.
 *
 * The character, the placements and the appearance rules are specified in the
 * "Shade — Shadow IT AI Avatar" design system. The numbers are not repeated
 * here: the runtime's own defaults are the contract, and this file overrides
 * only the route list.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import '../css/shade.css';

type Mood = 'idle' | 'curious' | 'happy' | 'thinking' | 'sleep';

type ShadeMessage = {
  /** Matches a block's data-shade-id. */
  id: string;
  /** Overrides the anchor's data-shade when the trigger and the placement differ. */
  placement?: string;
  mood?: Mood;
  size?: number;
  title?: string;
  body?: string;
  cta?: {label: string; href: string};
  side?: 'right' | 'top' | 'bottom-left';
};

/**
 * One sentence, at most one link, Australian English, no emoji, no urgency.
 * See the design system's Voice section before adding to this list.
 */
const MESSAGES: ShadeMessage[] = [
  {
    id: 'tools',
    mood: 'thinking',
    title: 'Everything here runs in your browser.',
    body: 'Nothing you type into these tools is uploaded or stored.',
    // 'top' floats the card above the card row. 'right' would lay it over the
    // first card's own title and tag.
    side: 'top',
  },
  // The closing section is deliberately not an anchor. A peek needs the area
  // just above the block to be transparent, and the tools section sits flush
  // against it — the crown would be painted over and nothing would show.
  {
    // Triggered by hesitation over the advisor, but placed in the gutter —
    // the advisor has no opaque edge to hide behind.
    id: 'licensing',
    placement: 'gutter-walk',
    mood: 'curious',
    title: 'Most small teams land on Business Premium.',
    body: 'It is the cheapest tier that includes Intune and Defender.',
    side: 'bottom-left',
  },
];

/** Pages where a character popping out would read as unserious. */
const BLOCKED_ROUTES = [
  '/privacy-policy',
  '/ai-policy',
  '/extension-privacy-policy',
  // Attack-technique breakdowns. A character popping out mid incident-advice
  // undercuts the page. The runtime matches by prefix, so this covers every
  // breakdown beneath /hacks as well as the index.
  '/hacks',
];

/**
 * One short line per navbar dropdown, keyed by its label. A dropdown with no
 * entry here never gets a hint.
 */
const MENU_HINTS: Record<string, string> = {
  Docs: 'Everything here is free to read.',
  Hacks: 'Analysis of public research, written for defenders.',
  Tools: 'All three run in your browser.',
};

type ShadeRuntime = {
  Scheduler: {
    start(config: Record<string, unknown>): void;
    stop(): void;
    claim(placement?: string): boolean;
    release(): void;
  };
  MenuHint: {
    attach(host: Element, opts: Record<string, unknown>): unknown;
    detach(host: Element): void;
  };
};

/**
 * Navbar dropdowns open on hover via CSS (the theme adds `dropdown--hoverable`),
 * so there is no state change to subscribe to and no component to swizzle —
 * wiring the hint to the dropdown's own pointer and focus events is both
 * simpler and upgrade-safe. The hint hangs from the menu's bottom lip, inside
 * the dropdown's stacking context, so it disappears with the menu.
 */
function wireMenuHints(shade: ShadeRuntime): void {
  const dropdowns = document.querySelectorAll<HTMLElement>('.navbar__item.dropdown');

  dropdowns.forEach((item) => {
    if (item.dataset.shadeWired === '1') {
      return;
    }
    const menu = item.querySelector<HTMLElement>('.dropdown__menu');
    const label = item.querySelector('.navbar__link')?.textContent?.trim() ?? '';
    const text = MENU_HINTS[label];
    if (!menu || !text) {
      return;
    }
    item.dataset.shadeWired = '1';

    const open = () => {
      // Menu hints take a slot in the same session budget as every other
      // appearance; claim() also runs the suppression rules.
      if (!shade.Scheduler.claim('hang-menu')) {
        return;
      }
      shade.MenuHint.attach(item, {anchor: menu, text});
    };

    const close = () => {
      shade.MenuHint.detach(item);
      shade.Scheduler.release();
    };

    item.addEventListener('mouseenter', open);
    item.addEventListener('focusin', open);
    item.addEventListener('mouseleave', close);
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget as Node)) {
        close();
      }
    });
  });
}

function runtime(): ShadeRuntime | null {
  return (window as unknown as {ShadowITShade?: ShadeRuntime}).ShadowITShade ?? null;
}

function startShade(pathname: string, attempt = 0): void {
  const shade = runtime();

  if (!shade) {
    // The deferred script has not executed yet. Try again on the next frame,
    // then give up quietly — the avatar is decorative and must never be the
    // reason something on the page waits.
    if (attempt < 30) {
      requestAnimationFrame(() => startShade(pathname, attempt + 1));
    }
    return;
  }

  shade.Scheduler.stop();
  shade.Scheduler.start({
    route: pathname,
    blockedRoutes: BLOCKED_ROUTES,
    messages: MESSAGES,
  });
  wireMenuHints(shade);
}

export function onRouteDidUpdate({
  location,
  previousLocation,
}: {
  location: Location;
  previousLocation: Location | null;
}): void {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }
  // A hash change within the same page is not a new page.
  if (previousLocation && location.pathname === previousLocation.pathname) {
    return;
  }
  startShade(location.pathname);
}
