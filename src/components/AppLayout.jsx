import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="mark">N</div>
          <span>Nexus CMO</span>
        </div>
        
        <div className="section-label" style={{ margin: 0, padding: '18px 24px 8px' }}>Workspace</div>
        <nav>
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
        <nav>
          <Link to="#"><span>⚙</span><span>Settings</span></Link>
          <Link to="#"><span>💳</span><span>Billing</span></Link>
        </nav>

        <div className="plan-badge">
          <div className="plan-tag">Full Nexus</div>
          <div className="plan-name">$199/mo &middot; 8 specialists</div>
        </div>

        <div className="footer-user">
          <div className="avatar"></div>
          <div className="meta">
            <div className="name">Sam Patel</div>
            <div className="role">Acme Sales OS</div>
          </div>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
