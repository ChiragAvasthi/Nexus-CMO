import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pricing.css';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <>


      <div className="pricing-wrap">
        <div className="pricing-header">
          <div className="eyebrow">Step 1 of 2 &middot; Choose your team size</div>
          <h1>Pick what fits your business right now</h1>
          <p>You can change plans, add agents, or cancel anytime. No phone calls, no sales people.</p>

          <div className="billing-toggle">
            <button>Monthly</button>
            <button className="active">Annual <span className="save">2 months free</span></button>
          </div>
        </div>

        <div className="pricing-grid">
          {/* SOLO PLAN */}
          <div className="plan-card">
            <div className="plan-name">Solo Agent</div>
            <div className="plan-tagline">One specialist working for you, 24/7</div>
            <div className="price-row">
              <span className="price">$99</span>
              <span className="period">/ month</span>
              <span className="strike">$129</span>
            </div>

            <div className="features">
              <div className="feature"><span className="check">✓</span><span><strong>1 specialist agent</strong> of your choice</span></div>
              <div className="feature"><span className="check">✓</span><span><strong>Alex (CMO Lite)</strong> — your agent's coordinator</span></div>
              <div className="feature"><span className="check">✓</span><span>The Truth Report (free audit)</span></div>
              <div className="feature"><span className="check">✓</span><span>Asset Library &amp; Approval Queue</span></div>
              <div className="feature"><span className="check">✓</span><span>Add extra agents anytime for <strong>+$30/mo each</strong></span></div>
              <div className="feature"><span className="check x">×</span><span style={{ color: 'var(--text-3)' }}>No full Critique Loop (single-domain only)</span></div>
              <div className="feature"><span className="check x">×</span><span style={{ color: 'var(--text-3)' }}>No Cross-Pollination between agents</span></div>
            </div>

            <div className="agent-picker">
              <div className="label">Pick your agent</div>
              <div className="agent-options">
                <div className="opt selected">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}>C</div>
                  <div className="name">Casey</div>
                </div>
                <div className="opt">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>Mc</div>
                  <div className="name">Marcus</div>
                </div>
                <div className="opt">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>J</div>
                  <div className="name">Jordan</div>
                </div>
                <div className="opt">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}>M</div>
                  <div className="name">Maya</div>
                </div>
                <div className="opt">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>P</div>
                  <div className="name">Priya</div>
                </div>
                <div className="opt">
                  <div className="agent-mini" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>R</div>
                  <div className="name">Riley</div>
                </div>
              </div>
            </div>

            <button className="cta-btn ghost" onClick={() => navigate('/onboarding')}>Start free trial — Solo Agent</button>
          </div>

          {/* FULL NEXUS PLAN */}
          <div className="plan-card featured">
            <div className="plan-name">Full Nexus</div>
            <div className="plan-tagline">The complete AI marketing team</div>
            <div className="price-row">
              <span className="price">$199</span>
              <span className="period">/ month</span>
              <span className="strike">$249</span>
            </div>

            <div className="features">
              <div className="feature"><span className="check">✓</span><span><strong>All 6 specialists</strong> (Maya, Jordan, Casey, Marcus, Priya, Riley)</span></div>
              <div className="feature"><span className="check">✓</span><span><strong>Alex (full CMO)</strong> with Critique Loop</span></div>
              <div className="feature"><span className="check">✓</span><span><strong>Cross-Pollination</strong> — agents share context</span></div>
              <div className="feature"><span className="check">✓</span><span>The Truth Report (deeper, multi-domain)</span></div>
              <div className="feature"><span className="check">✓</span><span>Asset Evolution — auto-refreshes outputs</span></div>
              <div className="feature"><span className="check">✓</span><span>Weekly Stop / Start / Continue report</span></div>
              <div className="feature"><span className="check">✓</span><span>Priority support &amp; onboarding call</span></div>
            </div>

            <div className="everything-list">
              <strong>Everything in Solo, plus</strong> the five agents you didn't pick + the strategic layer that makes them work as a team. Most users upgrade within 60 days.
            </div>

            <button className="cta-btn primary" onClick={() => navigate('/onboarding')}>Start free trial — Full Nexus</button>
          </div>
        </div>

        <div className="trust-row">
          <div className="item">14-day free trial</div>
          <div className="item">No credit card needed</div>
          <div className="item">Cancel anytime</div>
          <div className="item">Pause for 1 month if you need to</div>
        </div>

        <div className="faq">
          <h3>Common questions</h3>

          <div className="faq-item">
            <div className="q">Can I switch from Solo to Full Nexus later?</div>
            <div className="a">Yes — any time, with one click. We prorate the difference. You won't lose any data or settings.</div>
          </div>

          <div className="faq-item">
            <div className="q">If I'm on Solo, can I change which agent I have?</div>
            <div className="a">Yes. You can switch your active agent once per billing cycle. Or just add a second agent for +$30/mo.</div>
          </div>

          <div className="faq-item">
            <div className="q">What if I add 3 extra agents on Solo? Doesn't that get expensive?</div>
            <div className="a">It would — so we automatically suggest the upgrade to Full Nexus ($199/mo gets you all 6 + Alex). You always save money on the upgrade.</div>
          </div>

          <div className="faq-item">
            <div className="q">Is there a refund if Nexus doesn't help my business?</div>
            <div className="a">Full refund within the first 14 days, no questions asked. After that, you can pause your plan for one month at 50% off before deciding.</div>
          </div>
        </div>
      </div>
    </>
  );
}
