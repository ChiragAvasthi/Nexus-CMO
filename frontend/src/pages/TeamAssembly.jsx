import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TeamAssembly.css';

export default function TeamAssembly() {
  const navigate = useNavigate();
  const { workspace } = useAuth();

  return (
    <div className="team-assembly-wrap">
      {/* Hero */}
      <div className="ta-hero">
        <div className="eyebrow">⚡ Alex has reviewed your business</div>
        <h1>I'm bringing in 5 specialists.<br />The other 3 — we don't need yet.</h1>
        <p className="sub">I always start lean. We can activate the rest anytime you need them.</p>
      </div>

      {/* CMO Speech Bubble */}
      <div className="cmo-speech">
        <div className="avatar">🎯</div>
        <div className="info">
          <div className="who">Alex · CMO</div>
          <div className="msg">
            Based on your goal (<strong>{workspace?.goal || 'Growth'}</strong>) and what's broken, I'm activating
            <strong> Maya, Jordan, Casey, Marcus &amp; Devon</strong>. Skipping Priya, Riley, &amp; Quinn for now — they'll add value later
            but aren't urgent. <strong>You can override any of this.</strong>
          </div>
        </div>
      </div>

      {/* ACTIVE NOW */}
      <div className="ta-sec-label active">⚡ Activated now — working on your business <span className="count">5</span></div>

      <div className="ta-grid">
        {/* Maya — SEO */}
        <div className="ta-card active">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#cffafe' }}>🔍</div>
            <div>
              <div className="role-name">Maya</div>
              <div className="role-title">SEO Architect</div>
            </div>
          </div>
          <div className="task">Auditing your digital footprint and SEO gaps.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-working"><span className="dot dot-live"></span> Working</span>
          </div>
        </div>

        {/* Jordan — SMM */}
        <div className="ta-card active">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#fce7f3' }}>📣</div>
            <div>
              <div className="role-name">Jordan</div>
              <div className="role-title">SMM Specialist</div>
            </div>
          </div>
          <div className="task">Reviewing past ad campaigns and audience targeting.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-working"><span className="dot dot-live"></span> Working</span>
          </div>
        </div>

        {/* Casey — Lead Scout */}
        <div className="ta-card active">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#ccfbf1' }}>🧭</div>
            <div>
              <div className="role-name">Casey</div>
              <div className="role-title">Growth BDM</div>
            </div>
          </div>
          <div className="task">Identifying your ideal customer profile and outreach channels.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-working"><span className="dot dot-live"></span> Working</span>
          </div>
        </div>

        {/* Marcus — Outreach */}
        <div className="ta-card active">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#fef3c7' }}>✉️</div>
            <div>
              <div className="role-name">Marcus</div>
              <div className="role-title">Outreach Specialist</div>
            </div>
          </div>
          <div className="task">Preparing cold outreach scripts and email frameworks.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-working"><span className="dot dot-live"></span> Working</span>
          </div>
        </div>

        {/* Devon — Implementation */}
        <div className="ta-card active">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#fff7ed' }}>⚙️</div>
            <div>
              <div className="role-name">Devon</div>
              <div className="role-title">Implementation</div>
            </div>
          </div>
          <div className="task">Setting up tracking tools and CRM integrations.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-working"><span className="dot dot-live"></span> Working</span>
          </div>
        </div>
      </div>

      {/* ON HOLD */}
      <div className="ta-sec-label hold">⏸ Not needed yet — ready when you are <span className="count">4</span></div>

      <div className="ta-grid">
        {/* Priya — Designer */}
        <div className="ta-card hold">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#ede9fe', opacity: 0.5 }}>🎨</div>
            <div>
              <div className="role-name" style={{ color: 'var(--text-2)' }}>Priya</div>
              <div className="role-title">Designer</div>
            </div>
          </div>
          <div className="task">Bring in when sales deck or ad creative needs visual rebuild.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-hold">💤 On standby</span>
            <button className="activate-btn">Activate now →</button>
          </div>
        </div>

        {/* Riley — Data */}
        <div className="ta-card hold">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#d1fae5', opacity: 0.5 }}>📊</div>
            <div>
              <div className="role-name" style={{ color: 'var(--text-2)' }}>Riley</div>
              <div className="role-title">Data Analyst</div>
            </div>
          </div>
          <div className="task">Bring in after Devon installs tracking — needs data to analyze.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-hold">💤 On standby</span>
            <button className="activate-btn">Activate now →</button>
          </div>
        </div>

        {/* Quinn — Research (NEW) */}
        <div className="ta-card hold">
          <div className="icon-row">
            <div className="role-icon" style={{ background: '#fee2e2', opacity: 0.5 }}>🔬</div>
            <div>
              <div className="role-name" style={{ color: 'var(--text-2)' }}>Quinn <span className="new-badge">NEW</span></div>
              <div className="role-title">Research Analyst</div>
            </div>
          </div>
          <div className="task">Bring in when you want competitor teardowns, market sizing, or category trends.</div>
          <div className="status-row">
            <span className="ta-status-pill ta-pill-hold">💤 On standby</span>
            <button className="activate-btn">Activate now →</button>
          </div>
        </div>

        {/* Future Agent Placeholder */}
        <div className="ta-card hold" style={{ opacity: 0.7 }}>
          <div className="icon-row">
            <div className="role-icon" style={{ background: 'var(--bg-3)', color: 'var(--text-3)', fontSize: '22px' }}>＋</div>
            <div>
              <div className="role-name" style={{ color: 'var(--text-3)' }}>More agents coming</div>
              <div className="role-title">Phase 2 roadmap</div>
            </div>
          </div>
          <div className="task">Customer support, partnerships, finance analyst — see roadmap.</div>
        </div>
      </div>

      {/* NEXT STEP */}
      <div className="ta-next-step">
        <h3>📋 Generating your Truth Report</h3>
        <p>The activated 5 are doing their initial audit.</p>
        <div className="ta-progress-wrap"><span></span></div>
        <div className="countdown">About 47 seconds remaining</div>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/truth-report')}>
          View Truth Report →
        </button>
      </div>
    </div>
  );
}
