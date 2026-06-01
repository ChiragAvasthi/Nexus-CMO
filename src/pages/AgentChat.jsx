import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AgentChat.css';

export default function AgentChat() {
  const [activeTab, setActiveTab] = useState('chat');
  const [expandedTasks, setExpandedTasks] = useState({});

  const toggleTask = (id) => {
    setExpandedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="screen-bar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <span><span className="id">SCREEN 11</span> &middot; Talk to Quinn &middot; <code style={{ color: 'var(--text-4)' }}>/agents/quinn</code></span>
        <span><Link to="/team">← AI Team</Link> &middot; <Link to="/">All</Link></span>
      </div>

      {/* Agent switcher */}
      <div className="agent-switcher annotation" data-note="QUICK-SWITCH BETWEEN AGENTS">
        <span className="chip"><span className="role-emoji">🔍</span> Maya</span>
        <span className="chip"><span className="role-emoji">📣</span> Jordan</span>
        <span className="chip"><span className="role-emoji">🧭</span> Casey</span>
        <span className="chip"><span className="role-emoji">✉️</span> Marcus</span>
        <span className="chip"><span className="role-emoji">🎨</span> Priya</span>
        <span className="chip"><span className="role-emoji">⚙️</span> Devon</span>
        <span className="chip"><span className="role-emoji">📊</span> Riley</span>
        <span className="chip active"><span className="role-emoji">🔬</span> Quinn</span>
      </div>

      <div className="agent-wrap">
        {/* SUMMARY CARD */}
        <div className="summary-card">
          <div className="head">
            <div className="role-icon-big">🔬</div>
            <div>
              <h1>Quinn <span className="new">NEW</span></h1>
              <div className="role-line"><strong>Research Analyst</strong> &middot; competitive intel &amp; market research</div>
            </div>
          </div>
          <div className="what-i-do"><strong>What I do:</strong> Research competitors, markets, and customers — turn it into briefs the team can act on.</div>
          <div className="stats-row">
            <div className="stat" onClick={() => setActiveTab('active')}><div className="v">1</div><div className="l">Active</div></div>
            <div className="stat" onClick={() => setActiveTab('done')}><div className="v">8</div><div className="l">Done</div></div>
            <div className="stat" onClick={() => setActiveTab('briefs')}><div className="v">12</div><div className="l">Briefs</div></div>
          </div>
        </div>

        {/* TABS */}
        <div className="agent-tabs annotation" data-note="FUNCTIONAL TABS · CLICK TO SWITCH">
          <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>💬 Chat</button>
          <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>⚡ Active <span className="count">1</span></button>
          <button className={`tab ${activeTab === 'done' ? 'active' : ''}`} onClick={() => setActiveTab('done')}>✓ Done <span className="count">8</span></button>
          <button className={`tab ${activeTab === 'briefs' ? 'active' : ''}`} onClick={() => setActiveTab('briefs')}>🗂 Briefs <span className="count">12</span></button>
        </div>

        {/* TAB 1: CHAT */}
        {activeTab === 'chat' && (
          <div>
            <div className="section-h">💬 Chat with Quinn</div>
            <div className="section-sub">Ask Quinn for any research — competitor teardowns, market sizing, customer intel.</div>

            <div className="chat-card">
              <div className="chat-msg user">
                <div className="bubble">Quinn — who are our top 3 competitors and what are they doing differently?</div>
              </div>
              <div className="chat-msg agent">
                <div className="ic">🔬</div>
                <div className="bubble">
                  Your top 3 (by share of organic voice):<br /><br />
                  <strong>1. Linear Ops</strong> — leads with "21-day cycle" outcome<br />
                  <strong>2. RevHQ</strong> — pricing transparency &amp; calculator<br />
                  <strong>3. PulseRev</strong> — heavy LinkedIn content (8 posts/wk)<br /><br />
                  Want the full teardown? See the <strong>Active tab</strong> — I started it just now.
                </div>
              </div>
              <div className="chat-msg user">
                <div className="bubble">Yes — keep going.</div>
              </div>

              <div className="agent-composer">
                <textarea placeholder="Ask Quinn — research, competitor teardowns, market sizing…"></textarea>
                <div className="actions">
                  <span className="hint">Quinn shares output in the Briefs tab when done</span>
                  <button className="send-btn">Send →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE */}
        {activeTab === 'active' && (
          <div>
            <div className="section-h">⚡ Active tasks &middot; <span style={{ color: '#dc2626' }}>1 running</span></div>
            <div className="section-sub">Click any task to see its current progress and partial output.</div>

            <div className={`task-row active ${expandedTasks['t1'] ? 'expanded' : ''}`} onClick={() => toggleTask('t1')}>
              <div className="head">
                <div className="ic-tiny">●</div>
                <div className="body">
                  <h3>Full competitor teardown — top 3</h3>
                  <div className="meta">Started 2 min ago &middot; ETA 10 min &middot; You asked for this</div>
                  <div className="task-progress"><span style={{ width: '22%' }}></span></div>
                </div>
                <div className="expand-arrow">▶</div>
              </div>
              <div className="task-result" onClick={e => e.stopPropagation()}>
                <div className="result-label">Partial output (so far)</div>
                <h4>Linear Ops &middot; scraped homepage + pricing + 12 LinkedIn posts</h4>
                <p><strong>Positioning:</strong> "Cut your sales cycle by 21 days." Big number lead. Outcome-led.</p>
                <p><strong>Pricing:</strong> Starts at $499/seat/mo &middot; 3-tier (Starter / Growth / Enterprise) &middot; transparent on landing page</p>
                <p><strong>Content cadence:</strong> 4 LinkedIn posts/wk, founder-led. 1 blog/wk. Active Reddit presence in r/sales.</p>
                <div className="stat-row">
                  <div className="stat"><div className="v">$499</div><div className="l">Starter / seat</div></div>
                  <div className="stat"><div className="v">21d</div><div className="l">Cycle claim</div></div>
                  <div className="stat"><div className="v">4/wk</div><div className="l">LinkedIn posts</div></div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', fontStyle: 'italic' }}>Working on RevHQ next, then PulseRev. Final brief will land in the Briefs tab.</p>
                <div className="actions">
                  <button className="btn btn-ghost btn-sm">⏸ Pause</button>
                  <button className="btn btn-ghost btn-sm">Add follow-up</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DONE */}
        {activeTab === 'done' && (
          <div>
            <div className="section-h">✓ Done &middot; <span style={{ color: 'var(--green)' }}>8 completed</span></div>
            <div className="section-sub">Click any task to see the result Quinn delivered.</div>

            <div className={`task-row done ${expandedTasks['t2'] ? 'expanded' : ''}`} onClick={() => toggleTask('t2')}>
              <div className="head">
                <div className="ic-tiny">✓</div>
                <div className="body">
                  <h3>Market size analysis (TAM/SAM/SOM)</h3>
                  <div className="meta">Yesterday &middot; 18 min &middot; Used by Casey for targeting</div>
                </div>
                <div className="expand-arrow">▶</div>
              </div>
              <div className="task-result" style={{ borderLeftColor: 'var(--green)', background: '#f0fdf4' }} onClick={e => e.stopPropagation()}>
                <div className="result-label" style={{ color: 'var(--green)' }}>Result</div>
                <h4>Mid-market RevOps SaaS &middot; TAM &amp; ICP sizing</h4>
                <div className="stat-row">
                  <div className="stat"><div className="v">$2.4B</div><div className="l">TAM (global)</div></div>
                  <div className="stat"><div className="v">$640M</div><div className="l">SAM (NA + EU)</div></div>
                  <div className="stat"><div className="v">$48M</div><div className="l">SOM (year 1)</div></div>
                </div>
                <p><strong>4,247</strong> companies match your ICP (100–500 FTE, SaaS, post-Series-B). <strong>1,820</strong> of those are in your reachable geo.</p>
                <div className="actions">
                  <button className="btn btn-primary btn-sm">View full report</button>
                  <button className="btn btn-ghost btn-sm">📥 Download CSV</button>
                </div>
              </div>
            </div>

            <div className={`task-row done ${expandedTasks['t3'] ? 'expanded' : ''}`} onClick={() => toggleTask('t3')}>
              <div className="head">
                <div className="ic-tiny">✓</div>
                <div className="body">
                  <h3>Pricing intelligence — top 8 competitors</h3>
                  <div className="meta">3 days ago &middot; 28 min &middot; Spotted: you're 40% under market</div>
                </div>
                <div className="expand-arrow">▶</div>
              </div>
              <div className="task-result" style={{ borderLeftColor: 'var(--green)', background: '#f0fdf4' }} onClick={e => e.stopPropagation()}>
                <div className="result-label" style={{ color: 'var(--green)' }}>Result &middot; ⚠ Action recommended</div>
                <h4>Your pricing is <strong style={{ color: 'var(--red)' }}>40% below the market median</strong></h4>
                <table>
                  <tbody>
                    <tr style={{ fontWeight: 700, borderBottom: '1px solid var(--border-2)' }}><td>Competitor</td><td>Starter</td><td>Growth</td><td>Enterprise</td></tr>
                    <tr><td>Linear Ops</td><td>$499</td><td>$899</td><td>Custom</td></tr>
                    <tr><td>RevHQ</td><td>$399</td><td>$799</td><td>$1,999</td></tr>
                    <tr><td>PulseRev</td><td>$549</td><td>$999</td><td>Custom</td></tr>
                    <tr><td>Median (8 cos)</td><td>$485</td><td>$849</td><td>$1,899</td></tr>
                    <tr style={{ background: '#fee2e2' }}><td><strong>You</strong></td><td><strong>$290</strong></td><td><strong>$490</strong></td><td><strong>$1,100</strong></td></tr>
                  </tbody>
                </table>
                <p style={{ marginTop: '10px' }}><strong>My take:</strong> Test a 30% price increase on new logos. Grandfather existing customers.</p>
                <div className="actions">
                  <button className="btn btn-primary btn-sm">Discuss with Alex (CMO)</button>
                  <button className="btn btn-ghost btn-sm">Full pricing brief</button>
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '13px', padding: '12px 0' }}>+ 4 more completed</p>
          </div>
        )}

        {/* TAB 4: BRIEFS */}
        {activeTab === 'briefs' && (
          <div>
            <div className="section-h">🗂 Briefs &middot; 12 produced by Quinn</div>
            <div className="section-sub">Click any brief to preview its contents.</div>

            <div className="briefs-grid">
              <div className={`brief-card ${expandedTasks['b1'] ? 'expanded' : ''}`} onClick={() => toggleTask('b1')}>
                <div className="type-pill">Market Sizing</div>
                <h4>TAM &middot; Mid-Market RevOps SaaS</h4>
                <div className="meta">Yesterday &middot; $2.4B TAM</div>
                <div className="brief-content" onClick={e => e.stopPropagation()}>
                  <strong>Preview</strong>
                  <ul>
                    <li>TAM: $2.4B (global)</li>
                    <li>SAM: $640M (NA + EU)</li>
                    <li>SOM (Y1): $48M</li>
                    <li>4,247 target companies &middot; 1,820 reachable</li>
                  </ul>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '6px' }}>Open full brief</button>
                </div>
              </div>

              <div className={`brief-card ${expandedTasks['b2'] ? 'expanded' : ''}`} onClick={() => toggleTask('b2')}>
                <div className="type-pill">Pricing</div>
                <h4>Pricing intelligence v1</h4>
                <div className="meta">3 days ago &middot; You're 40% under market</div>
                <div className="brief-content" onClick={e => e.stopPropagation()}>
                  <strong>Preview</strong>
                  <ul>
                    <li>8 competitors analyzed</li>
                    <li>Median Starter: $485 &middot; You: $290</li>
                    <li>Median Growth: $849 &middot; You: $490</li>
                    <li>Recommendation: test 30% increase on new logos</li>
                  </ul>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '6px' }}>Open full brief</button>
                </div>
              </div>

              <div className={`brief-card ${expandedTasks['b3'] ? 'expanded' : ''}`} onClick={() => toggleTask('b3')}>
                <div className="type-pill">Trends</div>
                <h4>Q2 2026 RevOps trends</h4>
                <div className="meta">1 week ago &middot; 14 trends &middot; Maya using</div>
                <div className="brief-content" onClick={e => e.stopPropagation()}>
                  <strong>Top 3 of 14</strong>
                  <ol style={{ marginLeft: '18px' }}>
                    <li>Consolidation over stitching (4-tool fatigue)</li>
                    <li>AI-augmented RevOps roles</li>
                    <li>Outcome-based pricing experiments</li>
                  </ol>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '6px' }}>See all 14</button>
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '13px', padding: '16px 0' }}>
              + 6 more briefs &middot; <Link to="#" style={{ color: '#dc2626', fontWeight: 700 }}>View all in Asset Library →</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
