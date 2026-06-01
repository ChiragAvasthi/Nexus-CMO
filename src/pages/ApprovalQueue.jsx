import React from 'react';
import { Link } from 'react-router-dom';
import './ApprovalQueue.css';

export default function ApprovalQueue() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Workspace › Approval Queue</div>
          <div className="title">Approval Queue</div>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">⚙ Auto-approve rules</button>
          <button className="btn btn-primary btn-sm">Approve all safe items</button>
        </div>
      </div>

      <div className="content">
        <div className="page-head">
          <h1>3 things need your sign-off</h1>
          <p>Your CMO already QC'd everything here. These are clean — just need your final yes.</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className="tab active">Needs your sign-off <span className="count">3</span></div>
          <div className="tab">CMO auto-rejected (for transparency) <span className="count">5</span></div>
          <div className="tab">Recently approved <span className="count">28</span></div>
        </div>

        {/* Friendly summary */}
        <div className="summary-banner">
          <div className="icon">✓</div>
          <div>
            <strong>This week your CMO caught 5 issues</strong> before they got to you — saving you ~40 minutes of review time and likely $620 in wasted ad spend.
            <Link to="#" style={{ color: 'var(--cyan)', fontSize: '12px', marginLeft: '8px' }}>See what was rejected →</Link>
          </div>
        </div>

        {/* APPROVAL ITEM 1 — Ad copy */}
        <div className="approval-row annotation" data-note="ITEM TEMPLATE">
          <div className="head">
            <div className="agent-avatar agent-smm">S</div>
            <div className="info">
              <h3>New Meta ad — "RevOps Leaders, Mid-Market" campaign</h3>
              <div className="meta-line">
                <span>By SMM Specialist</span>
                <span>·</span>
                <span>Submitted 2 hours ago</span>
                <span>·</span>
                <span className="severity sev-high">High impact</span>
                <span>·</span>
                <span>Will spend up to $300/day</span>
              </div>
            </div>
          </div>

          <div className="preview-area">
            <div className="preview-label">Preview · Variant 1 of 3</div>
            <div className="ad-preview">
              <div className="headline">Cut your sales cycle by 21 days</div>
              <div className="body">See how 3 mid-market SaaS teams shortened their sales cycle using consolidated revops tooling. 15-min walkthrough.</div>
              <div className="cta">Book a demo →</div>
            </div>
          </div>

          <div className="cmo-note">
            <div className="avatar-mini">N</div>
            <div>
              <strong>CMO note:</strong> I reviewed all 3 variants. Variant 1 (outcome-led) tested best in past patterns — your top conversion ads always lead with a number.
              Variant 2 ("Tired of stitching…") is good but more pain-led; I'd run it secondary. Variant 3 needs the case study landing page ready first (Graphic Designer is locked — flagged).
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-success">✓ Approve &amp; launch all 3</button>
            <button className="btn">Approve only Variant 1</button>
            <button className="btn btn-ghost">Edit copy</button>
            <button className="btn btn-danger" style={{ marginLeft: 'auto' }}>⨯ Reject (with reason)</button>
          </div>
        </div>

        {/* APPROVAL ITEM 2 — Email sequence */}
        <div className="approval-row">
          <div className="head">
            <div className="agent-avatar agent-bdm">B</div>
            <div className="info">
              <h3>Cold email sequence v2 — 200 prospects, 4-email cadence</h3>
              <div className="meta-line">
                <span>By Growth BDM</span>
                <span>·</span>
                <span>Submitted 5 hours ago</span>
                <span>·</span>
                <span className="severity sev-high">High impact</span>
                <span>·</span>
                <span>Will send to 200 inboxes</span>
              </div>
            </div>
          </div>

          <div className="preview-area">
            <div className="preview-label">Email #1 · Subject: "Saw your Q1 announcement"</div>
            <div style={{ background: 'white', color: '#333', padding: '16px', borderRadius: '8px', fontFamily: 'serif', fontSize: '12px', lineHeight: 1.6, maxWidth: '520px' }}>
              <div style={{ color: '#888', fontSize: '10px' }}>From: sam@acme-sales-os.com · To: {'{{first_name}}'}@{'{{company_domain}}'}</div>
              <div style={{ borderTop: '1px solid #eee', margin: '8px 0', paddingTop: '8px' }}>
                Hi {'{{first_name}}'},<br /><br />
                Noticed your team just expanded RevOps after the Series B — congrats. We helped a similar team at <strong>Linear</strong> hit 142% of quota in their first year post-funding.<br /><br />
                The pattern: cycle time dropped from 47 → 26 days once they stopped stitching across 4 tools.<br /><br />
                Would 15 minutes next week be useful? I'll bring the playbook, no pitch.<br /><br />
                — Sam
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-3)' }}>
              + 3 more emails in this sequence (follow-up at +3 days, +7 days, +14 days). <Link to="#" style={{ color: 'var(--cyan)' }}>Read all 4 →</Link>
            </div>
          </div>

          <div className="cmo-note">
            <div className="avatar-mini">N</div>
            <div>
              <strong>CMO note:</strong> Personalization tokens look clean (validated against 200 prospect records — 0 missing fields).
              Your past failed sequence in March was sent to <em>developers</em>; this one goes to <em>VP-Sales</em>. Completely different audience and message. We're not repeating that mistake.
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-success">✓ Approve &amp; schedule send</button>
            <button className="btn btn-ghost">Edit any email</button>
            <button className="btn btn-ghost">Send test to me first</button>
            <button className="btn btn-danger" style={{ marginLeft: 'auto' }}>⨯ Reject</button>
          </div>
        </div>

        {/* APPROVAL ITEM 3 — S/S/C Report */}
        <div className="approval-row">
          <div className="head">
            <div className="agent-avatar agent-data">DA</div>
            <div className="info">
              <h3>Weekly Stop / Start / Continue report — May 20–27</h3>
              <div className="meta-line">
                <span>By Data Analyst</span>
                <span>·</span>
                <span>Submitted 1 day ago</span>
                <span>·</span>
                <span className="severity sev-low">Informational</span>
              </div>
            </div>
          </div>

          <div className="preview-area">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', maxWidth: '720px' }}>
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '8px' }}>⨯ STOP</div>
                <div style={{ fontSize: '12px', color: 'var(--text-1)' }}>Campaign B — SMB targeting. CAC $340 vs target $180. Burning ~$80/day for low-fit leads.</div>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '8px' }}>▶ START</div>
                <div style={{ fontSize: '12px', color: 'var(--text-1)' }}>Duplicate Campaign A targeting RevOps Director title (adjacent ICP). Forecast: +30% pipeline.</div>
              </div>
              <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '8px' }}>✓ CONTINUE</div>
                <div style={{ fontSize: '12px', color: 'var(--text-1)' }}>VP-Sales targeting. CTR 4.2× higher, demo no-show rate 73% → 41% in 1 week.</div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-success">✓ Got it — close report</button>
            <button className="btn btn-ghost">Discuss with CMO</button>
            <button className="btn btn-ghost">Email me a copy</button>
          </div>
        </div>

        {/* QC REJECTED PREVIEW (transparency) */}
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '36px 0 12px' }}>
          🔍 Recently auto-rejected by your CMO (for transparency)
        </h2>

        <div className="approval-row qc-rejected">
          <div className="head">
            <div className="agent-avatar agent-smm">S</div>
            <div className="info">
              <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>Meta ad draft — generic "boost your sales" copy</h3>
              <div className="meta-line">
                <span>SMM Specialist · drafted 6 hours ago</span>
                <span>·</span>
                <span style={{ color: 'var(--red)' }}>Rejected by CMO · sent back for revision</span>
              </div>
            </div>
          </div>

          <div className="cmo-note" style={{ background: 'var(--red-soft)', borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="avatar-mini">N</div>
            <div>
              <strong style={{ color: 'var(--red)' }}>CMO rejected this because:</strong> The headline "Boost your sales" is generic — doesn't reference Sam's actual differentiation (cycle time, tool consolidation).
              Sent back to SMM with the brief: "lead with a specific outcome metric from real customer data." Revised version was approved 4 hours later — see top of queue.
            </div>
          </div>
        </div>

        <div className="dev-note" style={{ marginTop: '28px' }}>
          <strong>Dev note — Approval Queue logic:</strong>
          Every Asset has a <code>qc_verdict</code> (CMO's internal call) and a <code>user_status</code> (final user call).
        </div>
      </div>
    </>
  );
}
