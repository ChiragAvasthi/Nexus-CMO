import React from 'react';
import { Link } from 'react-router-dom';
import './AgentPerformance.css';

export default function AgentPerformance() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Workspace › Your AI Team</div>
          <div className="title">Your AI Team</div>
        </div>
      </div>

      <div className="content">
        <div className="page-head">
          <h1>What your team is doing right now</h1>
          <p>8 specialists + Alex. Each agent has a designation icon. Click any to DM them.</p>
        </div>

        {/* ALEX */}
        <div className="cmo-card">
          <div className="ic-big">🎯</div>
          <div className="info">
            <h2>Alex &middot; CMO <span className="status status-working" style={{ marginLeft: '6px' }}><span className="dot dot-live"></span> Active</span></h2>
            <div className="desc">Reviewing Jordan's ad variants &middot; 14 decisions this week</div>
          </div>
          <Link to="/war-room" className="btn btn-primary btn-sm">💬 Chat with Alex</Link>
        </div>

        {/* WORKING */}
        <div className="sec-label working">⚡ Working right now <span className="count">5</span></div>

        <div className="grid-agents annotation" data-note="DESIGNATION ICONS · CLICK TO DM">
          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#cffafe' }}>🔍</div>
              <div>
                <h3>Maya</h3>
                <div className="role">SEO Architect</div>
              </div>
              <span className="status status-working"><span className="dot dot-live"></span> Working</span>
            </div>
            <div className="task">Mapping 12 keywords your competitors rank for.</div>
            <div className="btns">
              <Link to="/agents/maya" className="btn btn-primary">💬 DM Maya</Link>
              <button className="btn btn-ghost">See work</button>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fce7f3' }}>📣</div>
              <div>
                <h3>Jordan</h3>
                <div className="role">SMM Specialist</div>
              </div>
              <span className="status status-working"><span className="dot dot-live"></span> Working</span>
            </div>
            <div className="task">Writing 3 ad variants for Campaign A-2.</div>
            <div className="btns">
              <Link to="/agents/jordan" className="btn btn-primary">💬 DM Jordan</Link>
              <button className="btn btn-ghost">See work</button>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#ccfbf1' }}>🧭</div>
              <div>
                <h3>Casey</h3>
                <div className="role">Lead Scout</div>
              </div>
              <span className="status status-working"><span className="dot dot-live"></span> Working</span>
            </div>
            <div className="task">Sourcing 200 GMs at Texas car dealerships. 146/200.</div>
            <div className="btns">
              <Link to="/agents/casey" className="btn btn-primary">💬 DM Casey</Link>
              <button className="btn btn-ghost">See list</button>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fef3c7' }}>✉️</div>
              <div>
                <h3>Marcus</h3>
                <div className="role">Outreach Specialist</div>
              </div>
              <span className="status status-working"><span className="dot dot-live"></span> Working</span>
            </div>
            <div className="task">Drafting 4-email sequence. Warming sender domain.</div>
            <div className="btns">
              <Link to="/agents/marcus" className="btn btn-primary">💬 DM Marcus</Link>
              <button className="btn btn-ghost">See work</button>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fff7ed' }}>⚙️</div>
              <div>
                <h3>Devon</h3>
                <div className="role">Implementation</div>
              </div>
              <span className="status status-working"><span className="dot dot-live"></span> Working</span>
            </div>
            <div className="task">Installing GA4 conversion tracking on your site.</div>
            <div className="btns">
              <Link to="/agents/devon" className="btn btn-primary">💬 DM Devon</Link>
              <button className="btn btn-ghost">See work</button>
            </div>
          </div>
        </div>

        {/* IDLE */}
        <div className="sec-label idle">💤 On standby — ready when needed <span className="count">3</span></div>

        <div className="grid-agents">
          <div className="a-card idle">
            <div className="head">
              <div className="role-icon" style={{ background: '#ede9fe' }}>🎨</div>
              <div>
                <h3 style={{ color: 'var(--text-2)' }}>Priya</h3>
                <div className="role">Designer</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Finished deck rebuild yesterday. Ready for next assignment.</div>
            <div className="btns">
              <Link to="/agents/priya" className="btn btn-ghost">💬 DM Priya</Link>
              <button className="btn btn-ghost">Assign task</button>
            </div>
          </div>

          <div className="a-card idle">
            <div className="head">
              <div className="role-icon" style={{ background: '#d1fae5' }}>📊</div>
              <div>
                <h3 style={{ color: 'var(--text-2)' }}>Riley</h3>
                <div className="role">Data Analyst</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Weekly report shipped. Next report scheduled Monday.</div>
            <div className="btns">
              <Link to="/agents/riley" className="btn btn-ghost">💬 DM Riley</Link>
              <button className="btn btn-ghost">Ask question</button>
            </div>
          </div>

          <div className="a-card idle">
            <div className="head">
              <div className="role-icon" style={{ background: '#fee2e2' }}>🔬</div>
              <div>
                <h3 style={{ color: 'var(--text-2)' }}>Quinn <span className="new-pill">NEW</span></h3>
                <div className="role">Research Analyst</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Bring in for competitor teardowns, market sizing, category trends.</div>
            <div className="btns">
              <Link to="/agents/quinn" className="btn btn-ghost">💬 DM Quinn</Link>
              <button className="btn btn-ghost">Activate</button>
            </div>
          </div>
        </div>

        <div className="dev-note" style={{ marginTop: '24px' }}>
          <strong>Dev note:</strong> 9 agents total (Alex CMO + 8 specialists). Each agent has a designation emoji icon + accent color. Status: <code>working | idle | blocked</code>. Quinn's tools: SimilarWeb, BuiltWith, G2, Capterra, SEMrush, web scrapers.
        </div>

      </div>
    </>
  );
}
