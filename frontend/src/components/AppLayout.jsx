import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, workspace, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-0)', color: 'var(--text-2)' }}>Loading Nexus...</div>;
  }

  return (
    <>
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <div className="app">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <div className="mark">N</div>
          <span>Nexus CMO</span>
        </div>
        
        <div className="section-label" style={{ margin: 0, padding: '18px 24px 8px' }}>Workspace</div>
        <nav onClick={() => setSidebarOpen(false)}>
          <NavLink to="/command-center" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>🏠</span><span>Command Center</span>
          </NavLink>
          <NavLink to="/war-room" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>💬</span><span>Chat with Alex</span>
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>🤖</span><span>Your AI Team</span>
          </NavLink>
          <NavLink to="/assets" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>🗂</span><span>Asset Library</span>
          </NavLink>
          <NavLink to="/approvals" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>✓</span><span>Approvals</span><span className="badge">4</span>
          </NavLink>
        </nav>

        <div className="section-label" style={{ margin: 0, padding: '18px 24px 8px' }}>Account</div>
        <nav onClick={() => setSidebarOpen(false)}>
          <Link to="/settings"><span>⚙</span><span>Settings</span></Link>
          <Link to="/billing"><span>💳</span><span>Billing</span></Link>
          <a onClick={logout} style={{ cursor: 'pointer' }}><span>🚪</span><span>Sign out</span></a>
        </nav>
        <div className="plan-badge">
          <div className="plan-tag">Full Nexus</div>
          <div className="plan-name">$199/mo &middot; 8 specialists</div>
        </div>

        <div className="footer-user">
          <div className="avatar"></div>
          <div className="meta">
            <div className="name">{user?.name || 'User'}</div>
            <div className="role">{workspace?.name || 'Workspace'}</div>
          </div>
        </div>
        
      </aside>

      <main className="main">
        {/* We pass setSidebarOpen context to Outlet so child routes can render the hamburger in their topbar */}
        <Outlet context={{ setSidebarOpen }} />
      </main>
      </div>
    </>
  );
}
