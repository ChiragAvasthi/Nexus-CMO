import React, { useState, useRef, useEffect } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import './AgentChat.css';

const agents = {
  smm: { name: 'Jordan', role: 'SMM Specialist', icon: '📣', bg: '#fce7f3' },
  seo: { name: 'Maya', role: 'SEO Architect', icon: '🔍', bg: '#cffafe' },
  bdm: { name: 'Casey', role: 'Growth BDM', icon: '🧭', bg: '#ccfbf1' },
  design: { name: 'Priya', role: 'Designer', icon: '🎨', bg: '#ede9fe' },
  data: { name: 'Riley', role: 'Data Analyst', icon: '📊', bg: '#d1fae5' },
  cmo: { name: 'Alex', role: 'CMO', icon: '🎯', bg: '#fef08a' }
};

export default function AgentChat() {
  const { setSidebarOpen } = useOutletContext();
  const { agentId } = useParams();
  const { workspace } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);

  const agent = agents[agentId] || { name: agentId, role: 'Specialist', icon: '🤖', bg: '#e5e7eb' };

  // Fetch Chat History
  useEffect(() => {
    if (!workspace) return;
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        let url = `/api/workspace/${workspace.id}/messages?agentId=${agentId}`;
        if (activeProductId) url += `&productId=${activeProductId}`;
        
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data.map(m => ({
            type: m.sender,
            text: m.content,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          })));
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    fetchMessages();
  }, [workspace, agentId, activeProductId]);

  // Fetch Agent Tasks
  useEffect(() => {
    if (!workspace) return;
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        let url = `/api/workspace/${workspace.id}/tasks`;
        if (activeProductId) url += `?productId=${activeProductId}`;
        
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter tasks specifically for this agent
          setTasks(data.filter(t => t.agentId === agentId || t.type === agentId));
        }
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, [workspace, agentId, activeProductId]);

  // Connect WebSocket
  useEffect(() => {
    if (!workspace) return;
    
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join_workspace', workspace.id);

    socketRef.current.on('new_message', (msg) => {
      if (msg.agentId !== agentId && msg.agentId !== undefined) return; // ignore other agents
      if (activeProductId && msg.productId && msg.productId !== activeProductId) return; // ignore other products
      
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: msg.sender,
        text: msg.content,
        time: msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [workspace, agentId, activeProductId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text || !workspace) return;
    
    const userMsg = { type: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    socketRef.current.emit('send_message', {
      workspaceId: workspace.id,
      productId: activeProductId,
      agentId: agentId,
      sender: 'user',
      content: text,
      time: userMsg.time
    });
  };

  const activeTasks = tasks.filter(t => t.status === 'pending');
  const doneTasks = tasks.filter(t => t.status === 'live' || t.status === 'approved' || t.status === 'archived');

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › <Link to="/team" style={{ color: 'inherit', textDecoration: 'none' }}>Your AI Team</Link> › {agent.name}</div>
            <div className="title">Talk to {agent.name}</div>
          </div>
        </div>
      </div>

      <div className="agent-wrap">
        {/* SUMMARY CARD */}
        <div className="summary-card">
          <div className="head">
            <div className="role-icon-big">{agent.icon}</div>
            <div>
              <h1>{agent.name}</h1>
              <div className="role-line"><strong>{agent.role}</strong></div>
            </div>
          </div>
          <div className="what-i-do"><strong>Status:</strong> {activeTasks.length > 0 ? 'Working on assigned tasks.' : 'Idle — waiting for assignments from you or the CMO.'}</div>
          <div className="stats-row">
            <div className="stat" onClick={() => setActiveTab('active')}><div className="v">{activeTasks.length}</div><div className="l">Active</div></div>
            <div className="stat" onClick={() => setActiveTab('done')}><div className="v">{doneTasks.length}</div><div className="l">Done</div></div>
            <div className="stat" onClick={() => setActiveTab('briefs')}><div className="v">0</div><div className="l">Briefs</div></div>
          </div>
        </div>

        {/* TABS */}
        <div className="agent-tabs">
          <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>💬 Chat</button>
          <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>⚡ Active <span className="count">{activeTasks.length}</span></button>
          <button className={`tab ${activeTab === 'done' ? 'active' : ''}`} onClick={() => setActiveTab('done')}>✓ Done <span className="count">{doneTasks.length}</span></button>
          <button className={`tab ${activeTab === 'briefs' ? 'active' : ''}`} onClick={() => setActiveTab('briefs')}>🗂 Briefs <span className="count">0</span></button>
        </div>

        {/* TAB 1: CHAT */}
        {activeTab === 'chat' && (
          <div>
            <div className="section-h">💬 Chat with {agent.name}</div>
            <div className="section-sub">Send a message to assign a task directly.</div>

            <div className="chat-card">
              {messages.length === 0 ? (
                 <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)' }}>No messages yet. Say hello!</div>
              ) : (
                messages.map((msg, i) => (
                  msg.type === 'user' ? (
                    <div className="chat-msg user" key={`msg-${i}`}>
                      <div className="bubble">{msg.text}</div>
                    </div>
                  ) : (
                    <div className="chat-msg agent" key={`msg-${i}`}>
                      <div className="ic">{agent.icon}</div>
                      <div className="bubble" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}></div>
                    </div>
                  )
                ))
              )}
              
              {isTyping && (
                <div className="chat-msg agent">
                  <div className="ic">{agent.icon}</div>
                  <div className="bubble typing">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />

              <div className="agent-composer">
                <textarea
                  placeholder={`Ask ${agent.name}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                ></textarea>
                <div className="actions">
                  <button className="send-btn" onClick={sendChat}>Send →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE */}
        {activeTab === 'active' && (
          <div>
            <div className="section-h">⚡ Active tasks</div>
            {activeTasks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'white', borderRadius: '12px', border: '1px solid var(--border-1)' }}>
                No active tasks right now.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeTasks.map(t => (
                  <div key={t.id} style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-1)' }}>
                    <strong>{t.title || 'Task'}</strong>
                    <div style={{ color: 'var(--text-2)', fontSize: '14px', marginTop: '5px' }}>{t.content || t.description || 'Pending execution...'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DONE */}
        {activeTab === 'done' && (
          <div>
            <div className="section-h">✓ Done</div>
            {doneTasks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'white', borderRadius: '12px', border: '1px solid var(--border-1)' }}>
                No completed tasks yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {doneTasks.map(t => (
                  <div key={t.id} style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-1)' }}>
                    <strong>{t.title}</strong>
                    <div style={{ color: 'var(--text-2)', fontSize: '14px', marginTop: '5px' }} dangerouslySetInnerHTML={{ __html: t.content }}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BRIEFS */}
        {activeTab === 'briefs' && (
          <div>
            <div className="section-h">🗂 Briefs</div>
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', background: 'white', borderRadius: '12px', border: '1px solid var(--border-1)' }}>
              No briefs generated yet.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
