import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import './AgentPerformance.css';

const agentsList = [
  { id: 'seo', name: 'Maya', role: 'SEO Architect', icon: '🔍', bg: '#cffafe' },
  { id: 'smm', name: 'Jordan', role: 'SMM Specialist', icon: '📣', bg: '#fce7f3' },
  { id: 'bdm', name: 'Casey', role: 'Lead Scout', icon: '🧭', bg: '#ccfbf1' },
  { id: 'marcus', name: 'Marcus', role: 'Outreach Specialist', icon: '✉️', bg: '#fef3c7' },
  { id: 'devon', name: 'Devon', role: 'Implementation', icon: '⚙️', bg: '#fff7ed' },
  { id: 'design', name: 'Priya', role: 'Designer', icon: '🎨', bg: '#ede9fe' },
  { id: 'data', name: 'Riley', role: 'Data Analyst', icon: '📊', bg: '#d1fae5' },
  { id: 'quinn', name: 'Quinn', role: 'Research Analyst', icon: '🔬', bg: '#fee2e2', isNew: true }
];

export default function AgentPerformance() {
  const { setSidebarOpen } = useOutletContext();
  const { workspace, activeProductId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [refreshTasks, setRefreshTasks] = useState(0);

  useEffect(() => {
    if (!workspace) return;
    
    const socket = io('http://localhost:5000');
    socket.emit('join_workspace', workspace.id);

    socket.on('tasks_updated', (payload) => {
      if (activeProductId && payload.productId && payload.productId !== activeProductId) return;
      setRefreshTasks(prev => prev + 1);
    });

    return () => socket.disconnect();
  }, [workspace, activeProductId]);

  useEffect(() => {
    if (!workspace) return;
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        let url = `/api/workspace/${workspace.id}/tasks`;
        if (activeProductId) {
          url += `?productId=${activeProductId}`;
        }
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [workspace, activeProductId, refreshTasks]);

  // Determine active vs standby agents
  const activeAgentIds = new Set(tasks.filter(t => ['pending', 'reviewing', 'revising', 'working'].includes(t.status)).map(t => t.agentId));

  const workingAgents = agentsList.filter(a => activeAgentIds.has(a.id));
  const standbyAgents = agentsList.filter(a => !activeAgentIds.has(a.id));

  const renderAgentCard = (agent, isIdle) => {
    const agentTasks = tasks.filter(t => t.agentId === agent.id && ['pending', 'reviewing', 'revising', 'working'].includes(t.status));
    const activeTask = agentTasks.length > 0 ? agentTasks[0] : null;
    
    let statusText = isIdle ? '💤 Idle' : '⚡ Active';
    let statusClass = isIdle ? 'status-idle' : 'status-working';
    let taskText = isIdle ? 'Awaiting assignment.' : `Working on: ${activeTask?.description || activeTask?.title || 'task'}`;
    
    if (!isIdle && activeTask?.status === 'reviewing') {
      statusText = '👀 Reviewing';
      taskText = `CMO is reviewing: ${activeTask?.description || activeTask?.title}`;
    } else if (!isIdle && activeTask?.status === 'revising') {
      statusText = '✍️ Revising';
      taskText = `Revising: ${activeTask?.description || activeTask?.title}`;
    }

    return (
      <div className={`a-card ${isIdle ? 'idle' : ''}`} key={agent.id}>
        <div className="head">
          <div className="role-icon" style={{ background: agent.bg }}>{agent.icon}</div>
          <div>
            <h3 style={isIdle ? { color: 'var(--text-2)' } : {}}>{agent.name} {agent.isNew && <span className="new-pill">NEW</span>}</h3>
            <div className="role">{agent.role}</div>
          </div>
          <span className={`status ${statusClass}`}>{statusText}</span>
        </div>
        <div className="task" style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' 
        }}>
          {taskText}
        </div>
        <div className="btns">
          <Link to={`/agents/${agent.id}`} className={`btn ${isIdle ? 'btn-ghost' : 'btn-primary'}`}>💬 DM {agent.name}</Link>
        </div>
      </div>
    );
  };

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
            <div className="desc">Overseeing your marketing strategy</div>
          </div>
          <Link to="/war-room" className="btn btn-primary btn-sm">💬 Chat with Alex</Link>
        </div>

        {/* WORKING */}
        {workingAgents.length > 0 && (
          <>
            <div className="sec-label working">⚡ Working right now <span className="count">{workingAgents.length}</span></div>
            <div className="grid-agents">
              {workingAgents.map(agent => renderAgentCard(agent, false))}
            </div>
          </>
        )}

        {/* IDLE */}
        <div className="sec-label idle">💤 On standby — ready when needed <span className="count">{standbyAgents.length}</span></div>
        <div className="grid-agents">
          {standbyAgents.map(agent => renderAgentCard(agent, true))}
        </div>

      </div>
    </>
  );
}
