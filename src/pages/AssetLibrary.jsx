import React from 'react';
import { Link } from 'react-router-dom';
import './AssetLibrary.css';

export default function AssetLibrary() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Workspace › Asset Library</div>
          <div className="title">Asset Library</div>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">↓ Export selected</button>
          <button className="btn btn-primary btn-sm">+ Upload asset</button>
        </div>
      </div>

      <div className="content">
        <div className="filter-bar">
          <input className="search" type="text" placeholder="🔍 Search assets…" />
          <span className="chip active">All &middot; 47</span>
          <span className="chip"><span className="agent-mini agent-bdm">B</span> BDM &middot; 12</span>
          <span className="chip"><span className="agent-mini agent-smm">S</span> SMM &middot; 18</span>
          <span className="chip"><span className="agent-mini agent-seo">SEO</span> SEO &middot; 6</span>
          <span className="chip"><span className="agent-mini agent-design">D</span> Design &middot; 8</span>
          <span className="chip"><span className="agent-mini agent-data">DA</span> Data &middot; 3</span>
          <span style={{ flex: 1 }}></span>
          <select style={{ width: 'auto', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-2)', background: 'var(--bg-1)', color: 'var(--text-1)' }}>
            <option>Latest first</option>
            <option>Oldest first</option>
            <option>Most used</option>
          </select>
        </div>

        {/* LIVE / ACTIVE */}
        <div className="section-h">
          <h3>🟢 Live &amp; in use</h3>
          <div className="meta">14 assets &middot; last updated 2 hours ago</div>
        </div>

        <div className="asset-grid annotation" data-note="ASSET CARDS · click → detail view">
          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
              <div className="preview-text"><strong>Cut your sales cycle by 21 days.</strong><br /><br />See how 3 mid-market SaaS teams shortened their sales cycle using consolidated revops tooling.<br /><br />Book a 15-min walkthrough →</div>
            </div>
            <div className="body">
              <div className="title">Meta Ad — RevOps Leaders v3</div>
              <div className="meta-row"><span className="agent-mini agent-smm">S</span> SMM &middot; 4h ago &middot; <span className="ver">v3</span></div>
            </div>
            <div className="status-strip strip-live"><span>● Live &middot; $300/day</span><span>CTR 4.2%</span></div>
          </div>

          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #14532d, #16a34a)' }}>
              <div className="preview-text"><strong>Subject:</strong> Saw your Q1 announcement<br /><br />Hi [First],<br /><br />Noticed your team just expanded RevOps after the Series B — congrats. We helped [Customer] hit 142% of quota in a similar phase…</div>
            </div>
            <div className="body">
              <div className="title">Cold Email Sequence v2 — VP Sales (4 emails)</div>
              <div className="meta-row"><span className="agent-mini agent-bdm">B</span> BDM &middot; 5h ago &middot; <span className="ver">v2</span></div>
            </div>
            <div className="status-strip strip-live"><span>● Live &middot; 142 recipients</span><span>Open: 38%</span></div>
          </div>

          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #7c2d12, #ea580c)' }}>
              <div className="preview-text"><strong>Subject:</strong> 21 days shorter sales cycles — worth a look?<br /><br />Hi [First], following up on my last note. Quick proof: [Customer Logo] cut their cycle from 47 → 26 days using us. Worth 10 minutes?</div>
            </div>
            <div className="body">
              <div className="title">Cold Email Sequence v2 — Email #2 / Follow-up</div>
              <div className="meta-row"><span className="agent-mini agent-bdm">B</span> BDM &middot; 5h ago &middot; <span className="ver">v2</span></div>
            </div>
            <div className="status-strip strip-live"><span>● Live &middot; 142 recipients</span><span>Reply: 12%</span></div>
          </div>

          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #064e3b, #10b981)' }}>
              <div className="preview-text" style={{ fontSize: '7px' }}><strong>Prospect list — 200 records</strong><br /><br />Filtered: VP Sales / RevOps Director &middot; 100-500 FTE &middot; SaaS / Tech &middot; Series B+ funded<br /><br />1. Jane Doe — VP Sales, Linear<br />2. Mike Park — RevOps Dir, Notion<br />3. Sarah Yu — VP Sales, Linear…</div>
            </div>
            <div className="body">
              <div className="title">Prospect List — VP-Sales Mid-Market</div>
              <div className="meta-row"><span className="agent-mini agent-bdm">B</span> BDM &middot; Yesterday &middot; <span className="ver">v1</span></div>
            </div>
            <div className="status-strip strip-live"><span>● Active</span><span>200 leads</span></div>
          </div>
        </div>

        {/* DRAFTS */}
        <div className="section-h">
          <h3>🟡 Drafts waiting for review</h3>
          <div className="meta">3 assets &middot; need your sign-off</div>
        </div>

        <div className="asset-grid">
          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #581c87, #a855f7)' }}>
              <div className="preview-text"><strong>Tired of stitching 4 sales tools?</strong><br /><br />Your current stack: HubSpot + Salesloft + Gong + Apollo<br />Your team's reality: stitching by hand<br /><br />One platform. Save $40k/yr in tooling.</div>
            </div>
            <div className="body">
              <div className="title">Meta Ad — Pain-led Variant 2</div>
              <div className="meta-row"><span className="agent-mini agent-smm">S</span> SMM &middot; 1h ago &middot; <span className="ver">v1 (draft)</span></div>
            </div>
            <div className="status-strip strip-draft"><span>○ Awaiting your approval</span><span>→</span></div>
          </div>

          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #831843, #ec4899)' }}>
              <div className="preview-text"><strong>How Customer hit 142% of quota</strong><br /><br />Case study tease. Lead with the metric. CTA: read the full story →<br /><br />Gated for lead capture.</div>
            </div>
            <div className="body">
              <div className="title">Meta Ad — Proof-led Variant 3</div>
              <div className="meta-row"><span className="agent-mini agent-smm">S</span> SMM &middot; 1h ago &middot; <span className="ver">v1 (draft)</span></div>
            </div>
            <div className="status-strip strip-draft"><span>○ Awaiting your approval</span><span>→</span></div>
          </div>

          <div className="asset-card">
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #1c1c28, #3a3a52)' }}>
              <div className="preview-text" style={{ fontSize: '7px' }}><strong>Weekly Stop / Start / Continue</strong><br /><br />STOP: Campaign B (high CAC, low quality)<br />START: A/B testing the proof-led variant<br />CONTINUE: VP-Sales targeting, doing well</div>
            </div>
            <div className="body">
              <div className="title">Weekly S/S/C Report — May 20–27</div>
              <div className="meta-row"><span className="agent-mini agent-data">DA</span> Data Analyst &middot; 1 day ago &middot; <span className="ver">v1</span></div>
            </div>
            <div className="status-strip strip-draft"><span>○ Awaiting your approval</span><span>→</span></div>
          </div>
        </div>

        {/* ARCHIVED */}
        <div className="section-h">
          <h3>📦 Archived &amp; superseded</h3>
          <div className="meta">30 older versions</div>
        </div>

        <div className="asset-grid">
          <div className="asset-card" style={{ opacity: 0.6 }}>
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #404040, #525252)' }}>
              <div className="preview-text" style={{ color: '#666' }}><strong>Built for small teams.</strong><br /><br />Affordable workflow tools for growing startups.<br /><br />Try free for 14 days →</div>
            </div>
            <div className="body">
              <div className="title">Meta Ad — Original SMB targeting</div>
              <div className="meta-row"><span className="agent-mini agent-smm">S</span> SMM &middot; 3 weeks ago &middot; <span className="ver">v1</span></div>
            </div>
            <div className="status-strip strip-archived"><span>⨯ Paused (low fit)</span><span>—</span></div>
          </div>

          <div className="asset-card" style={{ opacity: 0.6 }}>
            <div className="thumb" style={{ background: 'linear-gradient(135deg, #404040, #525252)' }}>
              <div className="preview-text" style={{ color: '#666', fontSize: '7px' }}><strong>Cold email to 800 developers</strong><br /><br />Hi {'{'}first_name{'}'},<br />I saw you work with Node.js at {'{'}company{'}'}…<br /><br />Response rate: 0.25% &middot; marked as failure</div>
            </div>
            <div className="body">
              <div className="title">Cold Email Sequence — DevOps (March 2026)</div>
              <div className="meta-row"><span className="agent-mini agent-bdm">B</span> BDM &middot; 2 months ago &middot; <span className="ver">v1</span></div>
            </div>
            <div className="status-strip strip-archived"><span>⨯ Archived (didn't work)</span><span>—</span></div>
          </div>
        </div>


      </div>
    </>
  );
}
