import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import {
  LAST_VERIFIED,
  MS_PRICING_BUSINESS,
  MS_PRICING_ENTERPRISE,
  MS_PRICING_NONPROFIT,
  NONPROFIT_PRICE,
  QUESTIONS,
  nonprofitKey,
  recommend,
  type Answers,
  type Result,
} from './data';
import CoworkEstimator from './CoworkEstimator';
import {MsLink, MsLinkRow, NewBadge, Price, RichText, toneClass} from './shared';
import styles from './styles.module.css';

/* ------------------------------------------------------------------ result */

function PriceBand({result}: {result: Result}): ReactNode {
  const [withTeams, setWithTeams] = useState(true);
  const [nonprofit, setNonprofit] = useState(false);
  const {price} = result;

  const npAnchor = NONPROFIT_PRICE[nonprofitKey(result)];
  const headline = withTeams ? price.withTeams : price.noTeams;
  const math = withTeams ? price.baseWithTeams : price.baseNoTeams;

  return (
    <div className={styles.priceBand}>
      <div className={styles.toggleRow} role="group" aria-label="Teams bundling">
        <button
          type="button"
          className={clsx(styles.toggleBtn, withTeams && styles.toggleActive)}
          aria-pressed={withTeams}
          onClick={() => setWithTeams(true)}>
          With Teams
        </button>
        <button
          type="button"
          className={clsx(styles.toggleBtn, !withTeams && styles.toggleActive)}
          aria-pressed={!withTeams}
          onClick={() => setWithTeams(false)}>
          Without Teams
        </button>
      </div>

      <div className={styles.toggleRow} role="group" aria-label="Pricing type">
        <button
          type="button"
          className={clsx(styles.toggleBtn, !nonprofit && styles.toggleActive)}
          aria-pressed={!nonprofit}
          onClick={() => setNonprofit(false)}>
          Commercial
        </button>
        <button
          type="button"
          className={clsx(styles.toggleBtn, nonprofit && styles.toggleActive)}
          aria-pressed={nonprofit}
          onClick={() => setNonprofit(true)}>
          Nonprofit
        </button>
      </div>

      {nonprofit && (
        <div className={styles.npCaveat}>
          <div className={styles.npCaveatHead}>Nonprofit pricing — eligibility and caveats</div>
          <ul>
            <li>
              Eligibility is verified through Connecting Up / TechSoup. Religious and political
              organisations are typically excluded.
            </li>
            <li>
              The free Business Premium and Office 365 E1 grants were retired on 1 July 2025; the impact
              lands at each organisation&apos;s renewal date.
            </li>
            <li>
              Business Basic is granted free up to 300 users, Business Standard is AU$5.00, and Business
              Premium is AU$8.20. Other suites run roughly 60–75% off.
            </li>
            <li>
              The nonprofit rates are for the plain plans — where the commercial SKU now bundles Copilot,
              the nonprofit equivalent generally does not, so Copilot is licensed separately on top.
            </li>
          </ul>
          <a
            className={styles.priceCheck}
            href={MS_PRICING_NONPROFIT}
            target="_blank"
            rel="noopener noreferrer">
            Microsoft nonprofit plans and pricing ↗
          </a>
        </div>
      )}

      <div className={styles.priceLabel}>Estimated market price</div>

      {nonprofit ? (
        <>
          <div className={styles.priceTotal}>
            {npAnchor ? npAnchor.total : <span className={styles.verify}>Verify nonprofit rate</span>}
            <span className={styles.priceUnit}> / user / month</span>
          </div>
          <div className={styles.priceMath}>
            {npAnchor
              ? npAnchor.math
              : 'Nonprofit pricing applies (60–75% off) — confirm the exact figure on Microsoft’s nonprofit table.'}
          </div>
        </>
      ) : (
        <>
          <div className={styles.priceTotal}>
            <Price value={headline} />
            <span className={styles.priceUnit}> / user / month</span>
          </div>
          <div className={styles.priceMath}>
            {price.base} <Price value={math} />
            {price.addons ? ` + ${price.addons}` : ''}
          </div>
        </>
      )}

      {price.entNote && (
        <div className={styles.priceNote}>
          ⚠️ New enterprise customers can&apos;t buy E3 or E5 with Teams bundled — they buy the{' '}
          <b>no-Teams</b> SKU plus <b>Teams Enterprise at AU$12.80</b> separately. Existing customers keep
          their with-Teams plans.
        </div>
      )}
      {price.e7Note && <div className={styles.priceNote}>✓ E7 includes Teams — no separate split needed.</div>}
      {price.extraNote && <div className={styles.priceNote}>{price.extraNote}</div>}

      <div className={styles.priceVerify}>
        <a
          className={styles.priceCheck}
          href={result.enterprise || result.frontline ? MS_PRICING_ENTERPRISE : MS_PRICING_BUSINESS}
          target="_blank"
          rel="noopener noreferrer">
          Check Microsoft&apos;s current pricing ↗
        </a>
        <span className={styles.priceVerified}>Verified {LAST_VERIFIED}</span>
      </div>

      <div className={styles.priceDisclaimer}>
        <b>Australian list price (AUD), excluding GST</b>, per user per month on an annual commitment, taken
        from microsoft.com/en-au. Monthly billing costs more. Your actual price still moves with agreement
        type, promotions, seat volume, and renewal timing, and a &ldquo;from&rdquo; figure means part of the
        stack has no published Australian price yet. Confirm before you budget or quote.
      </div>
    </div>
  );
}

function ResultView({result, onRestart}: {result: Result; onRestart: () => void}): ReactNode {
  return (
    <div className={styles.result}>
      <div className={styles.recCard}>
        <div className={clsx(styles.recHead, toneClass(result.tone))}>
          <div className={styles.recKicker}>Recommended · {result.kicker}</div>
          <Heading as="h2" className={styles.recName}>
            {result.name}
          </Heading>
          <div className={styles.recTrack}>{result.track}</div>
        </div>

        <div className={styles.recBody}>
          <RichText className={styles.recWhy} html={result.why} />

          {result.hardRule && (
            <div className={styles.hardRule}>
              <b>Frontline-only rule:</b> {result.hardRule}
            </div>
          )}

          <div className={styles.stackBox}>
            <div className={styles.stackLabel}>License stack to quote</div>
            <div className={styles.stackValue}>
              {result.stack}
              {result.stackNew && <NewBadge />}
            </div>
          </div>

          <PriceBand result={result} />

          <div className={styles.columns}>
            <div className={clsx(styles.column, styles.columnGet)}>
              <div className={styles.columnHead}>What they get</div>
              <ul>
                {result.get.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={clsx(styles.column, styles.columnSkip)}>
              <div className={styles.columnHead}>What they give up</div>
              <ul>
                {result.skip.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.upgradeBox}>
        <div className={styles.upgradeHead}>When to upgrade</div>
        {result.upgrade.map((u) => (
          <div className={styles.upgradeLine} key={u.trigger}>
            <span className={styles.upgradeArrow} aria-hidden="true">
              →
            </span>
            <span>
              <b>{u.trigger}</b> &nbsp;⇒&nbsp; {u.move}
            </span>
          </div>
        ))}
        <div className={styles.upgradeNext}>
          <b>Next step up:</b> {result.next}
        </div>
      </div>

      {result.beyond && (
        <div className={styles.beyondBox}>
          <div className={styles.beyondHead}>
            <div className={styles.beyondTitle}>When the top bundle isn&apos;t enough</div>
            <div className={styles.beyondSub}>
              They&apos;ve bought the ceiling. Growth from here means layering these on by need, not moving
              to a new tier.
            </div>
          </div>
          <div className={styles.beyondGrid}>
            {result.beyond.map((b) => (
              <div className={styles.beyondCard} key={b.title}>
                <div className={styles.beyondIcon} aria-hidden="true">
                  {b.icon}
                </div>
                <div>
                  <div className={styles.beyondCardTitle}>{b.title}</div>
                  <div className={styles.beyondCardBody}>{b.body}</div>
                  <div className={styles.featureLink}>
                    <MsLink id={b.link} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.includes && (
        <div className={styles.includesBox}>
          <div className={styles.includesTitle}>Everything included in this recommendation</div>
          {result.includes.map((g) => (
            <div className={styles.includesGroup} key={g.group}>
              <div className={styles.includesGroupName}>{g.group}</div>
              <div className={styles.includesDetail}>{g.detail}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.linksBox}>
        <div className={styles.linksTitle}>Learn more — official Microsoft documentation</div>
        <MsLinkRow ids={result.links} />
        <div className={styles.linksNote}>
          Links open Microsoft Learn or microsoft.com in a new tab. Those pages are maintained by Microsoft
          and change without notice.
        </div>
      </div>

      <div className={styles.resultActions}>
        <button
          type="button"
          className="button button--primary"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.print();
            }
          }}>
          Print or save as PDF
        </button>
        <button type="button" className="button button--secondary button--outline" onClick={onRestart}>
          Start over
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- questions */

export default function Advisor(): ReactNode {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const question = QUESTIONS[step];
  const selected = question ? answers[question.id] : undefined;
  const result = recommend(answers);

  const restart = () => {
    setStep(0);
    setAnswers({});
    setShowHelp(false);
    setShowResult(false);
  };

  const goNext = () => {
    setShowHelp(false);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    setShowHelp(false);
    setStep(Math.max(0, step - 1));
  };

  return (
    <div>
      <div className={styles.progress} aria-hidden="true">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={clsx(
              styles.dot,
              !showResult && i < step && styles.dotDone,
              !showResult && i === step && styles.dotNow,
              showResult && styles.dotDone,
            )}
          />
        ))}
        <span className={clsx(styles.dot, showResult && styles.dotNow)} />
      </div>

      {showResult && result ? (
        <ResultView result={result} onRestart={restart} />
      ) : (
        <div className={styles.questionCard}>
          <div className={styles.eyebrow}>{question.num}</div>
          <Heading as="h2" className={styles.questionTitle}>
            {question.q}
          </Heading>
          <p className={styles.questionSub}>{question.sub}</p>

          <button
            type="button"
            className={styles.explainBtn}
            aria-expanded={showHelp}
            onClick={() => setShowHelp((v) => !v)}>
            {showHelp ? 'Hide explanation' : 'New to this? Explain it for me'}
          </button>

          {showHelp && (
            <div className={styles.explainBox}>
              <RichText html={question.help} />
              <div className={styles.learnRow}>
                <span className={styles.learnLabel}>Learn more from Microsoft:</span>
                <MsLinkRow ids={question.learn} />
              </div>
            </div>
          )}

          <div className={styles.options}>
            {question.opts.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  className={clsx(styles.option, isSelected && styles.optionSelected)}
                  aria-pressed={isSelected}
                  onClick={() => setAnswers({...answers, [question.id]: opt.value})}>
                  <span className={styles.optionIcon} aria-hidden="true">
                    {opt.icon}
                  </span>
                  <span className={styles.optionText}>
                    <b>{opt.title}</b>
                    <span>{opt.sub}</span>
                  </span>
                  <span className={styles.optionCheck} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className={styles.navRow}>
            <button
              type="button"
              className={clsx('button button--secondary button--outline', step === 0 && styles.navSpacer)}
              onClick={goBack}
              disabled={step === 0}>
              ← Back
            </button>
            <button
              type="button"
              className="button button--primary"
              onClick={goNext}
              disabled={!selected}>
              {step === QUESTIONS.length - 1 ? 'See recommendation →' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      <div style={{marginTop: '2.5rem'}}>
        <CoworkEstimator />
      </div>
    </div>
  );
}
