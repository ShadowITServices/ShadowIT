import {useState, type ReactNode} from 'react';
import Heading from '@theme/Heading';

import {
  AUD_PER_USD,
  AUD_PER_USD_DATE,
  COWORK_CREDIT_PRICE_AUD,
  COWORK_CREDIT_PRICE_USD,
  COWORK_RANGE,
} from './data';
import {MsLink, formatCount, formatMoney} from './shared';
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
  const lowAud = lowCredits * COWORK_CREDIT_PRICE_AUD;
  const highAud = highCredits * COWORK_CREDIT_PRICE_AUD;
  const hasResult = users > 0 && tasks > 0;

  const fields: {key: keyof Inputs; label: string; hint?: string}[] = [
    {key: 'users', label: 'Cowork users', hint: 'people with a Copilot licence'},
    {key: 'light', label: 'Light tasks / per user / per month', hint: 'weekly status, simple drafts'},
    {key: 'medium', label: 'Medium tasks / per user / per month', hint: 'meeting prep, briefing docs'},
    {key: 'heavy', label: 'Heavy tasks / per user / per month', hint: 'large data analysis'},
  ];

  return (
    <details className={styles.disclosure}>
      <summary>Copilot Cowork — usage-based cost estimator</summary>
      <div className={styles.disclosureBody}>
        <p>
          <b>Cowork is a usage-based add-on, not a per-seat price.</b> It needs a Microsoft 365 Copilot
          license as a prerequisite, then bills separately on Copilot Credits on pay-as-you-go, with volume
          discounts on pre-purchase. What follows is a rough planning range only — real spend moves with
          task complexity and how much people actually use it.
        </p>
        <p>
          <b>One caveat specific to this estimator:</b> Microsoft meters credits in{' '}
          <b>US${COWORK_CREDIT_PRICE_USD.toFixed(2)}</b> and publishes no Australian credit rate — usage
          bills through Azure and converts to your agreement currency at invoice time. The AUD figures below
          are converted at <b>A${AUD_PER_USD} per US$1</b> as at {AUD_PER_USD_DATE}. That is an exchange-rate
          assumption rather than a Microsoft list price, so it will drift — every other price in this tool is
          published Australian list.
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
                {formatMoney(lowAud)} – {formatMoney(highAud)} AUD
              </b>{' '}
              / per month
            </div>
            <div className={styles.cwBreak}>
              <div className={styles.cwTile}>
                <span>Per user / per month</span>
                <b>
                  {formatMoney(lowAud / users)} – {formatMoney(highAud / users)} AUD
                </b>
              </div>
              <div className={styles.cwTile}>
                <span>Annualised</span>
                <b>
                  {formatMoney(lowAud * 12)} – {formatMoney(highAud * 12)} AUD
                </b>
              </div>
              <div className={styles.cwTile}>
                <span>Tasks / month</span>
                <b>{formatCount(tasks * users)}</b>
              </div>
            </div>
            <div className={styles.cwSub}>
              {formatCount(lowCredits)} – {formatCount(highCredits)} Copilot Credits per month. Metered at
              US${COWORK_CREDIT_PRICE_USD.toFixed(2)} per credit (pay-as-you-go list rate), converted here at
              A${AUD_PER_USD} per US$1 as at {AUD_PER_USD_DATE} — about $
              {COWORK_CREDIT_PRICE_AUD.toFixed(4)} AUD per credit. Prepaid plans discount this.
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
            Pay-as-you-go is US${COWORK_CREDIT_PRICE_USD.toFixed(2)} per credit with no commitment. A
            one-year Pre-Purchase Plan offers volume discounts from 5% (300K credits) up to 20% (300M
            credits) for tenants that want to lock a rate in.
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
