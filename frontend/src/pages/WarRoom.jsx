import React, { useState, useRef, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import './WarRoom.css';

export default function WarRoom() {
  const { setSidebarOpen } = useOutletContext();
  const { workspace, activeProductId } = useAuth();
  const [extraMessages, setExtraMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!workspace) return;

    // Fetch message history
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        let url = `/api/workspace/${workspace.id}/messages`;
        if (activeProductId) {
          url += `?productId=${activeProductId}`;
        }
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setExtraMessages(data.map(msg => ({
            type: msg.sender === 'user' ? 'user' : 'cmo',
            text: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          })));
        }
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    };
    fetchHistory();

    // Initialize Socket.io connection
    socketRef.current = io('http://localhost:5000');

    socketRef.current.emit('join_workspace', workspace.id);

    // Listen for incoming messages (from CMO or other agents)
    socketRef.current.on('new_message', (msg) => {
      if (activeProductId && msg.productId && msg.productId !== activeProductId) return; // ignore other products

      setIsTyping(false); // CMO finished typing
      setExtraMessages(prev => [...prev, {
        type: msg.sender === 'user' ? 'user' : 'cmo',
        text: msg.content,
        time: msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [workspace, activeProductId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [extraMessages, isTyping]);

  const sendMessage = () => {
    const text = inputVal.trim();
    if (!text || !workspace) return;

    // Optimistically add to UI
    const userMsg = { type: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setExtraMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Show typing indicator immediately for better UX
    setIsTyping(true);

    // Emit to backend
    socketRef.current.emit('send_message', {
      workspaceId: workspace.id,
      productId: activeProductId,
      sender: 'user',
      content: text,
      time: userMsg.time
    });
  };
  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › War Room</div>
            <div className="title">War Room — Your CMO</div>
          </div>
        </div>
        <div className="actions">
          <span className="pill pill-magenta"><span className="dot dot-live"></span> CMO is online</span>
          <button className="btn btn-ghost btn-sm">📂 Conversation history</button>
        </div>
      </div>

      <div className="content" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 61px)' }}>
        <div className="chat-area" style={{ flex: 1 }}>

          {/* Extra messages from user interaction */}
          {extraMessages.map((msg, i) => (
            msg.type === 'user' ? (
              <div className="chat-msg user" key={`extra-${i}`}>
                <div className="chat-content">
                  <div className="who-row" style={{ justifyContent: 'flex-end' }}>
                    <span className="time">{msg.time}</span>
                    <span className="name">You</span>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              </div>
            ) : (
              <div className="chat-msg cmo" key={`extra-${i}`}>
                <div className="agent-avatar agent-cmo">🎯</div>
                <div className="chat-content">
                  <div className="who-row">
                    <span className="name">Alex · CMO</span>
                    <span className="time">{msg.time}</span>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              </div>
            )
          ))}

          {isTyping && (
            <div className="chat-msg cmo">
              <div className="agent-avatar agent-cmo">🎯</div>
              <div className="chat-content">
                <div className="typing-indicator" style={{ borderRadius: '16px 16px 16px 4px', background: 'var(--magenta-soft)', border: '1px solid #ddd6fe', padding: '12px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--magenta)', margin: '0 2px' }}></span>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--magenta)', margin: '0 2px' }}></span>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--magenta)', margin: '0 2px' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* COMPOSER */}
        <div className="composer">
          <div className="row">
            <div style={{ flex: 1 }}>
              <textarea
                placeholder="Talk to your CMO — strategy, questions, what to do next. Push back on me if you disagree."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              ></textarea>
              <div className="helpers">
                <span className="helper-pill">📎 Attach file</span>
                <span className="helper-pill">📊 Show me last week's report</span>
                <span className="helper-pill">🎯 Adjust my goal</span>
                <span className="helper-pill">⚙ Tune CMO sensitivity</span>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={sendMessage}>Send →</button>
          </div>
        </div>

      </div>
    </>
  );
}
