import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 since step 1 (Profile) is assumed done after signup

  const steps = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Asset Vault' },
    { id: 3, label: 'Connect tools' },
    { id: 4, label: 'What you tried' },
    { id: 5, label: 'Your goal' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
    else navigate('/truth-report'); // Or to truth-report
  };

  const handleBack = () => {
    if (currentStep > 2) setCurrentStep(currentStep - 1);
    else navigate('/pricing');
  };

  return (
    <>


      <div className="onboarding-wrap">
        {/* Stepper */}
        <div className="stepper">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`step ${step.id < currentStep ? 'done' : step.id === currentStep ? 'active' : ''}`}>
                <span className="num">{step.id < currentStep ? '✓' : step.id}</span>
                <span className="label">{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className="connector"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Step 2: Asset Vault */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 2 of 5</div>
            <h2>Upload anything that explains your business</h2>
            <p className="intro">Pitch decks, sales scripts, one-pagers, brand guidelines — the more we read, the smarter the audit. Don't worry about polish; we'll read messy stuff fine.</p>

            <div className="upload-zone annotation" data-note="DRAG-DROP">
              <div className="icon">⬆</div>
              <div className="title">Drag files here, or <span className="browse">browse</span></div>
              <div className="sub">PDF &middot; PPTX &middot; DOCX &middot; PNG &middot; CSV &middot; up to 50MB each</div>
            </div>

            <div className="uploaded-files">
              <div className="file">
                <div className="ext ext-pdf">PDF</div>
                <div className="meta">
                  <div className="name">SalesDeck_Q2.pdf</div>
                  <div className="size">2.4 MB &middot; 28 slides</div>
                </div>
                <div className="status">✓ Read</div>
              </div>
              <div className="file">
                <div className="ext ext-ppt">PPT</div>
                <div className="meta">
                  <div className="name">One-Pager-2026.pptx</div>
                  <div className="size">5.1 MB &middot; 4 slides</div>
                </div>
                <div className="status">✓ Read</div>
              </div>
              <div className="file">
                <div className="ext ext-csv">CSV</div>
                <div className="meta">
                  <div className="name">past_leads_export.csv</div>
                  <div className="size">142 KB &middot; 1,247 rows</div>
                </div>
                <div className="status">✓ Read</div>
              </div>
            </div>

            <div className="friendly-tip">
              <div className="avatar-mini">N</div>
              <div>
                <strong>Tip from your CMO:</strong> Upload your worst-performing piece too. Knowing what flopped helps me see what to avoid. I won't judge.
              </div>
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="skip" onClick={handleNext}>Skip this step</span>
                <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Integrations */}
        {currentStep === 3 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 3 of 5</div>
            <h2 style={{ fontSize: '22px' }}>Connect the tools you already use</h2>
            <p className="intro">Connect what you can. Skip what you don't have — we work fine without all of them.</p>

            <div className="integration-grid">
              <div className="integration-card connected">
                <div className="logo" style={{ background: '#4285F4' }}>GA</div>
                <div className="info">
                  <div className="name">Google Analytics 4</div>
                  <div className="why">For the Data Analyst</div>
                </div>
                <button className="btn btn-sm">Connected ✓</button>
              </div>
              <div className="integration-card">
                <div className="logo" style={{ background: '#4285F4' }}>SC</div>
                <div className="info">
                  <div className="name">Search Console</div>
                  <div className="why">For SEO Architect (locked on Solo)</div>
                </div>
                <button className="btn btn-sm">Connect</button>
              </div>
              <div className="integration-card">
                <div className="logo" style={{ background: '#1877F2' }}>f</div>
                <div className="info">
                  <div className="name">Meta Ads</div>
                  <div className="why">For the SMM Specialist</div>
                </div>
                <button className="btn btn-sm">Connect</button>
              </div>
              <div className="integration-card">
                <div className="logo" style={{ background: '#0A66C2' }}>in</div>
                <div className="info">
                  <div className="name">LinkedIn</div>
                  <div className="why">For BDM &amp; SMM</div>
                </div>
                <button className="btn btn-sm">Connect</button>
              </div>
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="skip" onClick={handleNext}>Skip this step</span>
                <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: What you tried */}
        {currentStep === 4 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 4 of 5</div>
            <h2 style={{ fontSize: '22px' }}>What have you already tried? Be honest.</h2>
            <p className="intro">Knowing what didn't work prevents us repeating it. There's no judgment — every founder has a list like this.</p>

            <div className="form-group">
              <label>Tell me about a marketing effort that didn't work (1–3 short stories)</label>
              <textarea rows={5} placeholder="Example: We tried cold-emailing developers in early 2026. Sent 800 emails, got 2 replies, 0 demos. The list came from Apollo. We wrote the copy ourselves."></textarea>
              <div className="help-text">Plain English. Doesn't need to be polished. Stories beat bullet points.</div>
            </div>

            <div className="form-group">
              <label>What's one thing that <em>has</em> worked, even a little?</label>
              <input type="text" placeholder="Example: A LinkedIn post about our biggest customer got 40 demos." />
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Goal */}
        {currentStep === 5 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 5 of 5</div>
            <h2 style={{ fontSize: '22px' }}>What's the one big thing you need to happen in 90 days?</h2>
            <p className="intro">Pick a goal we can measure. Pick one — not three. Specific beats ambitious.</p>

            <div className="form-group">
              <label>Your 90-day goal</label>
              <input type="text" defaultValue="Get to $25k MRR by end of Q3" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Where are you today on this?</label>
                <input type="text" placeholder="$12k MRR" />
              </div>
              <div className="form-group">
                <label>Monthly budget for marketing</label>
                <select defaultValue="$1,000 – $5,000">
                  <option>Under $1,000</option>
                  <option>$1,000 – $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>More than $15,000</option>
                </select>
              </div>
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
              <button className="btn btn-primary btn-lg" onClick={handleNext}>
                Run my audit → See my Truth Report
              </button>
            </div>
          </div>
        )}

        {/* Render upcoming steps as collapsed cards */}
        {steps.map(step => {
          if (step.id <= currentStep || step.id === 1) return null;
          
          let stepTitle = "";
          if (step.id === 3) stepTitle = "Connect your tools (Google Analytics, Meta Ads, LinkedIn…)";
          if (step.id === 4) stepTitle = "What have you already tried? (stops us repeating your past mistakes)";
          if (step.id === 5) stepTitle = "Your one big goal for the next 90 days";

          return (
            <div className="other-step" key={step.id} onClick={() => setCurrentStep(step.id)}>
              <div className="head">
                <span><strong style={{ color: 'var(--text-1)' }}>Step {step.id}:</strong> {stepTitle}</span>
                <span>→</span>
              </div>
            </div>
          );
        })}

        {/* Render completed steps as collapsed cards (if we are past them, to allow returning) */}
        {currentStep > 2 && currentStep <= 5 && steps.map(step => {
           if (step.id >= currentStep || step.id === 1) return null;
           let stepTitle = "";
           if (step.id === 2) stepTitle = "Upload anything that explains your business";
           if (step.id === 3) stepTitle = "Connect the tools you already use";
           if (step.id === 4) stepTitle = "What have you already tried? Be honest.";
           return (
             <div className="other-step done" key={'done'+step.id} onClick={() => setCurrentStep(step.id)}>
               <div className="head">
                 <span><span className="check" style={{ marginRight: '8px' }}>✓</span> <strong style={{ color: 'var(--text-1)' }}>Step {step.id}:</strong> {stepTitle}</span>
                 <span>Edit</span>
               </div>
             </div>
           );
        })}

      </div>
    </>
  );
}
