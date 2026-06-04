import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './AgentPerformance.css';

export default function AgentPerformance() {
  const { setSidebarOpen } = useOutletContext();
  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Your AI Team</div>
            <div className="title">Your AI Team</div>
          </div>
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
            <div className="desc">Ready to oversee your marketing strategy &middot; 0 decisions this week</div>
          </div>
          <Link to="/war-room" className="btn btn-primary btn-sm">💬 Chat with Alex</Link>
        </div>

        {/* WORKING */}
        <div className="sec-label working">⚡ Working right now <span className="count">0</span></div>

        <div className="grid-agents">
          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#cffafe' }}>🔍</div>
              <div>
                <h3>Maya</h3>
                <div className="role">SEO Architect</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Awaiting assignment.</div>
            <div className="btns">
              <Link to="/agents/seo" className="btn btn-primary">💬 DM Maya</Link>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fce7f3' }}>📣</div>
              <div>
                <h3>Jordan</h3>
                <div className="role">SMM Specialist</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Awaiting assignment.</div>
            <div className="btns">
              <Link to="/agents/smm" className="btn btn-primary">💬 DM Jordan</Link>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#ccfbf1' }}>🧭</div>
              <div>
                <h3>Casey</h3>
                <div className="role">Lead Scout</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Awaiting assignment.</div>
            <div className="btns">
              <Link to="/agents/bdm" className="btn btn-primary">💬 DM Casey</Link>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fef3c7' }}>✉️</div>
              <div>
                <h3>Marcus</h3>
                <div className="role">Outreach Specialist</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Awaiting assignment.</div>
            <div className="btns">
              <Link to="/agents/marcus" className="btn btn-primary">💬 DM Marcus</Link>
            </div>
          </div>

          <div className="a-card">
            <div className="head">
              <div className="role-icon" style={{ background: '#fff7ed' }}>⚙️</div>
              <div>
                <h3>Devon</h3>
                <div className="role">Implementation</div>
              </div>
              <span className="status status-idle">💤 Idle</span>
            </div>
            <div className="task">Awaiting assignment.</div>
            <div className="btns">
              <Link to="/agents/devon" className="btn btn-primary">💬 DM Devon</Link>
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
              <Link to="/agents/design" className="btn btn-ghost">💬 DM Priya</Link>
              <button className="btn btn-ghost" onClick={() => alert('Task assignment module coming in v2.')}>Assign task</button>
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
              <Link to="/agents/data" className="btn btn-ghost">💬 DM Riley</Link>
              <Link to="/agents/data" className="btn btn-ghost">Ask question</Link>
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
              <button className="btn btn-ghost" onClick={() => alert('Agent activation requires approval from Alex (CMO).')}>Activate</button>
            </div>
          </div>
        </div>



      </div>
    </>
  );
}
