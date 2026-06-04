import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TruthReport.css';

export default function TruthReport() {
  const navigate = useNavigate();
  const [loopholes, setLoopholes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('truth_report_loopholes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLoopholes(parsed);
        setStatuses(parsed.map(() => 'pending'));
      } catch (err) {
        console.error('Failed to parse loopholes', err);
      }
    }
  }, []);

  const setStatus = (index, status) => {
    setStatuses(prev => prev.map((s, i) => i === index ? status : s));
  };

  const approveAll = () => {
    setStatuses(prev => prev.map(s => s === 'pending' ? 'approved' : s));
  };

  const approvedCount = statuses.filter(s => s === 'approved').length;
  const pendingCount = statuses.filter(s => s === 'pending').length;
  const canStart = approvedCount >= 1;

  return (
    <>
      <div className="truth-wrap">
        <div className="report-head">
          <span className="badge-tr">📋 Your Truth Report</span>
          <h1>Here's what's broken — and how I'll fix it.</h1>
          <p className="lead">
            I found <strong>{loopholes.length} things</strong> getting in the way of your goal. Approve the fixes you want me to start on.
            Red first.
          </p>

          <div className="severity-row">
            <span className="sev-pill sev-critical-pill"><span className="n">{loopholes.filter(l => l.severity === 'critical').length}</span> Critical</span>
            <span className="sev-pill sev-high-pill"><span className="n">{loopholes.filter(l => l.severity === 'high').length}</span> High</span>
            <span className="sev-pill sev-medium-pill"><span className="n">{loopholes.filter(l => l.severity === 'medium').length}</span> Medium</span>
          </div>
        </div>

        <div className="section-h">Ranked by what hurts you most</div>

        {loopholes.map((lp, i) => {
          const status = statuses[i];
          const isApproved = status === 'approved';
          const isSkipped = status === 'skipped';

          return (
            <div
              key={lp.id}
              className={`loophole ${lp.severity}${isApproved ? ' loophole-approved' : ''}${isSkipped ? ' loophole-skipped' : ''}`}
            >
              <div className="row1">
                <div className="num">
                  {isApproved ? '✓' : String(lp.id).padStart(2, '0')}
                </div>
                <div className="body">
                  <h3>{lp.title}</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>{lp.detail}</p>

                  {lp.fix && (
                    <div className="fix-line">
                      <div className="check">✓</div>
                      <div>
                        {lp.fix}
                        {lp.agent && (
                          <span className="agent-badge">
                            <span className={`agent-avatar agent-${lp.agent}`}>{lp.agentLabel}</span>
                            {' '}{lp.agentName}{lp.timeline ? ` · ${lp.timeline}` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {!isApproved && !isSkipped && (
                    <div className="actions">
                      <button className="btn btn-primary btn-sm" onClick={() => setStatus(i, 'approved')}>
                        ✓ Approve
                      </button>
                      <button className="btn btn-ghost btn-sm">Tell me more</button>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ marginLeft: 'auto', color: 'var(--text-3)' }}
                        onClick={() => setStatus(i, 'skipped')}
                      >
                        Skip
                      </button>
                    </div>
                  )}

                  {isApproved && (
                    <div className="loophole-status-msg approved-msg">
                      ✓ Approved — work will begin immediately
                    </div>
                  )}

                  {isSkipped && (
                    <div className="loophole-status-msg skipped-msg">
                      Skipped — <button className="undo-btn" onClick={() => setStatus(i, 'pending')}>undo</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Sticky bar */}
        <div className="approve-bar">
          <div className="count">
            <strong>{approvedCount} approved</strong> &middot; {pendingCount} pending
          </div>
          <div className="right">
            {pendingCount > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={approveAll}>Approve all</button>
            )}
            <button
              className={`btn btn-primary${!canStart ? ' btn-disabled' : ''}`}
              onClick={() => canStart && navigate('/command-center')}
              style={!canStart ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Start work →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
