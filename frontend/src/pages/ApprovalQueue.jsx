import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ApprovalQueue.css';
import io from 'socket.io-client';

export default function ApprovalQueue() {
  const { setSidebarOpen } = useOutletContext();
  const { workspace, activeProductId } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [refreshQueue, setRefreshQueue] = useState(0);
  const [loading, setLoading] = useState(true);

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
          setTasks(await res.json());
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [workspace, activeProductId, refreshQueue]);

  useEffect(() => {
    if (!workspace) return;
    
    const socket = io('http://localhost:5000');
    socket.emit('join_workspace', workspace.id);

    socket.on('tasks_updated', (payload) => {
      if (activeProductId && payload.productId && payload.productId !== activeProductId) return;
      setRefreshQueue(prev => prev + 1);
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

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'completed' || t.status === 'reviewing' || t.status === 'revising');
  const rejectedTasks = tasks.filter(t => t.status === 'rejected');
  const approvedTasks = tasks.filter(t => t.status === 'approved' || t.status === 'live');

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Approval Queue</div>
            <div className="title">Approval Queue</div>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">⚙ Auto-approve rules</button>
          <button className="btn btn-primary btn-sm" disabled={pendingTasks.length === 0}>Approve all safe items</button>
        </div>
      </div>

      <div className="content">
        <div className="page-head">
          <h1>{pendingTasks.length === 0 ? 'All caught up' : `${pendingTasks.length} things need your sign-off`}</h1>
          <p>{pendingTasks.length === 0 ? 'There are no items awaiting your approval right now.' : 'Your CMO already QC\'d everything here. These are clean — just need your final yes.'}</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className={`tab${activeTab === 0 ? ' active' : ''}`} onClick={() => setActiveTab(0)}>
            Needs your sign-off <span className="count">{pendingTasks.length}</span>
          </div>
          <div className={`tab${activeTab === 1 ? ' active' : ''}`} onClick={() => setActiveTab(1)}>
            CMO auto-rejected <span className="count">{rejectedTasks.length}</span>
          </div>
          <div className={`tab${activeTab === 2 ? ' active' : ''}`} onClick={() => setActiveTab(2)}>
            Recently approved <span className="count">{approvedTasks.length}</span>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)' }}>Loading items...</div>
        ) : (
          <>
            {/* ===== TAB 0: Needs sign-off ===== */}
            {activeTab === 0 && (
              <>
                {pendingTasks.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'var(--bg-1)', borderRadius: '12px' }}>
                    No pending items.
                  </div>
                ) : pendingTasks.map(task => (
                  <div className="approval-row" key={task.id}>
                    <div className="head">
                      <div className={`agent-avatar agent-${task.agentId}`}>A</div>
                      <div className="info" style={{ width: '100%' }}>
                        <h3>{task.title || 'Untitled Asset'}</h3>
                        <div className="meta-line">
                          <span>By {task.agentId.toUpperCase()}</span>
                          <span>·</span>
                          <span>Submitted {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-0)', borderRadius: '8px', fontSize: '14px', whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border-1)' }}>
                          {task.content}
                        </div>
                      </div>
                    </div>

                    <div className="actions" style={{ marginTop: '20px' }}>
                      <button 
                        className="btn btn-success" 
                        onClick={() => approve(task.id)}
                        disabled={task.status !== 'completed'}
                      >
                        {task.status === 'pending' ? '⏳ Generating...' 
                          : task.status === 'reviewing' ? '👀 CMO Reviewing...' 
                          : task.status === 'revising' ? '✍️ Agent Revising...' 
                          : '✓ Approve'}
                      </button>
                      <button className="btn btn-danger" style={{ marginLeft: 'auto' }}>⨯ Reject</button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ===== TAB 1: CMO auto-rejected ===== */}
            {activeTab === 1 && (
              <>
                {rejectedTasks.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'var(--bg-1)', borderRadius: '12px' }}>
                    No auto-rejected items.
                  </div>
                ) : rejectedTasks.map(task => (
                  <div className="approval-row qc-rejected" key={task.id}>
                    <div className="head">
                      <div className={`agent-avatar agent-${task.agentId}`}>A</div>
                      <div className="info" style={{ width: '100%' }}>
                        <h3 style={{ color: 'var(--text-3)', textDecoration: 'line-through' }}>{task.title || 'Untitled Asset'}</h3>
                        <div className="meta-line">
                          <span>By {task.agentId.toUpperCase()}</span>
                          <span>·</span>
                          <span style={{ color: 'var(--red)' }}>Rejected by CMO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ===== TAB 2: Recently approved ===== */}
            {activeTab === 2 && (
              <>
                {approvedTasks.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'var(--bg-1)', borderRadius: '12px' }}>
                    No approved items yet.
                  </div>
                ) : approvedTasks.map(task => (
                  <div className="approval-row approved-row" key={task.id}>
                    <div className="head">
                      <div className={`agent-avatar agent-${task.agentId}`}>A</div>
                      <div className="info" style={{ width: '100%' }}>
                        <h3>{task.title || 'Untitled Asset'}</h3>
                        <div className="meta-line">
                          <span>By {task.agentId.toUpperCase()}</span>
                          <span>·</span>
                          <span style={{ color: 'var(--green)' }}>Approved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

      </div>
    </>
  );
}
