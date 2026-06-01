import React from 'react';
import { Link } from 'react-router-dom';
import './CommandCenter.css';

export default function CommandCenter() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Workspace › Command Center</div>
          <div className="title">Good morning, Sam</div>
        </div>
        <div className="actions">
          <Link to="/war-room" className="btn btn-primary btn-sm">+ Talk to CMO</Link>
        </div>
      </div>

      <div className="content">
        <div className="kpi-row">
          <div className="kpi">
            <div className="label">MRR</div>
            <div className="value">$14,200</div>
            <div className="delta up">▲ $2,400 this month</div>
          </div>
          <div className="kpi">
            <div className="label">Qualified leads / wk</div>
            <div className="value">12</div>
            <div className="delta up">▲ 4</div>
          </div>
          <div className="kpi">
            <div className="label">Goal progress</div>
            <div className="value">57%</div>
            <div className="delta flat">on track</div>
          </div>
          <div className="kpi">
            <div className="label">Cost / lead</div>
            <div className="value">$78</div>
            <div className="delta down">▼ 18%</div>
          </div>
        </div>

        <div className="layout-2col">
          <div>
            <div className="cmo-focus annotation" data-note="CMO LIVE · websocket">
              <div className="head">
                <div className="agent-avatar agent-cmo lg">N</div>
                <div className="who">
                  Your CMO
                  <span>Cutting ad spend on the wrong audience</span>
                </div>
                <span className="pill pill-magenta" style={{ marginLeft: 'auto' }}>
                  <span className="dot dot-live"></span> Active
                </span>
              </div>
              <div className="msg">
                I rewrote your Meta ads for VP-Sales — early data is good (CTR up 2.4×). I need your sign-off before pushing them live.
              </div>
              <div className="actions">
                <Link to="/approvals" className="btn btn-primary btn-sm">Review new ads</Link>
                <Link to="/war-room" className="btn btn-ghost btn-sm">Open War Room →</Link>
              </div>
            </div>

            <div className="approvals-card">
              <div className="head">
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>Waiting on you</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '2px' }}>3 items</div>
                </div>
                <Link to="/approvals" className="btn btn-ghost btn-sm">See all →</Link>
              </div>

              <div className="approval-item">
                <div className="preview" style={{ background: 'var(--magenta-soft)', color: 'var(--magenta)' }}>📝</div>
                <div className="info">
                  <div className="title">3 new Meta ads — RevOps Leaders</div>
                  <div className="meta">By SMM · 2h ago · $300/day budget</div>
                </div>
                <div className="btns">
                  <button className="btn btn-success btn-sm">Approve</button>
                </div>
              </div>

              <div className="approval-item">
                <div className="preview" style={{ background: 'var(--amber-soft)', color: 'var(--amber)' }}>📧</div>
                <div className="info">
                  <div className="title">Cold email sequence — 200 prospects</div>
                  <div className="meta">By BDM · 5h ago</div>
                </div>
                <div className="btns">
                  <button className="btn btn-success btn-sm">Approve</button>
                </div>
              </div>

              <div className="approval-item">
                <div className="preview" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>📊</div>
                <div className="info">
                  <div className="title">Weekly Stop / Start / Continue</div>
                  <div className="meta">By Data Analyst · 1d ago</div>
                </div>
                <div className="btns">
                  <button className="btn btn-success btn-sm">Approve</button>
                </div>
              </div>
            </div>

            <div className="timeline-card">
              <div className="head">
                <div style={{ fontSize: '15px', fontWeight: 700 }}>This week</div>
                <button className="btn btn-ghost btn-sm">Full log →</button>
              </div>
              <div className="timeline-item">
                <div className="time">11:42</div>
                <div className="text"><strong>SMM</strong> drafted 3 ad variants. CMO accepted 2, sent 1 back.</div>
              </div>
              <div className="timeline-item">
                <div className="time">9:15</div>
                <div className="text"><strong>BDM</strong> enriched 200 prospects → 142 match new ICP.</div>
              </div>
              <div className="timeline-item">
                <div className="time">Yest</div>
                <div className="text"><strong>Data Analyst</strong> spotted demo no-show rate dropped 73% → 41%. Good signal.</div>
              </div>
              <div className="timeline-item">
                <div className="time">Yest</div>
                <div className="text">
                  <strong style={{ color: 'var(--magenta)' }}>CMO disagreed</strong> with your "3× ad spend" request. <Link to="/war-room">See why →</Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="goal-card">
              <div className="gh">Your 90-day goal</div>
              <div className="goal-title">$25k MRR by end of Q3</div>
              <div className="progress"><span style={{ width: '57%' }}></span></div>
              <div className="stats">
                <div className="stat"><div className="v">$14.2k</div><div className="l">Today</div></div>
                <div className="stat"><div className="v">$25k</div><div className="l">Target</div></div>
                <div className="stat"><div className="v">42d</div><div className="l">Left</div></div>
              </div>
            </div>

            <div className="agents-mini annotation" data-note="ALL UNLOCKED · Full Nexus">
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Your AI team</div>

              <div className="agent-row">
                <div className="agent-avatar agent-cmo">N</div>
                <div className="info">
                  <div className="name">CMO</div>
                  <div className="task">Reviewing ad copy</div>
                </div>
                <span className="dot dot-live"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-seo">SEO</div>
                <div className="info">
                  <div className="name">SEO Architect</div>
                  <div className="task">Mapping 12 keywords</div>
                </div>
                <span className="dot dot-live"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-smm">S</div>
                <div className="info">
                  <div className="name">SMM Specialist</div>
                  <div className="task">Drafting ad variants</div>
                </div>
                <span className="dot dot-live"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-bdm">B</div>
                <div className="info">
                  <div className="name">Growth BDM</div>
                  <div className="task">Building prospect list (142/200)</div>
                </div>
                <span className="dot dot-live"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-design">D</div>
                <div className="info">
                  <div className="name">Designer</div>
                  <div className="task">Rebuilding sales deck</div>
                </div>
                <span className="dot dot-live"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-data">DA</div>
                <div className="info">
                  <div className="name">Data Analyst</div>
                  <div className="task">Setting up GA4 goals</div>
                </div>
                <span className="dot dot-live"></span>
              </div>

              <Link to="/team" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                See full team →
              </Link>
            </div>
          </div>
        </div>

        <div className="dev-note" style={{ marginTop: '24px' }}>
          <strong>Dev note:</strong> Real-time (websocket) for CMO focus + agent dots. Polled hourly: KPIs, goal progress. Reference: <code>FR-18, FR-20</code>.
        </div>
      </div>
    </>
  );
}
