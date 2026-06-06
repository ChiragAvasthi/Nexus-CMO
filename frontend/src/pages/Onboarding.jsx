import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const { workspace, refreshWorkspaces, refreshProducts } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Profile
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  // Step 4 & 5
  const [productName, setProductName] = useState('Core Offer');
  const [failedEffort, setFailedEffort] = useState('');
  const [workedEffort, setWorkedEffort] = useState('');
  const [goal, setGoal] = useState('Get to $25k MRR by end of Q3');
  const [currentState, setCurrentState] = useState('');
  const [budget, setBudget] = useState('$1,000 – $5,000');

  const [isGenerating, setIsGenerating] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [integrations, setIntegrations] = useState([]);
  const [connectingTool, setConnectingTool] = useState(null);

  React.useEffect(() => {
    if (!workspace) return;
    const fetchIntegrations = async () => {
      const token = localStorage.getItem('nexus_token');
      try {
        const res = await fetch(`/api/workspace/${workspace.id}/integrations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setIntegrations(data);
        }
      } catch (err) {
        console.error('Failed to fetch integrations', err);
      }
    };
    fetchIntegrations();
  }, [workspace]);

  const handleConnectTool = async (provider) => {
    if (!workspace) return;
    setConnectingTool(provider);
    
    // Simulate OAuth flow delay
    setTimeout(async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        const res = await fetch(`/api/workspace/${workspace.id}/integrations/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ provider })
        });
        if (res.ok) {
          const data = await res.json();
          setIntegrations(prev => [...prev.filter(i => i.provider !== provider), data]);
        }
      } catch (err) {
        console.error('Failed to connect', err);
      } finally {
        setConnectingTool(null);
      }
    }, 1500); // 1.5s simulation
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0 || !workspace) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('workspaceId', workspace.id);
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const token = localStorage.getItem('nexus_token');
      const res = await fetch('/api/assets/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(prev => [...prev, ...data.assets]);
      } else {
        console.error('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
  };

  const steps = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Asset Vault' },
    { id: 3, label: 'Connect tools' },
    { id: 4, label: 'What you tried' },
    { id: 5, label: 'Your goal' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 2) setCurrentStep(currentStep - 1);
    else navigate('/pricing');
  };

  const handleGenerateReport = async () => {
    if (!workspace) return;
    setIsGenerating(true);
    
    // Dynamic fallback loopholes if AI generation fails (e.g. invalid API key)
    const fallbackLoopholes = [
      { id: 1, severity: 'critical', title: `${companyName || 'Your'} messaging is too generic.`, detail: `Your current efforts for "${productName}" aren't resonating with ${targetAudience || 'your target audience'}.`, fix: `Rewrite homepage to speak directly to ${targetAudience || 'your ICP'}.`, agentLabel: 'S', agentName: 'SMM' },
      { id: 2, severity: 'high', title: 'Goal alignment failure.', detail: `You're trying to achieve "${goal}" but your budget of ${budget} might be mismatched with the current state of ${currentState || 'your business'}.`, fix: 'Re-align budget and run targeted paid campaigns.', agentLabel: 'DA', agentName: 'Data Analyst' },
      { id: 3, severity: 'medium', title: `Stale presence in the ${industry || 'Tech'} space.`, detail: `Your recent failed effort (${failedEffort ? failedEffort.substring(0, 30) + '...' : 'cold outreach'}) shows a lack of brand trust.`, fix: 'Schedule 2 weekly authority posts and leverage your connected tools.', agentLabel: 'S', agentName: 'SMM' }
    ];

    try {
      const token = localStorage.getItem('nexus_token');
      const res = await fetch(`/api/workspace/${workspace.id}/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          companyName: companyName || 'Nexus User',
          industry: industry || 'Software',
          targetAudience: targetAudience || 'Mid-market',
          productName,
          failedEffort,
          workedEffort,
          goal,
          currentState,
          budget,
          uploadedFiles: uploadedFiles.map(f => f.title),
          integrations: integrations.map(i => i.provider)
        })
      });
      
      // Always refresh frontend context since the backend saves the data BEFORE generating the report
      await refreshWorkspaces();
      await refreshProducts();

      let data = {};
      if (res.ok) {
        data = await res.json();
      }

      const loopholesToSave = (res.ok && data.loopholes && data.loopholes.length > 0) ? data.loopholes : fallbackLoopholes;
      localStorage.setItem('truth_report_loopholes', JSON.stringify(loopholesToSave));
      navigate('/truth-report');

    } catch (err) {
      console.error('Failed to hit AI API, using fallback:', err);
      // Still attempt to refresh context on network failure just in case the request made it
      if (workspace) {
        await refreshWorkspaces();
        await refreshProducts();
      }
      localStorage.setItem('truth_report_loopholes', JSON.stringify(fallbackLoopholes));
      navigate('/truth-report');
    } finally {
      setIsGenerating(false);
    }
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

        {/* Step 1: Profile */}
        {currentStep === 1 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 1 of 5</div>
            <h2 style={{ fontSize: '22px' }}>Let's start with the basics</h2>
            <p className="intro">Tell us a bit about your business so we can tailor our strategies.</p>

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" placeholder="Nexus CMO" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Industry</label>
              <input type="text" placeholder="B2B SaaS, E-commerce, etc." value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Target Audience</label>
              <input type="text" placeholder="Mid-market marketing directors" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} />
            </div>

            <div className="nav-row" style={{ justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Asset Vault */}
        {currentStep === 2 && (
          <div className="step-content">
            <div className="step-eyebrow">Step 2 of 5</div>
            <h2>Upload anything that explains your business</h2>
            <p className="intro">Pitch decks, sales scripts, one-pagers, brand guidelines — the more we read, the smarter the audit. Don't worry about polish; we'll read messy stuff fine.</p>

            <div 
              className="upload-zone"
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: 'pointer', opacity: isUploading ? 0.5 : 1 }}
            >
              <div className="icon">⬆</div>
              <div className="title">
                {isUploading ? 'Uploading...' : <>Drag files here, or <span className="browse">browse</span></>}
              </div>
              <div className="sub">PDF &middot; PPTX &middot; DOCX &middot; PNG &middot; CSV &middot; up to 50MB each</div>
              <input 
                type="file" 
                multiple 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={(e) => handleFileUpload(e.target.files)} 
              />
            </div>

            <div className="uploaded-files">
              {uploadedFiles.map(file => {
                const ext = file.title.split('.').pop().toLowerCase();
                let metaContent = {};
                try {
                  metaContent = JSON.parse(file.content);
                } catch (e) {}

                const sizeKB = Math.round((metaContent.size || 0) / 1024);
                const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

                return (
                  <div className="file" key={file.id}>
                    <div className={`ext ext-${ext}`}>{ext.toUpperCase()}</div>
                    <div className="meta">
                      <div className="name">{file.title}</div>
                      <div className="size">{sizeStr}</div>
                    </div>
                    <div className="status">✓ Read</div>
                  </div>
                );
              })}
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
              {[
                { id: 'google_analytics', name: 'Google Analytics 4', logo: 'GA', color: '#4285F4', why: 'For the Data Analyst' },
                { id: 'search_console', name: 'Search Console', logo: 'SC', color: '#4285F4', why: 'For SEO Architect (locked on Solo)' },
                { id: 'meta_ads', name: 'Meta Ads', logo: 'f', color: '#1877F2', why: 'For the SMM Specialist' },
                { id: 'linkedin', name: 'LinkedIn', logo: 'in', color: '#0A66C2', why: 'For BDM & SMM' }
              ].map(provider => {
                const isConnected = integrations.some(i => i.provider === provider.id && i.status === 'connected');
                const isConnecting = connectingTool === provider.id;

                return (
                  <div className={`integration-card ${isConnected ? 'connected' : ''}`} key={provider.id}>
                    <div className="logo" style={{ background: provider.color }}>{provider.logo}</div>
                    <div className="info">
                      <div className="name">{provider.name}</div>
                      <div className="why">{provider.why}</div>
                    </div>
                    {isConnected ? (
                      <button className="btn btn-sm">Connected ✓</button>
                    ) : (
                      <button 
                        className="btn btn-sm" 
                        onClick={() => handleConnectTool(provider.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? 'Connecting...' : 'Connect'}
                      </button>
                    )}
                  </div>
                );
              })}
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
            <h2 style={{ fontSize: '22px' }}>What product/campaign are you marketing?</h2>
            <p className="intro">Tell us the name of the specific product or service you want to focus on, and what you've tried so far. There's no judgment.</p>

            <div className="form-group">
              <label>Product / Service Name</label>
              <input type="text" placeholder="e.g. Nexus CMO Enterprise Plan" value={productName} onChange={e => setProductName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Tell me about a marketing effort for this product that didn't work (1–3 short stories)</label>
              <textarea rows={5} placeholder="Example: We tried cold-emailing developers in early 2026..." value={failedEffort} onChange={e => setFailedEffort(e.target.value)}></textarea>
              <div className="help-text">Plain English. Doesn't need to be polished. Stories beat bullet points.</div>
            </div>

            <div className="form-group">
              <label>What's one thing that <em>has</em> worked, even a little?</label>
              <input type="text" placeholder="Example: A LinkedIn post about our biggest customer got 40 demos." value={workedEffort} onChange={e => setWorkedEffort(e.target.value)} />
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
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Where are you today on this?</label>
                <input type="text" placeholder="$12k MRR" value={currentState} onChange={e => setCurrentState(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Monthly budget for marketing</label>
                <select value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                  <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                  <option value="More than $15,000">More than $15,000</option>
                </select>
              </div>
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={handleBack} disabled={isGenerating}>← Back</button>
              <button className="btn btn-primary btn-lg" onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? 'Generating Truth Report...' : 'Run my audit → See my Truth Report'}
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
