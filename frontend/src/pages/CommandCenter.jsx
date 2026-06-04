import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CommandCenter.css';
import io from 'socket.io-client';

export default function CommandCenter() {
  const { setSidebarOpen } = useOutletContext();
  const [approved, setApproved] = useState([false, false, false]);

  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [refreshDashboard, setRefreshDashboard] = useState(0);
  const { user, workspace, activeProductId } = useAuth();

  useEffect(() => {
    if (!workspace) return;
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        let tasksUrl = `/api/workspace/${workspace.id}/tasks`;
        if (activeProductId) {
          tasksUrl += `?productId=${activeProductId}`;
        }
        const [statsRes, tasksRes] = await Promise.all([
          fetch(`/api/workspace/${workspace.id}/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(tasksUrl, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (tasksRes.ok) setTasks(await tasksRes.json());
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchDashboardData();
  }, [workspace, activeProductId, refreshDashboard]);

  // Connect WebSocket for task updates
  useEffect(() => {
    if (!workspace) return;
    
    const socket = io('http://localhost:5000');
    socket.emit('join_workspace', workspace.id);

    socket.on('tasks_updated', (payload) => {
      if (activeProductId && payload.productId && payload.productId !== activeProductId) return;
      setRefreshDashboard(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [workspace, activeProductId]);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Dashboard</div>
            <div className="title">{getGreeting()}, {user?.name ? user.name.split(' ')[0] : 'Founder'}</div>
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
                  <span>Awaiting next check-in</span>
                </div>
                <span className="pill pill-magenta" style={{ marginLeft: 'auto' }}>
                  <span className="dot dot-live"></span> Active
                </span>
              </div>
              <div className="msg">
                Your AI team is currently idle or working on assigned tasks. Check back later for updates or assign new tasks in the War Room.
              </div>
              <div className="actions">
                <Link to="/war-room" className="btn btn-primary btn-sm">Open War Room →</Link>
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

              {tasks.filter(t => t.status === 'pending' || t.status === 'completed' || t.status === 'reviewing' || t.status === 'revising').length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-3)' }}>No pending approvals.</div>
              ) : tasks.filter(t => t.status === 'pending' || t.status === 'completed' || t.status === 'reviewing' || t.status === 'revising').slice(0, 3).map(task => (
                <div className="approval-item" key={task.id}>
                  <div className="preview" style={{ background: 'var(--magenta-soft)', color: 'var(--magenta)' }}>📝</div>
                  <div className="info">
                    <div className="title">{task.description || task.title}</div>
                    <div className="meta">By {task.agentId.toUpperCase()} · {new Date(task.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="btns">
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={() => approve(task.id)}
                      disabled={task.status !== 'completed'}
                    >
                      {task.status === 'pending' ? '⏳ Generating...' 
                        : task.status === 'reviewing' ? '👀 CMO Reviewing...' 
                        : task.status === 'revising' ? '✍️ Agent Revising...' 
                        : 'Approve'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div>
              <div className="goal-card">
              <div className="gh">Your 90-day goal</div>
              <div className="goal-title">{workspace?.goal || 'No goal set'}</div>
              <div className="progress"><span style={{ width: '0%' }}></span></div>
              <div className="stats">
                <div className="stat"><div className="v">$0</div><div className="l">Today</div></div>
                <div className="stat"><div className="v">--</div><div className="l">Target</div></div>
                <div className="stat"><div className="v">90d</div><div className="l">Left</div></div>
              </div>
            </div>

            <div className="agents-mini">
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Your AI team</div>

              <div className="agent-row">
                <div className="agent-avatar agent-cmo">N</div>
                <div className="info">
                  <div className="name">CMO</div>
                  <div className="task">Idle</div>
                </div>
                <span className="dot dot-idle"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-seo">SEO</div>
                <div className="info">
                  <div className="name">SEO Architect</div>
                  <div className="task">Awaiting assignment</div>
                </div>
                <span className="dot dot-idle"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-smm">S</div>
                <div className="info">
                  <div className="name">SMM Specialist</div>
                  <div className="task">Awaiting assignment</div>
                </div>
                <span className="dot dot-idle"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-bdm">B</div>
                <div className="info">
                  <div className="name">Growth BDM</div>
                  <div className="task">Awaiting assignment</div>
                </div>
                <span className="dot dot-idle"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-design">D</div>
                <div className="info">
                  <div className="name">Designer</div>
                  <div className="task">Awaiting assignment</div>
                </div>
                <span className="dot dot-idle"></span>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-data">DA</div>
                <div className="info">
                  <div className="name">Data Analyst</div>
                  <div className="task">Awaiting assignment</div>
                </div>
                <span className="dot dot-idle"></span>
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
