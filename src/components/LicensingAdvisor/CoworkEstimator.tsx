import {useState, type ReactNode} from 'react';
import Heading from '@theme/Heading';

import {COWORK_CREDIT_PRICE, COWORK_RANGE} from './data';
import {MsLink, formatCount, formatUsd} from './shared';
import styles from './styles.module.css';

type Inputs = {users: string; light: string; medium: string; heavy: string};

const DEFAULTS: Inputs = {users: '10', light: '8', medium: '4', heavy: '1'};

const toInt = (v: string): number => Math.max(0, parseInt(v, 10) || 0);

/**
 * Copilot Cowork is billed on usage, not per seat, so the honest output is a
 * low-to-high band rather than a single number. Credit ranges come from
 * Microsoft's July 2026 Copilot Credits Guide.
 */
export default function CoworkEstimator(): ReactNode {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const set = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({...prev, [key]: e.target.value}));

  const users = toInt(inputs.users);
  const light = toInt(inputs.light);
  const medium = toInt(inputs.medium);
  const heavy = toInt(inputs.heavy);
  const tasks = light + medium + heavy;

  const lowCredits =
    users * (light * COWORK_RANGE.light[0] + medium * COWORK_RANGE.medium[0] + heavy * COWORK_RANGE.heavy[0]);
  const highCredits =
    users * (light * COWORK_RANGE.light[1] + medium * COWORK_RANGE.medium[1] + heavy * COWORK_RANGE.heavy[1]);
  const lowUsd = lowCredits * COWORK_CREDIT_PRICE;
  const highUsd = highCredits * COWORK_CREDIT_PRICE;
  const hasResult = users > 0 && tasks > 0;

  const fields: {key: keyof Inputs; label: string; hint?: string}[] = [
    {key: 'users', label: 'Cowork users'},
    {key: 'light', label: 'Light tasks / user / month', hint: 'weekly status, simple drafts'},
    {key: 'medium', label: 'Medium tasks / user / month', hint: 'meeting prep, briefing docs'},
    {key: 'heavy', label: 'Heavy tasks / user / month', hint: 'large data analysis'},
  ];

  return (
    <details className={styles.disclosure}>
      <summary>Copilot Cowork — usage-based cost estimator</summary>
      <div className={styles.disclosureBody}>
        <p>
          <b>Cowork is a usage-based add-on, not a per-seat price.</b> It needs a Microsoft 365 Copilot
          license as a prerequisite, then bills separately on Copilot Credits at <b>US$0.01 per credit</b>{' '}
          on pay-as-you-go, with volume discounts on pre-purchase. Copilot Credits are the one figure on
          this page still quoted in <b>USD</b> — Microsoft publishes no Australian credit rate, and the
          meter converts to your agreement currency at billing. What follows is a rough planning range only
          — real spend moves with task complexity and how much people actually use it.
        </p>

        <div className={styles.cwGrid}>
          {fields.map((f) => (
            <label className={styles.cwField} key={f.key}>
              <span>
                {f.label}
                {f.hint ? <small>{f.hint}</small> : null}
              </span>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={inputs[f.key]}
                onChange={set(f.key)}
              />
            </label>
          ))}
        </div>

        {hasResult ? (
          <div>
            <div className={styles.cwBand}>
              Estimated tenant spend:{' '}
              <b>
                {formatUsd(lowUsd)} – {formatUsd(highUsd)}
              </b>{' '}
              per month (USD)
            </div>
            <div className={styles.cwBreak}>
              <div className={styles.cwTile}>
                <span>Per user / month</span>
                <b>
                  {formatUsd(lowUsd / users)} – {formatUsd(highUsd / users)}
                </b>
              </div>
              <div className={styles.cwTile}>
                <span>Annualised</span>
                <b>
                  {formatUsd(lowUsd * 12)} – {formatUsd(highUsd * 12)}
                </b>
              </div>
              <div className={styles.cwTile}>
                <span>Tasks / month</span>
                <b>{formatCount(tasks * users)}</b>
              </div>
            </div>
            <div className={styles.cwSub}>
              {formatCount(lowCredits)} – {formatCount(highCredits)} Copilot Credits per month at US$0.01 each
              (pay-as-you-go list rate). Prepaid plans discount this.
            </div>
            <div className={`${styles.cwSub} ${styles.cwWarn}`}>
              These ranges assume a frontier model and are a planning ceiling. A Copilot license is still
              required per user and billed separately. Actual spend varies.
            </div>
          </div>
        ) : (
          <span className={styles.cwHint}>
            Enter users and task counts to see an estimated monthly range.
          </span>
        )}

        <ul className={styles.cwNote}>
          <li>
            Per-task credit ranges (Microsoft&apos;s July 2026 planning estimates): light 100–300, medium
            300–700, heavy 700+. Microsoft publishes no heavy-task ceiling, so treat any heavy figure as a
            floor rather than a cap.
          </li>
          <li>
            The ranges assume a frontier model. Microsoft&apos;s lighter model is designed to cost less, so
            read this as a planning ceiling on the light and medium bands, not a floor.
          </li>
          <li>
            Credits pool at the tenant level, so this is estimated <b>tenant</b> monthly spend, not a
            per-seat charge.
          </li>
          <li>
            Pay-as-you-go is US$0.01 per credit with no commitment. A one-year Pre-Purchase Plan offers volume
            discounts from 5% (300K credits) up to 20% (300M credits) for tenants that want to lock a rate in.
          </li>
        </ul>

        <div className={styles.cwCredits}>
          <Heading as="h4">What are Copilot Credits?</Heading>
          <p>
            Copilot Credits are the shared usage currency behind Cowork, the Work IQ APIs, Copilot Studio
            agents, and AI features in Dynamics 365 and Power Platform. You pay for work performed rather
            than a flat per-seat fee — think of the Copilot license as the fixed connection and the credits
            as metered usage. Admins can set spending limits and alerts, and usage stays off until it is
            switched on.
          </p>
          <p>
            <b>One important distinction:</b> the native Microsoft 365 Copilot experiences — Copilot Chat,
            AI in Word, Excel, PowerPoint, Outlook and Teams, and the built-in Researcher, Analyst, and
            Facilitator agents — do <b>not</b> incur separate Work IQ charges. Credits only apply when Work
            IQ is called directly through its APIs inside a custom-built agent or solution.
          </p>
          <MsLink id="copilotcredits" />
        </div>
      </div>
    </details>
  );
}
