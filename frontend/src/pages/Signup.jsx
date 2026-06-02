import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('nexus_token', data.token);
        navigate('/command-center');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <>


      <div className="signup-wrap">
        <div className="signup-left">
          <div className="logo-row">
            <div className="mark">N</div>
            <div className="name">Nexus CMO</div>
          </div>

          <h1>Hire an AI marketing team.<br />In two minutes.</h1>
          <p className="signup-lead">
            Sign up and your CMO <em>Alex</em> will audit your business, tell you what's broken, and put 6 specialists to work fixing it.
          </p>

          <div className="sso-row">
            <a href="http://localhost:5000/api/auth/google" className="sso-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </a>
            <button className="sso-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
              LinkedIn
            </button>
          </div>

          <div className="divider">or with email</div>

          {error && <div style={{ color: 'var(--red)', fontSize: '14px', marginBottom: '10px' }}>{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Sam Altman" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Work email</label>
            <input type="email" placeholder="you@yourcompany.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(min 8 characters)</span></label>
            <input type="password" placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleRegister}
          >
            Create my account → See my Truth Report
          </button>

          <p className="legal">
            No credit card required. 14-day free trial.<br />
            By signing up you agree to our <a>Terms</a> and <a>Privacy Policy</a>.
          </p>

          <div className="switch-link">Already have an account? <a>Sign in</a></div>
        </div>

        <div className="signup-right">
          <div className="preview-card">
            <div className="ribbon">What you get in the next 5 minutes</div>
            <h3>Your Truth Report</h3>
            <p className="sub">A free audit of what's broken in your marketing, ranked by severity.</p>

            <div className="preview-list">
              <div className="item">
                <div className="icon" style={{ background: 'var(--red)' }}>!</div>
                <div className="body">
                  <div className="title">Your pitch deck is too long for your ICP</div>
                  <div className="desc">20-slide decks convert at 8%. Yours is 32 slides. Priya will trim it.</div>
                </div>
              </div>
              <div className="item">
                <div className="icon" style={{ background: 'var(--amber)' }}>!</div>
                <div className="body">
                  <div className="title">Your ads target SMBs, but you price for Enterprise</div>
                  <div className="desc">Mismatch is burning your ad budget. Jordan will fix the targeting.</div>
                </div>
              </div>
              <div className="item">
                <div className="icon" style={{ background: 'var(--cyan)' }}>i</div>
                <div className="body">
                  <div className="title">You have no SEO presence for your category</div>
                  <div className="desc">Your top 3 competitors rank for it. Maya's 6-month plan to catch up.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
