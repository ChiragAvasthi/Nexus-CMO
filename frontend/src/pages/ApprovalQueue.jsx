import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './ApprovalQueue.css';

export default function ApprovalQueue() {
  const { setSidebarOpen } = useOutletContext();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Approval Queue</div>
            <div className="title">Approval Queue</div>
          </div>
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
          <div className={`tab${activeTab === 0 ? ' active' : ''}`} onClick={() => setActiveTab(0)}>
            Needs your sign-off <span className="count">3</span>
          </div>
          <div className={`tab${activeTab === 1 ? ' active' : ''}`} onClick={() => setActiveTab(1)}>
            CMO auto-rejected (for transparency) <span className="count">5</span>
          </div>
          <div className={`tab${activeTab === 2 ? ' active' : ''}`} onClick={() => setActiveTab(2)}>
            Recently approved <span className="count">28</span>
          </div>
        </div>

        {/* ===== TAB 0: Needs sign-off ===== */}
        {activeTab === 0 && (
          <>
            {/* Friendly summary */}
            <div className="summary-banner">
              <div className="icon">✓</div>
              <div>
                <strong>This week your CMO caught 5 issues</strong> before they got to you — saving you ~40 minutes of review time and likely $620 in wasted ad spend.
                <span className="see-rejected" onClick={() => setActiveTab(1)} style={{ color: 'var(--cyan)', fontSize: '12px', marginLeft: '8px', cursor: 'pointer' }}>See what was rejected →</span>
              </div>
            </div>

            {/* APPROVAL ITEM 1 — Ad copy */}
            <div className="approval-row">
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
          </>
        )}

        {/* ===== TAB 1: CMO auto-rejected ===== */}
        {activeTab === 1 && (
          <>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '24px 0 12px' }}>
              🔍 Auto-rejected by your CMO (for transparency)
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

            <div className="approval-row qc-rejected">
              <div className="head">
                <div className="agent-avatar agent-bdm">B</div>
                <div className="info">
                  <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>Cold email draft — wrong persona (IC Engineer)</h3>
                  <div className="meta-line">
                    <span>Growth BDM · drafted 1 day ago</span>
                    <span>·</span>
                    <span style={{ color: 'var(--red)' }}>Rejected by CMO · wrong ICP</span>
                  </div>
                </div>
              </div>
              <div className="cmo-note" style={{ background: 'var(--red-soft)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div className="avatar-mini">N</div>
                <div>
                  <strong style={{ color: 'var(--red)' }}>CMO rejected this because:</strong> This sequence targeted IC engineers — same mistake as March. ICP is VP-Sales. Sent back with corrected persona brief.
                </div>
              </div>
            </div>

            <div className="approval-row qc-rejected">
              <div className="head">
                <div className="agent-avatar agent-seo">SEO</div>
                <div className="info">
                  <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>Blog post — "What is RevOps?" (too broad)</h3>
                  <div className="meta-line">
                    <span>SEO Architect · drafted 2 days ago</span>
                    <span>·</span>
                    <span style={{ color: 'var(--red)' }}>Rejected by CMO · too generic</span>
                  </div>
                </div>
              </div>
              <div className="cmo-note" style={{ background: 'var(--red-soft)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div className="avatar-mini">N</div>
                <div>
                  <strong style={{ color: 'var(--red)' }}>CMO rejected this because:</strong> "What is RevOps" is a top-of-funnel keyword with 90% informational intent — won't convert. Redirected to "RevOps tool comparison" (high commercial intent).
                </div>
              </div>
            </div>

            <div className="approval-row qc-rejected">
              <div className="head">
                <div className="agent-avatar agent-smm">S</div>
                <div className="info">
                  <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>LinkedIn post — product feature announcement</h3>
                  <div className="meta-line">
                    <span>SMM Specialist · drafted 3 days ago</span>
                    <span>·</span>
                    <span style={{ color: 'var(--red)' }}>Rejected by CMO · low engagement format</span>
                  </div>
                </div>
              </div>
              <div className="cmo-note" style={{ background: 'var(--red-soft)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div className="avatar-mini">N</div>
                <div>
                  <strong style={{ color: 'var(--red)' }}>CMO rejected this because:</strong> Feature announcements get 3× lower engagement than story-led posts. Rewrote as a customer story instead.
                </div>
              </div>
            </div>

            <div className="approval-row qc-rejected">
              <div className="head">
                <div className="agent-avatar agent-design">D</div>
                <div className="info">
                  <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>Slide deck v2 — still 28 slides</h3>
                  <div className="meta-line">
                    <span>Designer · drafted 4 days ago</span>
                    <span>·</span>
                    <span style={{ color: 'var(--red)' }}>Rejected by CMO · too long</span>
                  </div>
                </div>
              </div>
              <div className="cmo-note" style={{ background: 'var(--red-soft)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div className="avatar-mini">N</div>
                <div>
                  <strong style={{ color: 'var(--red)' }}>CMO rejected this because:</strong> Still 28 slides (target: 16). Dropped off section identified at slides 17-22. Sent back with specific slides to cut.
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== TAB 2: Recently approved ===== */}
        {activeTab === 2 && (
          <>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '24px 0 12px' }}>
              ✓ Recently approved items
            </h2>

            {[
              { agent: 'smm', label: 'S', title: 'Meta Ad — RevOps Leaders v2', time: 'Approved 4 hours ago', status: '● Live · $300/day' },
              { agent: 'bdm', label: 'B', title: 'Prospect list — 200 VP-Sales contacts', time: 'Approved 5 hours ago', status: '● Active · 200 leads' },
              { agent: 'seo', label: 'SEO', title: 'Content plan — 12 keywords, 6-month roadmap', time: 'Approved yesterday', status: '● In progress' },
              { agent: 'bdm', label: 'B', title: 'Cold email sequence v1 — test batch (50 recipients)', time: 'Approved 2 days ago', status: '● Completed · 38% open rate' },
              { agent: 'smm', label: 'S', title: 'LinkedIn post — "How we cut sales cycle by 21 days"', time: 'Approved 3 days ago', status: '● Published · 2.4k impressions' },
              { agent: 'data', label: 'DA', title: 'GA4 conversion tracking setup', time: 'Approved 4 days ago', status: '● Installed · tracking live' },
              { agent: 'design', label: 'D', title: 'Sales deck v3 — 16 slides', time: 'Approved 5 days ago', status: '● Live · sent to 4 prospects' },
              { agent: 'smm', label: 'S', title: 'Meta Ad — Pain-led variant test', time: 'Approved 1 week ago', status: '● Paused · CTR 1.2% (below target)' },
            ].map((item, i) => (
              <div className="approval-row approved-row" key={i}>
                <div className="head">
                  <div className={`agent-avatar agent-${item.agent}`}>{item.label}</div>
                  <div className="info">
                    <h3>{item.title}</h3>
                    <div className="meta-line">
                      <span>{item.time}</span>
                      <span>·</span>
                      <span style={{ color: 'var(--green)' }}>{item.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
    </>
  );
}
