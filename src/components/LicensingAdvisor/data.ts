/**
 * Microsoft 365 licensing advisor — reference data.
 *
 * PRICING MAINTENANCE
 * -------------------
 * All figures are Australian list prices (AUD, per user per month, annual
 * commitment, GST exclusive) taken from microsoft.com/en-au. To refresh:
 *   1. Update LAST_VERIFIED below.
 *   2. Update the `price` blocks on each RECOMMENDATIONS entry and the `price`
 *      field on each LADDER rung.
 * The footer stamp, the "Verified" line on every result, and the What's New
 * heading all read from LAST_VERIFIED, so it only needs changing in one place.
 *
 * Anything uncertain should be the literal string 'verify' — the UI renders it
 * as muted italic text rather than presenting a guess as a real number. Where a
 * stack contains an add-on Microsoft doesn't publish an AU price for, the
 * headline is written as "from AU$x" and the unpriced parts are named in the
 * math line. Do not fill those in by converting the USD figure: Microsoft sets
 * Australian list prices independently, not by exchange rate.
 */

export const LAST_VERIFIED = 'July 28, 2026';

export const MS_PRICING_BUSINESS =
  'https://www.microsoft.com/en-au/microsoft-365/business/compare-all-microsoft-365-business-products';
export const MS_PRICING_ENTERPRISE =
  'https://www.microsoft.com/en-au/microsoft-365/enterprise/microsoft365-plans-and-pricing';
export const MS_PRICING_NONPROFIT =
  'https://www.microsoft.com/en-au/microsoft-365/business/nonprofit-plans-and-pricing';

/** Tier tone drives the colour treatment on result headers and ladder rungs. */
export type Tone = 'good' | 'better' | 'best';

/* ---------------------------------------------------------------------------
 * Microsoft documentation links. Every chip in the UI resolves through here so
 * a URL only ever needs correcting in one spot.
 * ------------------------------------------------------------------------- */
export const LINKS: Record<string, [label: string, href: string]> = {
  copilot: [
    'Microsoft 365 Copilot',
    'https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview',
  ],
  cowork: ['Copilot Chat & Cowork', 'https://learn.microsoft.com/en-us/copilot/microsoft-copilot'],
  studio: ['Copilot Studio', 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/'],
  seccopilot: ['Security Copilot', 'https://learn.microsoft.com/en-us/copilot/security/'],
  agent365: ['Agent 365 / Entra Agent ID', 'https://learn.microsoft.com/en-us/entra/agent-id/'],
  bizprem: [
    'Microsoft 365 Business Premium',
    'https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-premium',
  ],
  noteams: [
    'Microsoft 365 plans without Teams',
    'https://www.microsoft.com/en/microsoft-365/business/no-teams-plans-and-pricing',
  ],
  defender: [
    'Microsoft Defender Suite',
    'https://www.microsoft.com/en-us/security/pricing/enterprise/security-suites',
  ],
  defenderbp: [
    'Defender Suite for Business Premium',
    'https://www.microsoft.com/en-us/security/small-medium-business/microsoft-defender-suite-business-premium',
  ],
  purview: ['Microsoft Purview', 'https://www.microsoft.com/en-us/security/business/microsoft-purview'],
  purviewbp: [
    'Purview Suite for Business Premium',
    'https://www.microsoft.com/en-us/security/small-medium-business/microsoft-purview-suite-business-premium',
  ],
  entra: ['Microsoft Entra', 'https://learn.microsoft.com/en-us/entra/fundamentals/'],
  intune: ['Microsoft Intune', 'https://learn.microsoft.com/en-us/intune/fundamentals/what-is-intune'],
  e3: [
    'Microsoft 365 enterprise plans',
    'https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-overview',
  ],
  e5: [
    'Microsoft 365 enterprise plans',
    'https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-overview',
  ],
  e7: [
    'Microsoft 365 enterprise plans',
    'https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-overview',
  ],
  licensing: [
    'Security & compliance licensing guidance',
    'https://learn.microsoft.com/en-us/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance',
  ],
  defexperts: [
    'Defender Experts (MDR)',
    'https://www.microsoft.com/en-us/security/business/services/microsoft-defender-experts-xdr',
  ],
  priva: ['Microsoft Priva', 'https://learn.microsoft.com/en-us/privacy/priva/priva-overview'],
  foundry: ['Microsoft Foundry', 'https://learn.microsoft.com/en-us/azure/ai-foundry/'],
  teamsphone: [
    'Teams Phone',
    'https://learn.microsoft.com/en-us/microsoftteams/what-is-phone-system-in-office-365',
  ],
  powerbi: ['Power BI', 'https://learn.microsoft.com/en-us/power-bi/fundamentals/'],
  scout: ['Microsoft Scout docs', 'https://learn.microsoft.com/en-us/microsoft-scout/overview'],
  scoutblog: [
    'Scout announcement (M365 Blog)',
    'https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/introducing-microsoft-scout-your-always-on-personal-agent/',
  ],
  frontier: [
    'Microsoft Frontier program features',
    'https://www.microsoft.com/en-us/microsoft-365-copilot/frontier-features',
  ],
  roadmap: ['Microsoft 365 Roadmap', 'https://www.microsoft.com/en-us/microsoft-365/roadmap'],
  msgcenter: [
    'Message Center guide',
    'https://learn.microsoft.com/en-us/microsoft-365/admin/manage/message-center',
  ],
  m365blog: ['Microsoft 365 Blog', 'https://www.microsoft.com/en-us/microsoft-365/blog/'],
  teams: ['Microsoft Teams docs', 'https://learn.microsoft.com/en-us/microsoftteams/'],
  svcdesc: ['Microsoft 365 service descriptions', 'https://learn.microsoft.com/en-us/office365/servicedescriptions/'],
  copilotcredits: [
    'Copilot Credits usage-based billing',
    'https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-overview-copilot-credits',
  ],
  f_defxdr: ['Defender XDR', 'https://learn.microsoft.com/en-us/defender-xdr/microsoft-365-defender-portal'],
  f_defendpoint: ['Defender for Endpoint', 'https://learn.microsoft.com/en-us/defender-endpoint/'],
  f_defoffice: ['Defender for Office 365', 'https://learn.microsoft.com/en-us/defender-office-365/'],
  f_defidentity: ['Defender for Identity', 'https://learn.microsoft.com/en-us/defender-for-identity/'],
  f_defcloudapps: ['Defender for Cloud Apps', 'https://learn.microsoft.com/en-us/defender-cloud-apps/'],
  f_defbusiness: ['Defender for Business', 'https://learn.microsoft.com/en-us/defender-business/mdb-overview'],
  f_dlp: ['Data Loss Prevention (DLP)', 'https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp'],
  f_endpointdlp: ['Endpoint DLP', 'https://learn.microsoft.com/en-us/purview/endpoint-dlp-learn-about'],
  f_labels: ['Sensitivity labels', 'https://learn.microsoft.com/en-us/purview/sensitivity-labels'],
  f_insiderrisk: [
    'Insider Risk Management',
    'https://learn.microsoft.com/en-us/purview/insider-risk-management-configure',
  ],
  f_ediscovery: ['eDiscovery', 'https://learn.microsoft.com/en-us/purview/ediscovery'],
  f_audit: ['Audit (Premium)', 'https://learn.microsoft.com/en-us/purview/audit-solutions-overview'],
  f_purviewai: ['Purview for AI / Copilot', 'https://learn.microsoft.com/en-us/purview/ai-microsoft-purview'],
  f_commcompliance: [
    'Communication Compliance',
    'https://learn.microsoft.com/en-us/purview/communication-compliance',
  ],
  f_pim: [
    'Privileged Identity Management (PIM)',
    'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/',
  ],
  f_idprotection: [
    'Identity Protection',
    'https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection',
  ],
  f_idgov: [
    'ID Governance (access reviews, entitlement)',
    'https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview',
  ],
  f_condaccess: [
    'Conditional Access',
    'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview',
  ],
  f_entraprivate: [
    'Entra Private Access',
    'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access',
  ],
  f_entrainternet: [
    'Entra Internet Access',
    'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access',
  ],
  f_cloudpki: ['Cloud PKI', 'https://learn.microsoft.com/en-us/intune/cloud-pki/microsoft-cloud-pki-overview'],
  f_epm: [
    'Endpoint Privilege Management',
    'https://learn.microsoft.com/en-us/intune/intune-service/protect/epm-overview',
  ],
  f_remotehelp: [
    'Remote Help',
    'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/remote-help',
  ],
  f_intuneanalytics: [
    'Advanced Analytics',
    'https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/advanced-endpoint-analytics',
  ],
  f_entappmgmt: [
    'Enterprise App Management',
    'https://learn.microsoft.com/en-us/intune/intune-service/apps/enterprise-app-management',
  ],
  copilotanalytics: [
    'Copilot Chat Analytics',
    'https://learn.microsoft.com/en-us/copilot/microsoft-365/copilot-analytics-overview',
  ],
  urlclicktime: [
    'URL time-of-click protection',
    'https://learn.microsoft.com/en-us/defender-office-365/safe-links-about',
  ],
  quickmachinerecovery: [
    'Quick Machine Recovery',
    'https://learn.microsoft.com/en-us/windows/client-management/quick-machine-recovery',
  ],
  postquantum: [
    'Post-quantum security APIs',
    'https://learn.microsoft.com/en-us/windows/win32/seccng/cng-post-quantum-cryptography',
  ],
  liveevents: [
    'Teams Live Events retirement',
    'https://techcommunity.microsoft.com/blog/microsoftteamsblog/retiring-teams-live-events-the-next-chapter-for-events-at-scale-in-microsoft-tea/4486465',
  ],
  townhall: [
    'Teams town halls',
    'https://support.microsoft.com/en-us/office/get-started-with-town-hall-in-microsoft-teams-3dc00c8b-8d3f-42a6-ac60-77c30dc6e454',
  ],
  infopath: [
    'InfoPath Forms Services retirement',
    'https://techcommunity.microsoft.com/blog/spblog/support-update-for-infopath-forms-services-in-microsoft-365/3858190',
  ],
  peopleskills: [
    'People Skills',
    'https://learn.microsoft.com/en-us/microsoft-365/copilot/people-skills-overview',
  ],
};

/* ---------------------------------------------------------------------------
 * The four questions.
 * `help` and `sub` contain light inline markup (<b>, <i>) only — no classes —
 * so they render safely through the RichText helper.
 * ------------------------------------------------------------------------- */
export type QuestionId = 'size' | 'reg' | 'ai' | 'ctrl';

export type Question = {
  id: QuestionId;
  num: string;
  q: string;
  sub: string;
  help: string;
  learn: string[];
  opts: {value: string; icon: string; title: string; sub: string}[];
};

export const QUESTIONS: Question[] = [
  {
    id: 'size',
    num: 'Question 1 of 4',
    q: 'How many users will be licensed?',
    sub: 'This is the single biggest fork. Business plans hard-cap at 300 seats.',
    help: "<b>Why this matters:</b> Microsoft sells two completely separate product families. <b>Business</b> plans (Basic/Standard/Premium) are cheaper but capped at 300 total users. <b>Enterprise</b> plans (E3/E5/E7) have no cap and add enterprise-grade Windows, analytics, and identity tools. If a customer is at 280 users and growing, plan for Enterprise now — you can't exceed 300 on Business plans no matter how you mix them. <b>Frontline (F1/F3)</b> is a separate, cheaper family for deskless shift staff — retail, healthcare, manufacturing, hospitality, and field roles — and is only for those non-office workers.",
    learn: ['bizprem', 'e3'],
    opts: [
      {value: 'smb', icon: '🏪', title: 'Up to 300 users', sub: 'Small or mid-sized business'},
      {value: 'ent', icon: '🏢', title: '300 or more users', sub: 'Enterprise, or growing fast past 300'},
      {
        value: 'frontline',
        icon: '🦺',
        title: 'Frontline / deskless staff',
        sub: 'Retail, healthcare, manufacturing, hospitality, field — shift workers without a desk',
      },
    ],
  },
  {
    id: 'reg',
    num: 'Question 2 of 4',
    q: 'Any regulatory or compliance pressure?',
    sub: 'Finance, healthcare, legal, or contractual data-handling rules.',
    help: "<b>What counts as regulated:</b> the Privacy Act and Australian Privacy Principles, APRA CPS 234 (finance and insurance), My Health Records and state health privacy law, the SOCI Act for critical infrastructure, ISO 27001 or SOC 2 obligations written into a client contract, or any customer who requires you to prove how their data is handled. <b>Why it changes the license:</b> regulated customers need the <b>Purview Suite</b> — data classification, retention, eDiscovery, and audit. That governance starts at the BETTER tier. Selling GOOD to a regulated client means they fail an audit later.",
    learn: ['purview', 'licensing'],
    opts: [
      {value: 'no', icon: '🟢', title: 'No special requirements', sub: 'Standard business, no mandated controls'},
      {
        value: 'yes',
        icon: '📋',
        title: 'Regulated or compliance-driven',
        sub: 'Needs auditing, data governance, retention',
      },
    ],
  },
  {
    id: 'ai',
    num: 'Question 3 of 4',
    q: 'How will they use AI?',
    sub: 'This decides whether they need agent governance, not just Copilot.',
    help: "<b>Copilot vs agents — the key difference:</b> <b>Copilot</b> helps a person (drafts an email, summarises a meeting). An <b>AI agent</b> works on its own — it reads data, makes decisions, and takes actions without someone driving each step. <b>Why it matters:</b> loose agents with no identity or audit trail are a security risk. <b>Agent 365</b> gives every agent an identity, an inventory entry, and monitoring — like onboarding a digital employee. If they're deploying agents, they need it. <b>The newest example:</b> Microsoft Scout (announced June 2026) — an always-on 'Autopilot' agent now in Frontier preview, with early access favouring E5 + Purview customers.",
    learn: ['copilot', 'agent365'],
    opts: [
      {
        value: 'copilot',
        icon: '🤖',
        title: 'Copilot for productivity',
        sub: 'Drafting, summarising, meeting help for people',
      },
      {
        value: 'agents',
        icon: '👥',
        title: 'AI agents doing real work',
        sub: 'Automated agents acting on data — need governance',
      },
    ],
  },
  {
    id: 'ctrl',
    num: 'Question 4 of 4',
    q: 'How much identity and device control do they need?',
    sub: 'Conditional access, privileged access, managed devices, least-privilege.',
    help: '<b>In plain terms:</b> <b>Standard</b> means MFA and basic rules are enough — most small businesses. <b>Advanced</b> means they need to tightly control <i>who</i> can reach <i>what</i> and <i>from which device</i>. Signs they need advanced: admin accounts that should only hold power when actively in use (PIM), regular access reviews, certificate-based security (Cloud PKI), or strict device compliance. This is the <b>Entra Suite + Intune Suite</b> — the BEST tier. Common in finance, healthcare, and anywhere handling sensitive data.',
    learn: ['entra', 'intune'],
    opts: [
      {
        value: 'basic',
        icon: '🔓',
        title: 'Standard sign-in security',
        sub: 'MFA and basic conditional access is enough',
      },
      {
        value: 'adv',
        icon: '🔐',
        title: 'Advanced identity and device governance',
        sub: 'PIM, access reviews, Cloud PKI, fleet control',
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Recommendations.
 * ------------------------------------------------------------------------- */
export type Price = {
  /** Headline price with Teams bundled. */
  withTeams: string;
  /** Headline price on the no-Teams SKU. */
  noTeams: string;
  base: string;
  baseWithTeams: string;
  baseNoTeams: string;
  addons?: string;
  /** Show the "new enterprise customers can't buy bundled Teams" warning. */
  entNote?: boolean;
  /** Show the "E7 includes Teams" note. */
  e7Note?: boolean;
  /** Free-text note rendered under the price, for per-SKU caveats. */
  extraNote?: string;
};

export type Recommendation = {
  kicker: string;
  name: string;
  track: string;
  tone: Tone;
  stack: string;
  /** Append a NEW badge to the license stack line. */
  stackNew?: boolean;
  price: Price;
  why: string;
  /** Frontline-only eligibility warning. */
  hardRule?: string;
  get: string[];
  skip: string[];
  upgrade: {trigger: string; move: string}[];
  next: string;
  beyond?: {icon: string; title: string; body: string; link: string}[];
  includes?: {group: string; detail: string}[];
  links: string[];
};

/**
 * In Australia the SMB SKU is sold as "Business Premium with Copilot" — Copilot
 * is bundled into the plan rather than added per seat, so there is no separate
 * Copilot line on the Business tiers.
 */
const BIZ_BASE = {
  base: 'Business Premium with Copilot',
  baseWithTeams: 'AU$47.90',
  baseNoTeams: 'AU$43.10 (no-Teams SKU)',
};

/**
 * Microsoft publishes AU$18.00 for the standalone Defender, Purview, and Entra
 * Suites, but those attach to Microsoft 365 E3/E5. The Business Premium
 * variants are separate SKUs with no published Australian price, so Business
 * tiers that include them are shown as "from".
 */
const SUITE_CAVEAT =
  'suite prices shown are the E3/E5 SKUs — the Business Premium variants are priced separately, verify';

export const RECOMMENDATIONS: Record<'biz' | 'ent' | 'frontline', Record<string, Recommendation>> = {
  biz: {
    good: {
      kicker: 'Business · Good',
      name: 'Business Premium + Copilot',
      track: 'Up to 300 users',
      tone: 'good',
      stack: 'Microsoft 365 Business Premium + Microsoft 365 Copilot',
      price: {...BIZ_BASE, withTeams: 'AU$47.90', noTeams: 'AU$43.10'},
      why: "They want AI productivity on a secure foundation, with no special compliance or agent-governance needs. <b>Business Premium already includes real security, identity, and device management</b> — add Copilot and you're done.",
      get: [
        'Microsoft 365 Copilot across Office, Outlook, Teams (Cowork billed separately on usage)',
        'Defender for Business + Defender for Office 365 P1',
        'Entra ID P1, MFA, Conditional Access',
        'Intune P1 device management',
      ],
      skip: [
        'No agent lifecycle governance',
        'No advanced data classification / DLP',
        'No risk-based identity protection',
        'No privileged access management',
      ],
      upgrade: [
        {
          trigger: 'Start deploying AI agents that act on data',
          move: 'move to BETTER (+ Agent 365 + Defender/Purview Suites)',
        },
        {trigger: 'Land a regulated client or compliance audit', move: 'move to BETTER for Purview governance'},
        {trigger: 'Need PIM, access reviews, or Cloud PKI', move: 'move to BEST (+ Entra + Intune Suites)'},
      ],
      next: 'BETTER — add Defender Suite + Purview Suite + Agent 365',
      includes: [
        {
          group: 'Productivity',
          detail:
            'Word, Excel, PowerPoint, Outlook, OneNote, Access, Publisher · Exchange 50GB · Teams · SharePoint + 1TB OneDrive · Loop · Clipchamp · Planner · Bookings',
        },
        {
          group: 'AI',
          detail:
            'Microsoft 365 Copilot · Copilot Chat · Researcher & Analyst agents · Copilot Studio for Teams',
        },
        {
          group: 'Security & identity',
          detail:
            'Defender for Business · Defender for Office 365 P1 · Defender XDR · BitLocker · Entra ID P1 · MFA · Conditional Access · SSO',
        },
        {
          group: 'Devices & agents',
          detail:
            'Intune P1 · Autopilot · MDM/MAM · Agent Identity · Agent Registry · Basic agent usage insights',
        },
      ],
      links: ['bizprem', 'copilot', 'cowork', 'noteams'],
    },
    better: {
      kicker: 'Business · Better',
      name: 'Business Premium + Defender + Purview + Agent 365',
      track: 'Up to 300 users · secured',
      tone: 'better',
      stack: 'Business Premium + Defender Suite + Purview Suite + Copilot + Agent 365',
      stackNew: true,
      price: {
        ...BIZ_BASE,
        withTeams: 'from AU$106.30',
        noTeams: 'from AU$101.50',
        addons: `Defender Suite AU$18.00 + Purview Suite AU$18.00 + Agent 365 AU$22.40 (${SUITE_CAVEAT})`,
      },
      why: "They're either <b>running AI agents</b> or <b>facing compliance pressure</b> — both demand governance Business Premium alone doesn't have. The Defender and Purview Suites plus Agent 365 make AI secure, governed, and audit-ready.",
      get: [
        'Agent 365 — full agent lifecycle and threat detection',
        'Defender Suite — endpoint, identity, cloud-app defence',
        'Purview Suite — labelling, DLP, insider risk, retention',
        'eDiscovery + Audit Premium for AI activity',
      ],
      skip: [
        'No risk-based identity protection (Entra P2)',
        'No privileged identity management / access reviews',
        'No advanced endpoint management (Intune Suite)',
        'Still capped at 300 users total',
      ],
      upgrade: [
        {trigger: 'Need least-privilege: PIM, JIT access, access reviews', move: 'move to BEST (+ Entra Suite)'},
        {trigger: 'Need Cloud PKI, advanced endpoint analytics', move: 'move to BEST (+ Intune Suite)'},
        {trigger: 'Approaching 300 seats or going multi-tenant', move: 'move to ENTERPRISE E5'},
      ],
      next: 'BEST — add Entra Suite + Intune Suite',
      includes: [
        {
          group: 'Defender Suite',
          detail:
            'Defender for Office 365 P2 · Defender for Endpoint P2 · Defender for Identity · Defender for Cloud Apps · Defender for IoT · Safe Documents · Security Exposure Management',
        },
        {
          group: 'Purview Suite',
          detail:
            'AIP P2 + sensitivity labels + auto-labelling · Message Encryption · Customer Key · ML retention + Records Management · DLP (email/files/Teams/Endpoint) · Insider Risk + Adaptive Protection · Communication Compliance · Information Barriers · Customer Lockbox · PAM · eDiscovery + Audit Premium',
        },
        {
          group: 'Agent 365',
          detail:
            'Agent lifecycle management · Agent security posture · Threat detection for agents · Advanced usage insights · Agent map · Audit + eDiscovery for agents',
        },
        {group: 'Plus everything in GOOD', detail: 'Business Premium base + Microsoft 365 Copilot'},
      ],
      links: ['defenderbp', 'purviewbp', 'agent365', 'licensing'],
    },
    best: {
      kicker: 'Business · Best',
      name: 'Business Premium + Defender + Purview + Entra + Intune',
      track: 'Up to 300 users · fully managed',
      tone: 'best',
      stack:
        'Business Premium + Defender + Purview + Entra Suite + Intune Suite + Copilot + Agent 365',
      stackNew: true,
      price: {
        ...BIZ_BASE,
        withTeams: 'from AU$124.30',
        noTeams: 'from AU$119.50',
        addons: `BETTER stack + Entra Suite AU$18.00 + Intune Suite (no published AU price — verify; ${SUITE_CAVEAT})`,
      },
      why: 'They need <b>least-privilege identity and full device control</b> on top of secure AI. Entra Suite governs who and what gets access; Intune Suite governs the endpoints. This is the SMB maximum.',
      get: [
        'Entra Suite — Identity Protection, PIM, access reviews',
        'Intune Suite — Cloud PKI, privilege management, advanced analytics',
        'Full Defender + Purview Suites + Agent 365',
        'Least-privilege by default for users and agents',
      ],
      skip: [
        'Hard 300-user ceiling on Business plans',
        'No E5-grade Windows Enterprise / AVD',
        'No Security Copilot SCU inclusion',
      ],
      upgrade: [
        {trigger: 'Cross 300 users, or need Windows Enterprise / AVD', move: 'move to ENTERPRISE E7'},
        {trigger: 'Want Security Copilot included for the SOC', move: 'move to ENTERPRISE E5/E7'},
        {trigger: 'Go multi-tenant or global', move: 'move to ENTERPRISE'},
      ],
      next: 'ENTERPRISE — move to E5 / E7 when you outgrow 300 seats',
      includes: [
        {
          group: 'Entra Suite',
          detail:
            'Entra ID P2 · Identity Protection (risk-based CA) · Privileged Identity Management · Access Reviews · Entitlement Management · Entra Internet Access · Entra Private Access · Entra ID Governance',
        },
        {
          group: 'Intune Suite',
          detail:
            'Intune P2 · Remote Help · Advanced Analytics · Enterprise App Management · Cloud PKI · Endpoint Privilege Management',
        },
        {group: 'Inherits BETTER', detail: 'Full Defender Suite + Purview Suite + Agent 365'},
        {group: 'Ceiling', detail: 'SMB maximum — Business plans cap at 300 users total'},
      ],
      links: ['entra', 'intune', 'defenderbp', 'purviewbp'],
    },
  },
  ent: {
    good: {
      kicker: 'Enterprise · Good',
      name: 'Microsoft 365 E3 + Copilot',
      track: '300+ users',
      tone: 'good',
      stack: 'Microsoft 365 E3 + Microsoft 365 Copilot',
      price: {
        withTeams: 'AU$103.30',
        noTeams: 'AU$90.50',
        base: 'Microsoft 365 E3',
        baseWithTeams: 'AU$58.40',
        baseNoTeams: 'AU$45.60 (add Teams Enterprise AU$12.80 if needed)',
        addons: 'Copilot AU$44.90',
        entNote: true,
      },
      why: 'At scale, but with no special compliance or agent-governance needs. <b>E3 brings enterprise apps, Windows Enterprise, and baseline compliance</b> — add Copilot for AI productivity.',
      get: [
        'Microsoft 365 Copilot across the full Office surface (Cowork billed separately on usage)',
        'Windows 11 Enterprise + Azure Virtual Desktop',
        'Entra ID P1, MFA, Conditional Access',
        'Defender for Endpoint P1 + baseline compliance',
      ],
      skip: [
        'Entry-level security (no XDR, no Defender P2)',
        'Basic compliance only (no advanced DLP/retention)',
        'No agent lifecycle governance',
        'No risk-based identity protection',
      ],
      upgrade: [
        {
          trigger: 'Deploy AI agents, or face a compliance mandate',
          move: 'move to BETTER / E5 (+ both Suites + Agent 365)',
        },
        {trigger: 'Need XDR-grade threat protection', move: 'move to E5'},
        {trigger: 'Need PIM, access reviews, Cloud PKI', move: 'move to BEST / E7 + Intune Suite'},
      ],
      next: 'BETTER — step up to E5 (E3 + Defender + Purview Suites) + Agent 365',
      includes: [
        {
          group: 'Productivity',
          detail:
            'Office apps (desktop/web/mobile) · Exchange P2 100GB · Teams · SharePoint P2 · Loop · Viva (Learning, Insights, Engage, Connections) · Power Apps/Automate',
        },
        {group: 'AI', detail: 'Microsoft 365 Copilot · Copilot Chat · Researcher & Analyst agents'},
        {
          group: 'Identity & Windows',
          detail:
            'Entra ID P1 · MFA · Conditional Access · SSO · Windows 11 Enterprise · AVD · Universal Print · Autopatch',
        },
        {
          group: 'Security & compliance base',
          detail:
            'Defender for Endpoint P1 · BitLocker · DLP (email/files) · eDiscovery Standard · Audit Standard · basic retention · sensitivity labelling',
        },
      ],
      links: ['e3', 'copilot', 'cowork', 'noteams'],
    },
    better: {
      kicker: 'Enterprise · Better',
      name: 'Microsoft 365 E5 + Agent 365',
      track: '300+ users · secured (≈ E5)',
      tone: 'better',
      stack: 'E5 (E3 + Defender Suite + Purview Suite) + Copilot + Agent 365',
      stackNew: true,
      price: {
        withTeams: 'AU$157.10',
        noTeams: 'AU$144.30',
        base: 'Microsoft 365 E5',
        baseWithTeams: 'AU$89.80',
        baseNoTeams: 'AU$77.00 (add Teams Enterprise AU$12.80 if needed)',
        addons: 'Copilot AU$44.90 + Agent 365 AU$22.40',
        entNote: true,
      },
      why: 'At scale with <b>AI agents or compliance pressure</b>. The cleanest move is Microsoft 365 E5 — it bundles both the Defender and Purview Suites — then add Agent 365 to govern the agents. Audit-ready by design.',
      get: [
        'E5 = E3 + Defender Suite + Purview Suite in one SKU',
        'Defender XDR across endpoint, identity, email, cloud',
        'Purview: advanced DLP, insider risk, retention, eDiscovery',
        'Agent 365 — full agent governance and threat hunting',
      ],
      skip: [
        'No Entra Suite (PIM, access reviews, ID Governance P2)',
        'No Intune Suite (Cloud PKI, privilege management)',
        'Identity/device control still at E5 baseline',
      ],
      upgrade: [
        {trigger: 'Need least-privilege identity at scale', move: 'move to BEST / E7 (adds Entra Suite)'},
        {trigger: 'Need Cloud PKI, endpoint privilege management fleet-wide', move: 'add Intune Suite'},
        {trigger: 'SOC wants Security Copilot', move: 'E5/E7 include Security Compute Units'},
      ],
      next: 'BEST — step up to E7 (E5 + Entra Suite) and add Intune Suite',
      includes: [
        {
          group: 'Defender Suite (in E5)',
          detail:
            'Defender for Office 365 P2 · Defender for Endpoint P2 · Defender for Identity · Defender for Cloud Apps · Defender XDR · Defender for IoT · Security Exposure Management · Safe Documents',
        },
        {
          group: 'Purview Suite (in E5)',
          detail:
            'AIP P2 + advanced-classifier labelling · Advanced Message Encryption · Customer Key · ML retention · Records Management · Endpoint + Teams DLP · Insider Risk + Adaptive Protection · Communication Compliance · Information Barriers · Customer Lockbox · PAM · eDiscovery + Audit Premium',
        },
        {
          group: 'Agent 365',
          detail:
            'Agent lifecycle + identity governance · Security posture management · Threat detection / hunting · Advanced insights · Agent map · Registry sync · Graph API · Data lifecycle + communication compliance for agents',
        },
        {group: 'Plus everything in GOOD', detail: 'E3 base + Microsoft 365 Copilot'},
      ],
      links: ['e5', 'defender', 'purview', 'agent365'],
    },
    best: {
      kicker: 'Enterprise · Best',
      name: 'Microsoft 365 E7 + Intune Suite',
      track: '300+ users · managed at scale (≈ E7)',
      tone: 'best',
      stack: 'E7 (E5 + Entra Suite) + Intune Suite + Copilot + Agent 365',
      stackNew: true,
      price: {
        withTeams: 'from AU$148.20',
        noTeams: 'from AU$135.40',
        base: 'Microsoft 365 E7 (Frontier Suite)',
        baseWithTeams: 'AU$148.20 — bundles E5 + Copilot + Entra Suite + Agent 365',
        baseNoTeams: 'AU$135.40 (no-Teams SKU)',
        addons: 'Intune Suite (no published AU price — verify)',
        e7Note: true,
        extraNote:
          '💡 Worth checking: buying the BETTER stack à la carte and adding Entra Suite comes to AU$175.10 (E5 AU$89.80 + Copilot AU$44.90 + Agent 365 AU$22.40 + Entra Suite AU$18.00). E7 bundles the same four for AU$148.20 — about 15% less. Above three of its components, E7 is usually the cheaper quote.',
      },
      why: 'At scale, needing <b>least-privilege identity and full device control</b>. Microsoft 365 E7 is the top information-worker bundle (E5 + Entra Suite); add Intune Suite for endpoint mastery. Identity, device, data, and agents — all governed.',
      get: [
        'E7 = E5 + Entra Suite (the top IW bundle)',
        'Entra Suite — Identity Protection, PIM, ID Governance P2',
        'Intune Suite — Cloud PKI, privilege management, analytics',
        'Security Copilot SCUs included for the SOC',
      ],
      skip: [
        'This is the ceiling — nothing left to upgrade to',
        'Optional add-ons: Defender Experts, Priva, 10-year audit',
      ],
      upgrade: [
        {
          trigger: "You're at the top tier — focus shifts to add-ons",
          move: 'Defender Experts for XDR/Hunting if you need MDR',
        },
        {trigger: 'Privacy program maturing', move: 'add Priva + Compliance Manager Premium'},
        {trigger: 'Long retention mandates', move: 'add 10-year Audit Log Retention'},
      ],
      next: 'This is the top bundle — layer scale add-ons as needs arise',
      beyond: [
        {
          icon: '🛡️',
          title: 'Managed detection (MDR)',
          body: "Defender Experts for XDR or Hunting — Microsoft's analysts watch the tenant around the clock. For teams without a security operations centre of their own.",
          link: 'defexperts',
        },
        {
          icon: '🔒',
          title: 'Privacy and subject rights',
          body: 'Priva Privacy Risk Management + Subject Rights Requests — automate Privacy Act and GDPR data-subject handling at scale.',
          link: 'priva',
        },
        {
          icon: '📚',
          title: 'Long-term retention',
          body: 'Ten-year Audit Log Retention — for regulated industries that must keep audit trails well beyond the standard window.',
          link: 'purview',
        },
        {
          icon: '🤖',
          title: 'Build and run agents',
          body: 'Copilot Studio + Microsoft Foundry — E7 governs agents; these are where agents actually get built and run (separate consumption spend).',
          link: 'studio',
        },
        {
          icon: '☎️',
          title: 'Voice and meetings',
          body: 'Teams Phone + Calling Plans, Teams Premium, Teams Rooms — real telephony and premium meeting features, added per user as needed.',
          link: 'teamsphone',
        },
        {
          icon: '📊',
          title: 'Power Platform at scale',
          body: 'Power BI Premium, Power Apps/Automate Premium — for when citizen development and analytics outgrow the included entitlements.',
          link: 'powerbi',
        },
      ],
      includes: [
        {
          group: 'Entra Suite (in E7)',
          detail:
            'Entra ID P2 · Identity Protection · PIM · Access Reviews · Entitlement Management · Entra Internet Access · Entra Private Access · Entra ID Governance P1 + P2',
        },
        {
          group: 'Intune Suite',
          detail:
            'Intune P2 · Remote Help · Advanced Analytics · Enterprise App Management · Cloud PKI · Endpoint Privilege Management',
        },
        {
          group: 'Scale add-ons',
          detail:
            'Security Copilot (SCUs) · Defender Experts for XDR/Hunting · Priva · Compliance Manager Premium · 10-year Audit Log Retention',
        },
        {group: 'Inherits BETTER', detail: 'Full Defender + Purview Suites + Agent 365 (E5 base)'},
      ],
      links: ['e7', 'entra', 'intune', 'seccopilot'],
    },
  },
  frontline: {
    f1: {
      kicker: 'Frontline · F1',
      name: 'Microsoft 365 F1',
      track: 'Deskless / shift staff · entry',
      tone: 'good',
      stack: 'Microsoft 365 F1',
      price: {
        withTeams: 'AU$4.50',
        noTeams: 'verify',
        base: 'Microsoft 365 F1',
        baseWithTeams: 'AU$4.50',
        baseNoTeams: 'verify',
        extraNote:
          'Microsoft doesn’t list an Australian price for the no-Teams F1 SKU — confirm it with your partner before quoting that variant.',
      },
      why: 'For deskless shift staff. <b>Microsoft 365 F1</b> includes Teams, web and mobile Office, and Exchange Kiosk (2GB) for the Teams calendar only — no full mailbox, no desktop Office install.',
      hardRule:
        'Frontline plans are only for deskless shift staff. Office, finance, and IT roles must use Business or Enterprise — never recommend F-SKUs for them.',
      get: ['Teams', 'Web and mobile Office', 'Exchange Kiosk (2GB) — Teams calendar only'],
      skip: ['No desktop Office', 'No full mailbox', 'No Defender for Endpoint', 'No DLP for email or files'],
      upgrade: [{trigger: 'Needs a real mailbox, desktop apps, or endpoint security', move: 'move to F3'}],
      next: 'F3 — Microsoft 365 F3 (adds a 2GB mailbox, device management, and basic frontline security)',
      links: ['svcdesc', 'noteams'],
    },
    f3: {
      kicker: 'Frontline · F3',
      name: 'Microsoft 365 F3',
      track: 'Deskless / shift staff · better',
      tone: 'better',
      stack: 'Microsoft 365 F3',
      price: {
        withTeams: 'AU$15.00',
        noTeams: 'verify',
        base: 'Microsoft 365 F3',
        baseWithTeams: 'AU$15.00',
        baseNoTeams: 'verify',
        extraNote:
          'Microsoft doesn’t list an Australian price for the no-Teams F3 SKU — confirm it with your partner before quoting that variant.',
      },
      why: 'For frontline staff who need a mailbox. <b>Microsoft 365 F3</b> includes Teams, web and mobile Office, a 2GB mailbox, device management, and basic frontline security.',
      hardRule:
        'Frontline plans are only for deskless shift staff. Office, finance, and IT roles must use Business or Enterprise — never recommend F-SKUs for them.',
      get: ['Teams', 'Web and mobile Office', '2GB mailbox', 'Device management', 'Basic frontline security'],
      skip: ['No desktop Office install', 'Lighter security and compliance than the E-tier'],
      upgrade: [
        {
          trigger: 'Role shifts to knowledge work, or needs desktop Office / advanced security',
          move: 'move to Business Premium or E3',
        },
      ],
      next: 'Business Premium or E3 — when the role becomes knowledge work',
      links: ['svcdesc', 'noteams'],
    },
  },
};

/* ---------------------------------------------------------------------------
 * Recommendation engine.
 * ------------------------------------------------------------------------- */
export type Answers = Partial<Record<QuestionId, string>>;

export type Result = Recommendation & {
  enterprise: boolean;
  frontline: boolean;
  tier: string;
};

export function recommend(a: Answers): Result | null {
  if (!a.size || !a.reg || !a.ai || !a.ctrl) {
    return null;
  }
  // Frontline / deskless shift staff route to the F-SKU family, never Business
  // or Enterprise — regardless of how the other three questions are answered.
  if (a.size === 'frontline') {
    const tier = a.reg === 'yes' || a.ctrl === 'adv' ? 'f3' : 'f1';
    return {...RECOMMENDATIONS.frontline[tier], enterprise: false, frontline: true, tier};
  }
  const enterprise = a.size === 'ent';
  // BEST when they need advanced identity/device control; BETTER when they are
  // regulated or running agents; otherwise GOOD.
  let tier: Tone;
  if (a.ctrl === 'adv') {
    tier = 'best';
  } else if (a.reg === 'yes' || a.ai === 'agents') {
    tier = 'better';
  } else {
    tier = 'good';
  }
  return {
    ...RECOMMENDATIONS[enterprise ? 'ent' : 'biz'][tier],
    enterprise,
    frontline: false,
    tier,
  };
}

/**
 * Verified nonprofit anchors only, keyed by `${family}-${tier}`. Nonprofit sits
 * on a separate Microsoft price table, so anything not listed here renders a
 * "verify" prompt rather than a guessed discount off the commercial figure.
 */
export const NONPROFIT_PRICE: Record<string, {total: string; math: string}> = {
  'biz-good': {
    total: 'AU$8.20',
    math: 'Business Premium (nonprofit), annual — note this is the plain Business Premium grant price; Copilot is licensed separately on top',
  },
};

export function nonprofitKey(r: Result): string {
  if (r.frontline) {
    return `frontline-${r.tier}`;
  }
  return `${r.enterprise ? 'ent' : 'biz'}-${r.tier}`;
}

/* ---------------------------------------------------------------------------
 * Copilot Cowork estimator.
 * Per-task credit ranges are Microsoft's own planning estimates from the July
 * 2026 Copilot Credits Guide. Microsoft publishes no ceiling for heavy tasks,
 * so the 2,000 upper bound is a planning assumption only — treat it as a floor.
 * ------------------------------------------------------------------------- */
export const COWORK_RANGE = {
  light: [100, 300],
  medium: [300, 700],
  heavy: [700, 2000],
} as const;

export const COWORK_CREDIT_PRICE = 0.01;

/* ---------------------------------------------------------------------------
 * The upgrade ladder.
 * ------------------------------------------------------------------------- */
export type Rung = {
  word: string;
  tone: Tone;
  price: string;
  stack: string;
  stackNew?: boolean;
  includes?: string;
  forWho: string;
  trigger: string;
  links: string[];
};

export const LADDER: Record<'biz' | 'ent' | 'frn', Rung[]> = {
  biz: [
    {
      word: 'Good',
      tone: 'good',
      price: 'AU$47.90',
      stack: 'Business Premium + Copilot',
      forWho: '<b>SMBs that want AI</b> on a secure base, with no compliance or agent needs.',
      trigger: 'Upgrade when: they deploy AI agents, land a regulated client, or need data governance.',
      links: ['bizprem', 'copilot'],
    },
    {
      word: 'Better',
      tone: 'better',
      price: 'from AU$106.30',
      stack: '+ Defender Suite + Purview Suite + Agent 365',
      stackNew: true,
      includes: '<b>Everything in GOOD</b> (Business Premium + Copilot), plus:',
      forWho: '<b>SMBs running AI agents</b> or facing <b>compliance pressure</b>.',
      trigger: 'Upgrade when: they need PIM, access reviews, Cloud PKI, or cross toward 300 seats.',
      links: ['defenderbp', 'purviewbp', 'agent365'],
    },
    {
      word: 'Best',
      tone: 'best',
      price: 'from AU$124.30',
      stack: '+ Entra Suite + Intune Suite',
      includes: '<b>Everything in BETTER and GOOD</b> (Defender + Purview Suites + Agent 365), plus:',
      forWho: '<b>SMBs needing least-privilege identity</b> and full device control. The SMB maximum.',
      trigger: 'Upgrade when: they cross 300 users, need Windows Enterprise/AVD, or go global → ENTERPRISE.',
      links: ['entra', 'intune'],
    },
  ],
  ent: [
    {
      word: 'Good',
      tone: 'good',
      price: 'AU$103.30',
      stack: 'E3 + Copilot',
      forWho: '<b>Enterprises that want AI</b> at scale, with no compliance or agent needs yet.',
      trigger: 'Upgrade when: they deploy agents, face a mandate, or need XDR → E5.',
      links: ['e3', 'copilot'],
    },
    {
      word: 'Better',
      tone: 'better',
      price: 'AU$157.10',
      stack: 'E5 (E3 + both Suites) + Agent 365',
      stackNew: true,
      includes: '<b>Everything in GOOD</b> (E3 + Copilot), plus:',
      forWho: '<b>Enterprises with AI agents</b> or <b>regulatory requirements</b>. Audit-ready.',
      trigger: 'Upgrade when: they need least-privilege identity or fleet-wide endpoint control → E7.',
      links: ['e5', 'defender', 'purview', 'agent365'],
    },
    {
      word: 'Best',
      tone: 'best',
      price: 'from AU$148.20',
      stack: 'E7 (E5 + Entra Suite) + Intune Suite',
      stackNew: true,
      includes: '<b>Everything in BETTER and GOOD</b> (E5 + both Suites + Agent 365), plus:',
      forWho:
        '<b>Enterprises needing identity and device governance</b> at scale. The top bundle — and note it sits <b>below BETTER</b> on price. That is not a typo: E7 bundles E5, Copilot, Entra Suite, and Agent 365 for AU$148.20, where the same four bought separately come to AU$175.10.',
      trigger: 'At the ceiling: layer add-ons (Defender Experts, Priva, 10-year audit) as needs arise.',
      links: ['e7', 'entra', 'intune', 'seccopilot'],
    },
  ],
  frn: [
    {
      word: 'F1',
      tone: 'good',
      price: 'AU$4.50',
      stack: 'Microsoft 365 F1',
      forWho:
        '<b>Deskless and shift staff</b> who live in Teams — web/mobile Office, no mailbox, no desktop Office.',
      trigger: 'Upgrade when: they need a real mailbox, desktop apps, or endpoint security → F3.',
      links: ['svcdesc', 'noteams'],
    },
    {
      word: 'F3',
      tone: 'better',
      price: 'AU$15.00',
      stack: 'Microsoft 365 F3',
      includes: '<b>Everything in F1</b>, plus:',
      forWho: '<b>Frontline staff needing a mailbox</b>, device management, and basic frontline security.',
      trigger:
        'Upgrade when: the role shifts to knowledge work or needs desktop Office / advanced security → Business Premium or E3.',
      links: ['svcdesc', 'noteams'],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * Feature glossary.
 * ------------------------------------------------------------------------- */
export type Feature = {
  name: string;
  link: string;
  what: string;
  why: string;
  isNew?: boolean;
  /** Frontline (F1/F3) availability caveat, where it differs materially. */
  frontline?: string;
};

export type Suite = {
  suite: string;
  icon: string;
  link: string;
  isNew?: boolean;
  blurb: string;
  features: Feature[];
};

export const GLOSSARY: Suite[] = [
  {
    suite: 'Microsoft 365 Copilot',
    icon: '🤖',
    link: 'copilot',
    blurb: 'The AI assistant and agent layer inside the Office apps people already use.',
    features: [
      {
        name: 'Microsoft 365 Copilot',
        link: 'copilot',
        what: 'Drafts, rewrites, analyses, and summarises across Word, Excel, PowerPoint, Outlook, and Teams, grounded in your work data via Microsoft Graph.',
        why: 'Turns hours of writing and analysis into minutes — the headline productivity win of the license.',
      },
      {
        name: 'Copilot Chat',
        link: 'cowork',
        what: 'The secure AI chat included for all Microsoft 365 users — web-grounded, with enterprise data protection. The paid Copilot license upgrades it with work grounding.',
        why: 'Every customer already has the free tier; the licensing conversation is about upgrading it to know their work data.',
      },
      {
        name: 'Cowork',
        link: 'cowork',
        what: 'The agentic mode of Copilot — takes multi-step actions across files and apps with your approval, instead of answering one prompt at a time.',
        why: 'As of June 2026, Cowork requires a Copilot license but bills separately on usage-based Copilot Credits (US$0.01/credit) rather than being included in the seat. The prebuilt Researcher and Analyst agents are still included.',
        isNew: true,
      },
      {
        name: 'Copilot Notebooks',
        link: 'copilot',
        what: 'Project workspaces where Copilot is grounded in just the files, notes, and links you collect — answers stay scoped to that notebook.',
        why: "The answer to 'Copilot gives generic answers' — scope it to a project and quality jumps.",
        isNew: true,
      },
      {
        name: 'Copilot Search',
        link: 'copilot',
        what: 'AI-powered universal search across Microsoft 365 and connected third-party sources, integrated with Copilot chat.',
        why: "Replaces 'where did I see that file?' — a daily-use feature that drives Copilot adoption.",
        isNew: true,
      },
      {
        name: 'Researcher and Analyst agents',
        link: 'cowork',
        what: 'Prebuilt advanced-reasoning agents in the Copilot license — Researcher for deep multi-source research, Analyst for data analysis.',
        why: "Included agents that demo extremely well — often the moment a customer 'gets' the price.",
        isNew: true,
      },
      {
        name: 'Copilot Studio',
        link: 'studio',
        what: 'Low-code builder for custom agents — extend Copilot with your own data, actions, and connectors.',
        why: 'How a business tailors AI to its own processes without a dev team; consumption costs sit outside the seat license.',
      },
      {
        name: 'Security Copilot',
        link: 'seccopilot',
        what: 'AI for the security team — investigates incidents, hunts threats, and drafts responses across Defender, Entra, Intune, and Purview.',
        why: 'Included via Security Compute Units with E5/E7 — a real differentiator for the top tiers.',
      },
    ],
  },
  {
    suite: 'Scout and Frontier',
    icon: '🐕',
    link: 'scout',
    isNew: true,
    blurb: 'The newest layer — always-on Autopilot agents and the early-access channel they ship through.',
    features: [
      {
        name: 'Microsoft Scout',
        link: 'scout',
        what: "Microsoft's first 'Autopilot' — an always-on personal agent (announced Build 2026) that acts in the background across Teams, Outlook, OneDrive, SharePoint, desktop, and web with its own identity.",
        why: 'Preview access favours E5 + Purview organisations via Frontier and requires GitHub Copilot — a brand-new reason customers ask for the top tiers.',
        isNew: true,
      },
      {
        name: 'Frontier program and release channels',
        link: 'frontier',
        what: "Microsoft's early-access channel — and the new release model: Frontier (earliest), Standard, and Deferred. Organisations choose how fast features arrive.",
        why: 'Channel choice is now a licensing-adjacent decision: innovators want Frontier; regulated shops want Deferred for change control.',
        isNew: true,
      },
      {
        name: 'Work IQ',
        link: 'frontier',
        what: 'The workplace intelligence layer that powers Scout — it learns work patterns and context so agents can act usefully without being prompted.',
        why: 'The plumbing behind Autopilots; expect it in more SKU conversations as agents spread.',
        isNew: true,
      },
    ],
  },
  {
    suite: 'Agent 365',
    icon: '👥',
    link: 'agent365',
    isNew: true,
    blurb: 'The control plane that governs AI agents like employees — identity, registry, security, and oversight.',
    features: [
      {
        name: 'Entra Agent ID',
        link: 'agent365',
        what: 'Gives every AI agent a managed identity in Entra, just like a human user.',
        why: "Without an identity, an agent can't be governed, secured, or audited — this is the foundation.",
      },
      {
        name: 'Unified Agent Registry',
        link: 'agent365',
        what: 'A central inventory of every agent in the organisation — Microsoft-built, partner-built, and custom.',
        why: "You can't secure what you can't see — the registry stops 'shadow agents'.",
      },
      {
        name: 'Agent security and threat detection',
        link: 'agent365',
        what: 'Extends Defender, Entra, and Purview controls to agents — posture, threat detection, audit, eDiscovery.',
        why: 'Agents touch real data; this applies the same protections people get.',
      },
      {
        name: 'Building agents: Studio + Foundry',
        link: 'foundry',
        what: 'Agent 365 governs agents; Copilot Studio (low-code) and Microsoft Foundry (pro-code/Azure) are where agents get built and run.',
        why: 'Two purchases, one story: build with Studio/Foundry consumption, govern with Agent 365 seats.',
      },
    ],
  },
  {
    suite: 'Microsoft Defender Suite',
    icon: '🛡️',
    link: 'defender',
    blurb:
      'Enterprise-grade threat protection across endpoints, identity, email, and cloud apps — unified in Defender XDR.',
    features: [
      {
        name: 'Defender XDR',
        link: 'f_defxdr',
        what: 'Correlates signals across endpoint, identity, email, and apps into one investigation, with automatic attack disruption.',
        why: 'Stops attackers who move between systems — the single pane of glass for the security team.',
      },
      {
        name: 'Defender for Endpoint',
        link: 'f_defendpoint',
        what: 'Endpoint detection and response (EDR) for Windows, Mac, Linux, iOS, and Android — P1 in E3, P2 in E5 and the Suites.',
        why: 'Catches ransomware and malware on devices; the P1→P2 jump is a core E3→E5 upgrade reason.',
        frontline: 'F1 ✕ (no Defender for Endpoint) · F3 basic frontline security (verify scope)',
      },
      {
        name: 'Defender for Office 365',
        link: 'f_defoffice',
        what: 'Safe Links, Safe Attachments, and advanced anti-phishing for email, Teams, and collaboration.',
        why: 'Email is the number one attack vector — and P1 is being added to E3 and Business Premium in the 2026 updates.',
      },
      {
        name: 'Defender for Identity',
        link: 'f_defidentity',
        what: 'Detects identity-based attacks and lateral movement from on-premises Active Directory signals.',
        why: 'Catches credential theft and privilege escalation before it spreads.',
      },
      {
        name: 'Defender for Cloud Apps',
        link: 'f_defcloudapps',
        what: 'Discovers shadow IT and governs access and sessions across SaaS apps.',
        why: 'Shows which cloud apps employees actually use — and controls the risky ones.',
      },
      {
        name: 'Defender for Business',
        link: 'f_defbusiness',
        what: 'The SMB-optimised endpoint protection inside Business Premium (up to 300 users).',
        why: 'Enterprise-grade EDR sized and priced for small business.',
      },
      {
        name: 'Defender Vulnerability Management',
        link: 'f_defendpoint',
        what: 'Continuously finds misconfigurations, missing patches, and exploitable software, prioritised by real-world risk.',
        why: "Turns 'are we patched?' into a ranked to-do list — a big audit-readiness win.",
      },
      {
        name: 'Defender for IoT and Exposure Management',
        link: 'defender',
        what: 'Visibility and threat detection for enterprise IoT devices, plus attack-surface and exposure analytics.',
        why: 'Printers, cameras, and sensors are entry points too — included in the Suites.',
      },
    ],
  },
  {
    suite: 'Microsoft Purview Suite',
    icon: '🔏',
    link: 'purview',
    blurb: 'Data governance and compliance — classify, protect, retain, and audit sensitive information.',
    features: [
      {
        name: 'Sensitivity labels and Information Protection',
        link: 'f_labels',
        what: "Classify and auto-encrypt documents and emails (for example 'Confidential' or 'Health record') — the protection travels with the file.",
        why: 'Even if a labelled file leaves the tenant, the encryption goes with it.',
      },
      {
        name: 'Data Loss Prevention (DLP)',
        link: 'f_dlp',
        what: 'Blocks sensitive data from leaving via email, files, Teams, and now Copilot interactions.',
        why: 'Stops accidental and malicious leaks of regulated data.',
        frontline: 'F1 ✕ (no DLP for email or files) · F3 verify',
      },
      {
        name: 'Endpoint DLP',
        link: 'f_endpointdlp',
        what: 'Extends DLP to the device — blocks copy to USB, print, screenshot, or upload.',
        why: 'Closes the gap where data walks out on a thumb drive.',
      },
      {
        name: 'Insider Risk Management',
        link: 'f_insiderrisk',
        what: 'Machine-learning detection of risky internal behaviour — mass downloads, exfiltration patterns, risky AI usage — with Adaptive Protection.',
        why: "Flags the departing employee exfiltrating files before it's a breach.",
      },
      {
        name: 'Communication Compliance',
        link: 'f_commcompliance',
        what: 'Monitors messages for harassment, threats, or regulatory violations across Teams and email.',
        why: 'Required posture in finance and healthcare for internal communications.',
      },
      {
        name: 'eDiscovery (Premium)',
        link: 'f_ediscovery',
        what: 'Find, hold, review, and export content for legal and regulatory cases — including agent and Copilot interactions.',
        why: 'Turns a multi-week legal request into a guided search.',
      },
      {
        name: 'Audit (Premium)',
        link: 'f_audit',
        what: 'High-value audit events with extended retention (a 10-year add-on is available).',
        why: 'Proves who did what, and when — the backbone of any audit.',
      },
      {
        name: 'Purview for AI (DSPM)',
        link: 'f_purviewai',
        what: 'Data Security Posture Management for AI — governs and audits what Copilot, Scout, and agents can access and surface.',
        why: 'The control that makes AI rollouts survivable in regulated environments — and a 2026 focus area.',
        isNew: true,
      },
      {
        name: 'Retention and Records Management',
        link: 'purview',
        what: 'Policy-driven retention, deletion, and records declaration across mail, files, Teams, and agents.',
        why: "Keep what regulations require, defensibly delete what they don't.",
      },
      {
        name: 'Compliance Manager and Priva',
        link: 'priva',
        what: 'Compliance Manager scores your posture against regulations; Priva automates privacy risk and subject-rights requests.',
        why: "Turns 'are we compliant?' into a dashboard — and access requests into a workflow.",
      },
    ],
  },
  {
    suite: 'Microsoft Entra',
    icon: '🔐',
    link: 'entra',
    blurb: 'Identity and access — from MFA basics to least-privilege governance and Zero-Trust network access.',
    features: [
      {
        name: 'Entra ID P1 — MFA, SSO, and app access',
        link: 'f_condaccess',
        what: 'The identity baseline in Business Premium and E3: multifactor auth, single sign-on, app provisioning, hybrid identity.',
        why: "The non-negotiable floor — most breaches start where MFA isn't.",
      },
      {
        name: 'Conditional Access',
        link: 'f_condaccess',
        what: 'Policy engine that gates access by user, device, location, app, and risk.',
        why: "The core of Zero Trust — 'right person, right device, right context'.",
      },
      {
        name: 'Identity Protection (P2)',
        link: 'f_idprotection',
        what: 'Risk-based detection of compromised sign-ins and users, feeding Conditional Access automatically.',
        why: 'Blocks risky logins by machine learning, not by helpdesk ticket.',
      },
      {
        name: 'Privileged Identity Management (PIM)',
        link: 'f_pim',
        what: 'Just-in-time, time-bound, approval-based admin access with a full audit trail.',
        why: 'Admin rights only when actively needed — shrinks the biggest attack surface.',
      },
      {
        name: 'Access Reviews and ID Governance',
        link: 'f_idgov',
        what: 'Recurring recertification of who has access to what — roles, groups, apps, and guests.',
        why: 'Proves access is reviewed and removed — an audit staple and an Entra Suite pillar.',
      },
      {
        name: 'Entitlement Management',
        link: 'f_idgov',
        what: 'Package access (apps, groups, sites) into requestable bundles with approvals and expiry.',
        why: 'Onboarding and partner access becomes self-service with guardrails.',
      },
      {
        name: 'External ID / B2B collaboration',
        link: 'entra',
        what: 'Managed guest and partner identities, with governance over external sharing in SharePoint and OneDrive.',
        why: 'External collaboration without losing control — a rising 2026 governance theme.',
      },
      {
        name: 'Entra Private Access',
        link: 'f_entraprivate',
        what: 'Zero-Trust access to internal apps without a legacy VPN.',
        why: 'Replaces the VPN with per-app, identity-aware access — part of Entra Suite.',
      },
      {
        name: 'Entra Internet Access',
        link: 'f_entrainternet',
        what: 'Identity-centric secure web gateway protecting internet and SaaS traffic.',
        why: 'Filters outbound traffic at the identity layer — the other half of Global Secure Access.',
      },
    ],
  },
  {
    suite: 'Microsoft Intune Suite',
    icon: '💻',
    link: 'intune',
    blurb: 'Endpoint management — control, secure, and support the devices everything runs on.',
    features: [
      {
        name: 'Intune P1/P2 — core device management',
        link: 'intune',
        what: 'MDM/MAM for Windows, macOS, iOS, and Android: enrolment, compliance policies, app deployment, Conditional Access signals.',
        why: 'Included in Business Premium and E3/E5 — the baseline for any managed fleet.',
        frontline: 'F3 ✓ device management · F1 verify',
      },
      {
        name: 'Cloud PKI',
        link: 'f_cloudpki',
        what: 'Cloud-based certificate authority for device and user certificates.',
        why: 'Removes the need to run on-premises certificate servers — the Intune Suite headliner.',
      },
      {
        name: 'Endpoint Privilege Management',
        link: 'f_epm',
        what: 'Lets standard users run approved admin tasks without holding admin rights.',
        why: 'Least-privilege on the desktop — fewer local admins, less ransomware blast radius.',
      },
      {
        name: 'Remote Help',
        link: 'f_remotehelp',
        what: 'Secure, compliant, role-based remote assistance for managed devices.',
        why: 'Helpdesk fixes devices anywhere without third-party remote tools.',
      },
      {
        name: 'Advanced Analytics',
        link: 'f_intuneanalytics',
        what: 'Deep device health, performance, battery, and anomaly insights with AI summaries.',
        why: 'Spot failing devices before users file tickets.',
      },
      {
        name: 'Enterprise App Management',
        link: 'f_entappmgmt',
        what: 'Curated app catalogue with automated packaging, deployment, and patching.',
        why: 'Keeps the whole third-party app estate patched — a top attack vector closed.',
      },
    ],
  },
  {
    suite: 'Microsoft Teams',
    icon: '💬',
    link: 'teams',
    blurb: 'Meetings, chat, calling — and the SKU split every new enterprise customer hits.',
    features: [
      {
        name: 'Teams (and the no-Teams split)',
        link: 'noteams',
        what: 'Chat, meetings, channels, file collaboration. Business plans come with or without Teams; new enterprise customers must buy Teams separately.',
        why: "The with/without-Teams fork changes every enterprise quote — this tool's price toggle models it.",
        frontline: 'F1 ✓ · F3 ✓ (both ship with-Teams and no-Teams SKUs)',
      },
      {
        name: 'Teams Enterprise (standalone)',
        link: 'noteams',
        what: 'The AU$12.80/user standalone Teams SKU that pairs with the no-Teams E1/E3/E5 suites.',
        why: "Net-new enterprise customers can't buy bundled Teams — quote this alongside the suite.",
      },
      {
        name: 'Teams Phone',
        link: 'teamsphone',
        what: 'Cloud PBX: dial plans, call queues, voicemail, and PSTN calling via Calling Plans or Operator Connect.',
        why: 'Replaces the legacy phone system — a common add-on conversation once the suite is settled.',
      },
      {
        name: 'Teams Premium',
        link: 'teams',
        what: 'Advanced meetings: AI recaps, branded experiences, advanced webinars, watermarking, and meeting protection.',
        why: 'Where meeting-heavy and event-heavy customers go after the base license.',
      },
      {
        name: 'Teams Rooms',
        link: 'teams',
        what: 'Licensing for shared meeting-room devices (Basic is free for small counts, Pro for managed fleets).',
        why: 'Room systems carry their own per-device licenses — frequently missed in quotes.',
      },
    ],
  },
  {
    suite: 'Windows and Cloud PCs',
    icon: '🪟',
    link: 'e3',
    blurb: 'The OS-level entitlements that separate Business plans from Enterprise.',
    features: [
      {
        name: 'Windows 11 Enterprise',
        link: 'e3',
        what: 'E3/E5/E7 include Windows Enterprise upgrade rights — advanced security such as Credential Guard, plus long-term servicing options.',
        why: 'A quiet but decisive E3 differentiator — Business Premium tops out at Windows Pro entitlements.',
      },
      {
        name: 'Azure Virtual Desktop (AVD)',
        link: 'e3',
        what: 'Virtualisation rights to run Windows desktops in Azure, included with E3/E5 user licensing (compute billed separately).',
        why: 'Contractors and BYOD scenarios without shipping laptops — an Enterprise-only right.',
      },
      {
        name: 'Windows 365 Cloud PC',
        link: 'e7',
        what: 'Per-user subscription Cloud PCs streamed to any device — a separate per-user SKU on top of the suite.',
        why: 'The simpler alternative to AVD when you want fixed per-user pricing.',
      },
      {
        name: 'Windows Autopilot',
        link: 'intune',
        what: 'Zero-touch device provisioning — new laptops ship straight to users and self-configure via Intune.',
        why: 'Kills the imaging cart; pairs with Intune in every modern-management pitch.',
      },
      {
        name: 'Windows Autopatch',
        link: 'e3',
        what: 'Microsoft-managed update automation for Windows, Office, Edge, and Teams (E3 and above).',
        why: 'Patch compliance without the Tuesday-night ritual.',
      },
    ],
  },
  {
    suite: 'Plans, storage, and limits',
    icon: '📦',
    link: 'svcdesc',
    blurb: 'The capacity numbers and hard caps that decide upgrades — straight from the service descriptions.',
    features: [
      {
        name: 'Mailbox sizes',
        link: 'svcdesc',
        what: 'Business plans: 50GB mailboxes (a 2026 update adds 50GB more email storage to Basic and Standard). Enterprise E3/E5: 100GB plus auto-expanding archiving.',
        why: 'Mailbox-full tickets are a classic, dated trigger to step from Business to Enterprise.',
        frontline: 'F1 Exchange Kiosk 2GB — Teams calendar only, no mailbox rights · F3 2GB mailbox',
      },
      {
        name: 'OneDrive storage',
        link: 'svcdesc',
        what: '1TB per user as standard; eligible Enterprise plans can be raised to 5TB+ by admins for users who need more.',
        why: 'Heavy-content users (video, CAD, media) outgrow 1TB — check before the complaint arrives.',
      },
      {
        name: 'SharePoint tenant storage',
        link: 'svcdesc',
        what: 'Pooled tenant storage: a base allocation plus per-license additions; extra storage is purchasable per GB.',
        why: 'Tenant storage is shared — growing teams burn it faster than anyone expects.',
      },
      {
        name: 'The 300-user Business cap',
        link: 'bizprem',
        what: 'All Business plans combined hard-cap at 300 users; crossing it forces a move to Enterprise plans.',
        why: 'The single most important number in SMB licensing — plan the jump before seat 280.',
      },
      {
        name: 'Full feature matrices',
        link: 'licensing',
        what: "For the exhaustive, always-current feature-by-SKU tables, Microsoft's service descriptions and licensing guidance are the source of truth.",
        why: "When this glossary isn't granular enough, this is the official deep end — bookmark it.",
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * What's new — curated, with the licensing angle spelled out.
 * ------------------------------------------------------------------------- */
export type NewsItem = {
  icon: string;
  date: string;
  title: string;
  what: string;
  why: string;
  links: string[];
};

export const WHATS_NEW: NewsItem[] = [
  {
    icon: '📺',
    date: 'Retiring · 30 June 2026',
    title: 'Teams Live Events is retiring',
    what: 'Teams Live Events and its associated Graph APIs retire on 30 June 2026. Town Halls, plus webinars, are the replacement. Events already scheduled before the cutoff can still run through to 28 February 2027.',
    why: 'If a client still runs all-hands or large broadcasts on Live Events, they need to move to Town Halls now. Note the licensing angle: Town Hall reaches 3,000 attendees on standard Teams Enterprise/E3/E5, but going past that needs paid Attendee Packs — a real budget conversation for anyone running big events.',
    links: ['liveevents', 'townhall'],
  },
  {
    icon: '📝',
    date: 'Retiring · 14 July 2026',
    title: 'InfoPath Forms Services is retiring',
    what: 'InfoPath Forms Services in SharePoint Online retires on 14 July 2026, and legacy SharePoint 2013 workflows go with it. Publishing new or updated InfoPath forms was already blocked from 18 May 2026. Microsoft points customers to Power Apps, Power Automate, and Microsoft Forms.',
    why: "There's no automated migration tool — every form has to be rebuilt. Any business still running InfoPath for approvals, onboarding, or internal requests has a hard deadline and real rebuild work ahead. A good reason to talk about Power Platform, which they most likely already own inside their existing license.",
    links: ['infopath'],
  },
  {
    icon: '🧑‍💼',
    date: 'Clarified · 2026',
    title: 'People Skills — no separate license',
    what: 'People Skills builds AI-inferred skill profiles across Microsoft 365, Copilot, and Viva. The licensing question comes up a lot, so to be clear: it does not need a separate license. It is included with Microsoft 365 Copilot or Viva. Commercial users without either get a Foundation tier (manually added skills, no AI inferencing); Copilot and Viva users get the Advanced tier with AI inferencing.',
    why: "Clients often assume any new AI capability is a paid add-on. This one isn't — it rides on licenses they may already hold. Worth flagging so nobody double-pays, or holds off a rollout waiting for a SKU that doesn't exist.",
    links: ['peopleskills'],
  },
  {
    icon: '📊',
    date: 'New · July 2026',
    title: 'Copilot Chat Analytics',
    what: 'A new admin-facing analytics add-on reporting on Copilot Chat usage across the tenant — adoption, active users, and engagement trends — separate from the Copilot seat license itself.',
    why: 'Added across nearly every SKU family this cycle — Business, Enterprise E3/E5/E7, and Frontline F1/F3. It is a free add-on line to include on quotes so customers can prove Copilot adoption to their own leadership — useful ammunition when justifying the spend at renewal.',
    links: ['copilotanalytics'],
  },
  {
    icon: '🔗',
    date: 'New · July 2026',
    title: 'URL time-of-click protection',
    what: "A new Defender for Office 365 / Safe Links capability that re-checks a link's reputation at the moment someone clicks it — not just when the email first arrives.",
    why: 'Closes the gap where a link is clean at delivery but weaponised minutes or hours later. It is showing up as an included feature on Office 365 E1/G1 tiers specifically, which makes it a talking point for customers who assume they need to jump straight to E5 for real-time link protection.',
    links: ['urlclicktime', 'f_defoffice'],
  },
  {
    icon: '🖥️',
    date: 'New · July 2026 · Windows 11 E5/E7',
    title: 'Quick Machine Recovery and post-quantum security APIs',
    what: 'Two new Windows 11 Enterprise E5/E7 capabilities: Quick Machine Recovery (remote, automated recovery for devices stuck in a boot loop, with no on-site IT needed) and post-quantum security APIs (developer-facing cryptography APIs to prepare apps for quantum-resistant encryption standards).',
    why: 'Both are E5/E7-exclusive today — another concrete reason for security- or compliance-conscious customers to move up from E3, especially where reduced site visits (Quick Machine Recovery) or forward-looking compliance posture matter.',
    links: ['quickmachinerecovery', 'postquantum'],
  },
  {
    icon: '🐕',
    date: 'June 2026 · Frontier preview',
    title: 'Microsoft Scout',
    what: "Microsoft's first 'Autopilot' — an always-on personal agent that works across Teams, Outlook, OneDrive, and SharePoint with its own identity, acting in the background without being prompted. Announced at Build 2026.",
    why: 'Preview access runs through the Frontier program and requires a GitHub Copilot subscription — and early access favours organisations on E5 + Purview. Customers who want Scout first have another concrete reason to be on the BETTER or BEST tiers today.',
    links: ['scout', 'scoutblog'],
  },
  {
    icon: '🧠',
    date: 'New · July 2026 guide',
    title: 'Work IQ APIs',
    what: "Work IQ is Microsoft's workplace-intelligence layer — chat, context, tools, and workspaces that turn Microsoft 365 signals into agent-ready grounding. It is now exposed directly via APIs for custom-built agents.",
    why: 'Native Copilot experiences (chat, in-app AI, Researcher/Analyst/Facilitator) get Work IQ at no incremental charge. Credits only apply when a custom agent calls the Work IQ APIs directly: variable pricing for Chat and Context calls, and a flat 0.1 credit per Work IQ Tools API call. Worth flagging to any customer building custom agents so they do not assume it is free like the native experience.',
    links: ['cowork', 'frontier'],
  },
  {
    icon: '🤝',
    date: 'GA + updated · July 2026 guide',
    title: 'Copilot Cowork — GA, with real credit ranges',
    what: 'Copilot Cowork is now generally available, and the July 2026 Copilot Credits Guide publishes concrete planning ranges for the first time: light tasks 100–300 credits, medium tasks 300–700, heavy tasks 700+ with no published ceiling. Pay-as-you-go stays at US$0.01 per credit; a one-year Pre-Purchase Plan offers volume discounts from 5% up to 20% at the higher tiers.',
    why: 'Cowork requires a Copilot license as a prerequisite and bills separately — no Cowork entitlements are included in the Copilot seat. The Researcher, Analyst, and Facilitator agents remain included at no extra charge. The Cowork estimator on this page uses those published ranges.',
    links: ['cowork', 'copilotcredits'],
  },
  {
    icon: '🏔️',
    date: 'GA 1 May 2026 · AU$148.20/user/month',
    title: 'Microsoft 365 E7 (Frontier Suite)',
    what: 'The new top enterprise bundle: E5 + Copilot + Entra Suite + Agent 365 in one SKU — roughly 15% less than buying the parts separately.',
    why: 'This is the new ceiling of the upgrade ladder, and the Australian numbers bear the claim out: E5 + Copilot + Agent 365 + Entra Suite bought separately is AU$175.10, against AU$148.20 for E7. For customers buying three or more of its components à la carte, consolidating to E7 is usually both cheaper and a cleaner quote — and it includes Teams, sidestepping the no-Teams split.',
    links: ['e7'],
  },
  {
    icon: '👥',
    date: 'GA 1 May 2026 · AU$22.40/user/month',
    title: 'Agent 365',
    what: 'The control plane for AI agents — registry, identity (Entra Agent ID), security posture, and audit for every agent in the tenant. Manages agents the way you manage employees.',
    why: "Any customer deploying agents without it has ungoverned 'shadow agents'. It is a standalone add-on at AU$22.40, or included inside E7 — a key fork in the BETTER-tier conversation.",
    links: ['agent365'],
  },
  {
    icon: '🚦',
    date: 'New release model · 2026',
    title: 'Frontier · Standard · Deferred channels',
    what: 'Microsoft\'s new release model for Microsoft 365: organisations choose how early they receive new features — Frontier (earliest, experimental), Standard, or Deferred.',
    why: 'Channel choice is now part of the licensing conversation: innovation-hungry customers want Frontier, where Scout and the newest Copilot features land first, while regulated customers may prefer Deferred for change control.',
    links: ['frontier', 'msgcenter'],
  },
  {
    icon: '📅',
    date: 'Effective 1 July 2026',
    title: 'Price increases have landed',
    what: 'List prices rose across most Business and Enterprise suites on 1 July 2026. Every Australian figure in this tool is post-increase — it reflects what Microsoft is charging now, not the old rate.',
    why: 'Renewal timing is money: existing customers keep their old pricing until the first renewal after 1 July, so what you are paying today may not be what you will pay at renewal. Worth pulling your renewal dates now and modelling the step-up before it arrives rather than discovering it on an invoice.',
    links: ['noteams', 'licensing'],
  },
];
