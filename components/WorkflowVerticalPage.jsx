import Link from "next/link";
import Nav from "./Nav";
import styles from "./WorkflowVerticalPage.module.css";

/**
 * Shared template for a "Solutions > Workflow Automation" vertical page
 * (GTM Automation, Product Management, and future verticals). Only the copy
 * passed in via props should differ between verticals — section structure
 * lives here once.
 */
export default function WorkflowVerticalPage({
  breadcrumbLabel,
  pain,
  gap,
  trigger,
  workflows,
  proof,
}) {
  return (
    <>
      <Nav />

      <div className={styles.breadcrumb}>
        <Link href="/solutions">Solutions</Link> /{" "}
        <Link href="/solutions#workflow-automation">Workflow Automation</Link> /{" "}
        {breadcrumbLabel}
      </div>

      {/* ============ PAIN ============ */}
      <section className={styles.pain}>
        <h1>{pain.headline}</h1>
        <div className={styles.statGrid}>
          {pain.cards.map((card) => (
            <div className={styles.statCard} key={card.heading}>
              <div className={`icon-badge ${styles.statIcon}`}>{card.icon}</div>
              <div className={styles.statHr} />
              <h3>{card.heading}</h3>
              <div className={styles.statNumber}>{card.statText}</div>
              <div className={styles.statCaption}>{card.caption}</div>
              <p className={styles.statConsequence}>{card.consequence}</p>
            </div>
          ))}
        </div>

        {pain.footer.type === "link" ? (
          <p className={styles.painFooter}>
            {pain.footer.text}{" "}
            <Link href={pain.footer.href} className={styles.painFooterLink}>
              {pain.footer.linkText}
            </Link>
          </p>
        ) : (
          <p className={styles.painFooter}>
            <span className={styles.painFooterNote}>{pain.footer.text}</span>
          </p>
        )}
      </section>

      {/* ============ GAP ============ */}
      <section className={styles.gap}>
        <div className={styles.gapInner}>
          <div className={styles.gapCols}>
            <div className={styles.gapCol}>
              <div className={styles.gapColLabel}>What should happen</div>
              <div className={styles.timeline}>
                {gap.shouldNodes.map((node, i) => (
                  <TimelineNode key={i} node={node} last={i === gap.shouldNodes.length - 1} />
                ))}
              </div>
            </div>
            <div className={`${styles.gapCol} ${styles.gapColActual}`}>
              <div className={styles.gapColLabel}>What actually happens</div>
              <div className={styles.timeline}>
                {gap.actualNodes.map((node, i) => (
                  <TimelineNode key={i} node={node} last={i === gap.actualNodes.length - 1} />
                ))}
                {gap.actualNote && <div className={styles.timelineNote}>{gap.actualNote}</div>}
              </div>
            </div>
          </div>
          <h2>{gap.closingLine}</h2>
        </div>
      </section>

      {/* ============ TRIGGER ============ */}
      <section className={styles.trigger}>
        <div className={styles.triggerKicker}>No new tool to open. No command to remember.</div>
        <h2>One signal. Three workflows respond.</h2>
        <div className={styles.triggerFlow}>
          <div className={`${styles.triggerPill} ${styles.triggerPillSignal}`}>
            {trigger.signal}
          </div>
          <span className={styles.triggerArrow}>→</span>
          <div className={styles.triggerPill}>Runs automatically</div>
        </div>
        <div className={styles.triggerOutputs}>
          {trigger.outputs.map((output) => (
            <div className={styles.triggerChip} key={output}>
              › {output}
            </div>
          ))}
        </div>
      </section>

      {/* ============ PRINCIPLE STRIP ============ */}
      <section className={styles.principle}>
        <p>
          We hand the busywork to AI and keep <span className={styles.accent}>the judgment</span>{" "}
          with you.
        </p>
      </section>

      {/* ============ WORKFLOWS ============ */}
      <section className={styles.workflows}>
        <h2>A workflow for every gap.</h2>
        <p>Three pains in. Three reviewable artifacts out.</p>

        {workflows.map((wf) => (
          <div className={styles.workflowRow} key={wf.number}>
            <div className={styles.workflowPain}>
              <span>Pain</span>
              <p>{wf.painLabel}</p>
            </div>
            <span className={styles.workflowArrow}>›</span>
            <div className={styles.workflowCard}>
              <div className={styles.workflowCardTop}>
                <span>Workflow {wf.number}</span>
              </div>
              <h3>{wf.title}</h3>
              <p>{wf.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ============ PROOF ============ */}
      <section className={styles.proof}>
        <div className={styles.proofInner}>
          <h2>{proof.headline}</h2>
          <p>{proof.subtext}</p>
          <div className={styles.mockPanel}>
            <div className={styles.mockPanelHead}>
              <span className={styles.mockDot} />
              <span className={styles.mockDot} />
              <span className={styles.mockDot} />
              <span className={styles.mockPanelLabel}>{proof.panelLabel}</span>
            </div>
            <div className={styles.mockPanelBody}>
              {proof.lines.map((line) => (
                <div className={styles.mockLine} key={line.title}>
                  <div className={styles.mockCheck}>✓</div>
                  <div>
                    <strong>{line.title}</strong>
                    <p>{line.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMISE / CLOSING ============ */}
      <section className={styles.closingCta}>
        <p className={styles.promiseLines}>
          Automations you can see. <span className={styles.accent}>Nothing moves</span> without a
          human on the other end.
        </p>
        <p className={styles.promiseSub}>Tuned to your workflow. Most teams are live within a week.</p>
        <Link href="/contact" className="btn-primary btn-lg">
          Let&apos;s talk
        </Link>
      </section>
    </>
  );
}

function TimelineNode({ node, last }) {
  return (
    <>
      <div className={`${styles.timelineNode} ${node.warn ? styles.warn : ""}`}>
        {node.content}
      </div>
      <div className={`${styles.timelineCaption} ${node.warn ? styles.warn : ""}`}>
        {node.caption}
      </div>
      {!last && <div className={styles.timelineConnector} />}
    </>
  );
}
