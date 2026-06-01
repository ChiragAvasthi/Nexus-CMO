import React from 'react';
import { Link } from 'react-router-dom';
import './WarRoom.css';

export default function WarRoom() {
  return (
    <>
      <div className="topbar">
        <div>
          <div className="crumb">Workspace › War Room</div>
          <div className="title">War Room — Your CMO</div>
        </div>
        <div className="actions">
          <span className="pill pill-magenta"><span className="dot dot-live"></span> CMO is online</span>
          <button className="btn btn-ghost btn-sm">📂 Conversation history</button>
        </div>
      </div>

      <div className="content" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 61px)' }}>
        <div className="chat-area" style={{ flex: 1 }}>
          <div className="date-divider">Today · 9:14 am</div>

          {/* CMO greeting */}
          <div className="chat-msg cmo">
            <div className="agent-avatar agent-cmo">🎯</div>
            <div className="chat-content">
              <div className="who-row">
                <span className="name">Alex · CMO</span>
                <span className="time">9:14 am</span>
                <span className="pill pill-magenta">Strategic layer</span>
              </div>
              <div className="chat-bubble">
                Morning, Sam. Quick update: Jordan's new RevOps ad set is live (CTR 2.4× the old one). Casey's prospect list is at 142/200.
              </div>
            </div>
          </div>

          {/* CMO ASKS TO ADD AN AGENT MID-WORK */}
          <div className="chat-msg cmo annotation" data-note="MID-WORK AGENT ACTIVATION REQUEST">
            <div className="agent-avatar agent-cmo">🎯</div>
            <div className="chat-content">
              <div className="who-row">
                <span className="name">Alex · CMO</span>
                <span className="time">9:18 am</span>
                <span className="pill pill-amber">Permission needed</span>
              </div>
              <div className="chat-bubble">
                One more thing — I want to bring in <strong>Quinn (Research Analyst) 🔬</strong>. I'm seeing two competitors run a "pricing transparency" angle that's eating share. I'd like Quinn to do a teardown before Jordan ships the next round of ads.
                <div style={{ marginTop: '14px', background: 'white', border: '1px solid var(--border-1)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#fee2e2', borderRadius: '12px', display: 'grid', placeItems: 'center', fontSize: '22px' }}>🔬</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '15px' }}>Activate Quinn?</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>Research Analyst · ~12 min for the teardown</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '12px' }}>
                    Quinn is on standby — no extra cost on your Full Nexus plan. On Solo plan: +$30/mo.
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary btn-sm">✓ Yes, activate Quinn</button>
                    <button className="btn btn-ghost btn-sm">Not now</button>
                    <button className="btn btn-ghost btn-sm">Tell me more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USER message */}
          <div className="chat-msg user">
            <div className="chat-content">
              <div className="who-row" style={{ justifyContent: 'flex-end' }}>
                <span className="time">9:21 am</span>
                <span className="name">You</span>
              </div>
              <div className="chat-bubble">
                Great. Hey — can you triple the budget on Campaign A? I want to push hard while it's working.
              </div>
            </div>
          </div>

          {/* CMO CRITIQUE LOOP RESPONSE */}
          <div className="chat-msg cmo annotation" data-note="CRITIQUE LOOP UI">
            <div className="agent-avatar agent-cmo">N</div>
            <div className="chat-content">
              <div className="who-row">
                <span className="name">CMO</span>
                <span className="time">9:21 am</span>
                <span className="pill pill-amber">I disagree</span>
              </div>
              <div className="chat-bubble">
                Hold on, Sam. I have to push back here — and I'll explain why before you decide.
                <div className="critique-card">
                  <div className="critique-eyebrow">Why I'm disagreeing</div>
                  <h4>Tripling Campaign A's budget right now would burn money, not make it.</h4>
                  <div className="reason">
                    Campaign A's CTR is good <strong>because</strong> we just narrowed it to RevOps leaders — but we've only had 18 conversions through it so far.
                    At this sample size, the result is encouraging but <strong>not statistically reliable yet</strong>. I've seen this pattern before with you:
                    early signal looks great, you scale 3×, then CAC explodes when the audience saturates.
                  </div>
                  <div className="vs-block">
                    <div className="vs-cell bad">
                      <div className="vs-label">If you 3× Campaign A today</div>
                      <div className="vs-body">
                        &bull; Spend jumps from $200/day → $600/day<br />
                        &bull; Audience saturation likely in 4–6 days<br />
                        &bull; CAC est. <strong>$340</strong> (your target: $180)<br />
                        &bull; Risk of <strong>~$2,400 wasted</strong> over 2 weeks
                      </div>
                    </div>
                    <div className="vs-cell good">
                      <div className="vs-label">My recommendation: 1.5× + duplicate</div>
                      <div className="vs-body">
                        &bull; Lift Campaign A to $300/day<br />
                        &bull; Duplicate as "Campaign A-2" with adjacent ICP<br />
                        &bull; Hit your <strong>scale goal</strong> without saturation<br />
                        &bull; Est. CAC: <strong>$165</strong> · pipeline +35%
                      </div>
                    </div>
                  </div>
                  <div className="reason" style={{ fontSize: '12px', color: 'var(--text-3)' }}>
                    Evidence: 18 conversions over 6 days · MMM model predicts saturation at $480/day for this audience size · your past
                    attempt (March 2026 "Tried scaling 4×") burned $1,800 in 5 days. <Link to="#" style={{ color: 'var(--cyan)' }}>View detailed model →</Link>
                  </div>
                  <div className="actions">
                    <button className="btn btn-primary btn-sm">✓ Go with your recommendation</button>
                    <button className="btn btn-ghost btn-sm">Still 3× — I'll take the risk</button>
                    <button className="btn btn-ghost btn-sm">Talk it through more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USER agrees */}
          <div className="chat-msg user">
            <div className="chat-content">
              <div className="who-row" style={{ justifyContent: 'flex-end' }}>
                <span className="time">9:24 am</span>
                <span className="name">You</span>
              </div>
              <div className="chat-bubble">
                Ok fine, your call. Go with 1.5× and the duplicate.
              </div>
            </div>
          </div>

          {/* CMO confirms + proposal card */}
          <div className="chat-msg cmo">
            <div className="agent-avatar agent-cmo">N</div>
            <div className="chat-content">
              <div className="who-row">
                <span className="name">CMO</span>
                <span className="time">9:24 am</span>
              </div>
              <div className="chat-bubble">
                Done. Lifting Campaign A budget to $300/day effective now. The SMM Specialist is drafting Campaign A-2 — should be ready in ~30 minutes.
                Here are the 3 variants she's preparing for A-2. You'll get the final to approve before it goes live.
                <div className="proposal-block">
                  <div className="ph">📋 Proposal · Campaign A-2 — first draft</div>
                  <h4>3 ad variants for RevOps Directors at 200–500 FTE SaaS</h4>
                  <div className="preview-grid">
                    <div className="var-card">
                      <div className="var-label">Variant 1 · Outcome-led</div>
                      <div className="var-headline">"Cut your sales cycle by 21 days"</div>
                      Show how 3 customers (incl. Acme) shortened their cycle — book a 15-min walkthrough.
                    </div>
                    <div className="var-card">
                      <div className="var-label">Variant 2 · Pain-led</div>
                      <div className="var-headline">"Tired of stitching 4 sales tools?"</div>
                      Side-by-side: your current stack vs. consolidated approach. Hook: "save $40k/yr on tooling."
                    </div>
                    <div className="var-card">
                      <div className="var-label">Variant 3 · Proof-led</div>
                      <div className="var-headline">"How [Customer] hit 142% of quota"</div>
                      Case-study tease. CTA: read the full story (gated for lead capture).
                    </div>
                  </div>
                  <div className="actions">
                    <button className="btn btn-ghost btn-sm">Edit drafts</button>
                    <Link className="btn btn-primary btn-sm" to="/approvals">Will review when ready →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPOSER */}
        <div className="composer">
          <div className="row">
            <div style={{ flex: 1 }}>
              <textarea placeholder="Talk to your CMO — strategy, questions, what to do next. Push back on me if you disagree."></textarea>
              <div className="helpers">
                <span className="helper-pill">📎 Attach file</span>
                <span className="helper-pill">📊 Show me last week's report</span>
                <span className="helper-pill">🎯 Adjust my goal</span>
                <span className="helper-pill">⚙ Tune CMO sensitivity</span>
              </div>
            </div>
            <button className="btn btn-primary btn-lg">Send →</button>
          </div>
        </div>

      </div>
    </>
  );
}
