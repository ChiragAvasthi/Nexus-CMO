import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CommandCenter.css';

export default function CommandCenter() {
  const { setSidebarOpen } = useOutletContext();
  const [approved, setApproved] = useState([false, false, false]);

  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { workspace } = useAuth();

  useEffect(() => {
    if (!workspace) return;
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        const [statsRes, tasksRes] = await Promise.all([
          fetch(`/api/workspace/${workspace.id}/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`/api/workspace/${workspace.id}/tasks`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (tasksRes.ok) setTasks(await tasksRes.json());
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchDashboardData();
  }, [workspace]);

  const approve = async (taskId) => {
    try {
      const token = localStorage.getItem('nexus_token');
      const res = await fetch(`/api/tasks/${taskId}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'approved' } : t));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Command Center</div>
            <div className="title">Good morning, Sam</div>
          </div>
        </div>
        <div className="actions">
          <Link to="/war-room" className="btn btn-primary btn-sm">+ Talk to CMO</Link>
        </div>
      </div>

      <div className="content">
        <div className="kpi-row">
          <div className="kpi">
            <div className="label">MRR</div>
            <div className="value">{stats ? stats.mrr : '...'}</div>
            <div className="delta up">{stats ? stats.mrrDelta : ''}</div>
          </div>
          <div className="kpi">
            <div className="label">Qualified leads / wk</div>
            <div className="value">{stats ? stats.leads : '...'}</div>
            <div className="delta up">{stats ? stats.leadsDelta : ''}</div>
          </div>
          <div className="kpi">
            <div className="label">Goal progress</div>
            <div className="value">{stats ? stats.goalProgress : '...'}</div>
            <div className="delta flat">{stats ? stats.goalStatus : ''}</div>
          </div>
          <div className="kpi">
            <div className="label">Cost / lead</div>
            <div className="value">{stats ? stats.cpa : '...'}</div>
            <div className="delta down">{stats ? stats.cpaDelta : ''}</div>
          </div>
        </div>

        <div className="layout-2col">
          <div>
            <div className="cmo-focus">
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
                  <div style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '2px' }}>{tasks.filter(t => t.status === 'pending').length} items</div>
                </div>
                <Link to="/approvals" className="btn btn-ghost btn-sm">See all →</Link>
              </div>

              {tasks.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-3)' }}>No pending approvals.</div>
              ) : tasks.map(task => (
                <div className="approval-item" key={task.id}>
                  <div className="preview" style={{ background: 'var(--magenta-soft)', color: 'var(--magenta)' }}>📝</div>
                  <div className="info">
                    <div className="title">{task.description}</div>
                    <div className="meta">By {task.agentId.toUpperCase()} · {new Date(task.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="btns">
                    {task.status === 'approved'
                      ? <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '12px' }}>✓ Approved</span>
                      : <button className="btn btn-success btn-sm" onClick={() => approve(task.id)}>Approve</button>}
                  </div>
                </div>
              ))}
            </div>

            <div className="timeline-card">
              <div className="head">
                <div style={{ fontSize: '15px', fontWeight: 700 }}>This week</div>
                <Link to="/war-room" className="btn btn-ghost btn-sm">Full log →</Link>
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

            <div className="agents-mini">
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


      </div>
    </>
  );
}
