import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TruthReport.css';

export default function TruthReport() {
  const navigate = useNavigate();

  return (
    <>
      <div className="screen-bar">
        <span><span className="id">SCREEN 05</span> &middot; Truth Report &middot; <code style={{ color: 'var(--text-4)' }}>FR-07, FR-08</code> &middot; <strong style={{ color: 'var(--magenta)' }}>HERO MOMENT</strong></span>
        <span><Link to="/">← All screens</Link> &middot; <Link to="/command-center">Next: Command Center →</Link></span>
      </div>

      <div className="truth-wrap">
        <div className="report-head">
          <span className="badge-tr">📋 Your Truth Report</span>
          <h1>Here's what's broken — and how I'll fix it.</h1>
          <p className="lead">
            I found <strong>7 things</strong> getting in the way of your goal. Approve the fixes you want me to start on.
            Red first.
          </p>

          <div className="severity-row">
            <span className="sev-pill sev-critical-pill"><span className="n">2</span> Critical</span>
            <span className="sev-pill sev-high-pill"><span className="n">3</span> High</span>
            <span className="sev-pill sev-medium-pill"><span className="n">2</span> Medium</span>
          </div>
        </div>

        <div className="section-h">Ranked by what hurts you most</div>

        {/* 01 — CRITICAL */}
        <div className="loophole critical annotation" data-note="LOOPHOLE COMPONENT">
          <div className="row1">
            <div className="num">01</div>
            <div className="body">
              <h3>Your ads target small businesses, but your pricing is built for Enterprise.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>73% demo no-show rate. SMBs see your price ($24k/yr) and ghost.</p>
              <div className="fix-line">
                <div className="check">✓</div>
                <div>
                  Rewrite 3 ad sets for VP-Sales at 50–500 FTE companies. Cuts wasted spend ~60%.
                  <span className="agent-badge"><span className="agent-avatar agent-smm">S</span> SMM &middot; 2 days</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>Skip</button>
              </div>
            </div>
          </div>
        </div>

        {/* 02 — CRITICAL */}
        <div className="loophole critical">
          <div className="row1">
            <div className="num">02</div>
            <div className="body">
              <h3>Your sales deck is 32 slides — twice as long as it should be.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Your last 6 demos all dropped off around slide 17. Industry benchmark: 14–18.</p>
              <div className="fix-line">
                <div className="check">✓</div>
                <div>
                  Rebuild to 16 slides. Keep your strongest customer story.
                  <span className="agent-badge"><span className="agent-avatar agent-design">D</span> Designer &middot; 3 days</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
              </div>
            </div>
          </div>
        </div>

        {/* 03 — HIGH */}
        <div className="loophole high">
          <div className="row1">
            <div className="num">03</div>
            <div className="body">
              <h3>You're invisible on Google for your own product category.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Top 3 competitors each get 4–8k monthly free visits. You get 0.</p>
              <div className="fix-line">
                <div className="check">✓</div>
                <div>
                  6-month content plan around 12 keywords. First 4 posts in 2 weeks.
                  <span className="agent-badge"><span className="agent-avatar agent-seo">SEO</span> SEO Architect</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
              </div>
            </div>
          </div>
        </div>

        {/* 04 — HIGH */}
        <div className="loophole high">
          <div className="row1">
            <div className="num">04</div>
            <div className="body">
              <h3>You've been cold-emailing developers. They're not your buyer.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>800 emails sent, 0.25% reply rate. Your real ICP is VP-Sales.</p>
              <div className="fix-line">
                <div className="check">✓</div>
                <div>
                  New prospect list: 200 VP-Sales / RevOps at SaaS 100–500 FTE. New sequence.
                  <span className="agent-badge"><span className="agent-avatar agent-bdm">B</span> BDM &middot; 1 week</span>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
              </div>
            </div>
          </div>
        </div>

        {/* 05 — HIGH */}
        <div className="loophole high">
          <div className="row1">
            <div className="num">05</div>
            <div className="body">
              <h3>Your LinkedIn page hasn't posted in 47 days.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Competitors post daily. You're losing share of voice.</p>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
              </div>
            </div>
          </div>
        </div>

        {/* 06 — MEDIUM */}
        <div className="loophole medium">
          <div className="row1">
            <div className="num">06</div>
            <div className="body">
              <h3>Your homepage promises something you don't actually sell.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>"Workflow automation for everyone" vs. your real niche: RevOps at mid-market SaaS.</p>
              <div className="actions">
                <button className="btn btn-primary btn-sm">✓ Approve</button>
                <button className="btn btn-ghost btn-sm">Tell me more</button>
              </div>
            </div>
          </div>
        </div>

        {/* 07 — MEDIUM */}
        <div className="loophole medium">
          <div className="row1">
            <div className="num">07</div>
            <div className="body">
              <h3>You can't measure what's working — no analytics goals set up.</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Until we fix this, every dollar spent is a guess.</p>
              <div className="fix-line">
                <div className="check">✓</div>
                <div>
                  Set up GA4 goals &amp; revenue attribution.
                  <span className="agent-badge"><span className="agent-avatar agent-data">DA</span> Data Analyst &middot; 2 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bar */}
        <div className="approve-bar">
          <div className="count"><strong>3 approved</strong> &middot; 4 pending</div>
          <div className="right">
            <button className="btn btn-ghost btn-sm">Approve all</button>
            <button className="btn btn-primary" onClick={() => navigate('/command-center')}>Start work →</button>
          </div>
        </div>

        <div className="dev-note" style={{ marginTop: '20px' }}>
          <strong>Dev note:</strong> Each loophole is a DB entity (<code>FR-08</code>). User must approve ≥ 1 to proceed. Approved fixes spawn tasks in the relevant agent's queue immediately.
        </div>
      </div>
    </>
  );
}
