import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './AssetLibrary.css';

const allAssets = [
  // LIVE
  { id: 1, title: 'Meta Ad — RevOps Leaders v3', agent: 'smm', agentLabel: 'S', agentName: 'SMM', time: '4h ago', version: 'v3', status: 'live', statusText: '● Live · $300/day', metric: 'CTR 4.2%', section: 'live',
    thumbBg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', preview: '<strong>Cut your sales cycle by 21 days.</strong><br/><br/>See how 3 mid-market SaaS teams shortened their sales cycle using consolidated revops tooling.<br/><br/>Book a 15-min walkthrough →' },
  { id: 2, title: 'Cold Email Sequence v2 — VP Sales (4 emails)', agent: 'bdm', agentLabel: 'B', agentName: 'BDM', time: '5h ago', version: 'v2', status: 'live', statusText: '● Live · 142 recipients', metric: 'Open: 38%', section: 'live',
    thumbBg: 'linear-gradient(135deg, #14532d, #16a34a)', preview: '<strong>Subject:</strong> Saw your Q1 announcement<br/><br/>Hi [First],<br/><br/>Noticed your team just expanded RevOps after the Series B — congrats. We helped [Customer] hit 142% of quota in a similar phase…' },
  { id: 3, title: 'Cold Email Sequence v2 — Email #2 / Follow-up', agent: 'bdm', agentLabel: 'B', agentName: 'BDM', time: '5h ago', version: 'v2', status: 'live', statusText: '● Live · 142 recipients', metric: 'Reply: 12%', section: 'live',
    thumbBg: 'linear-gradient(135deg, #7c2d12, #ea580c)', preview: '<strong>Subject:</strong> 21 days shorter sales cycles — worth a look?<br/><br/>Hi [First], following up on my last note. Quick proof: [Customer Logo] cut their cycle from 47 → 26 days using us. Worth 10 minutes?' },
  { id: 4, title: 'Prospect List — VP-Sales Mid-Market', agent: 'bdm', agentLabel: 'B', agentName: 'BDM', time: 'Yesterday', version: 'v1', status: 'live', statusText: '● Active', metric: '200 leads', section: 'live',
    thumbBg: 'linear-gradient(135deg, #064e3b, #10b981)', preview: '<strong>Prospect list — 200 records</strong><br/><br/>Filtered: VP Sales / RevOps Director · 100-500 FTE · SaaS / Tech · Series B+ funded', previewFontSize: '7px' },
  // DRAFT
  { id: 5, title: 'Meta Ad — Pain-led Variant 2', agent: 'smm', agentLabel: 'S', agentName: 'SMM', time: '1h ago', version: 'v1 (draft)', status: 'draft', statusText: '○ Awaiting your approval', metric: '→', section: 'draft',
    thumbBg: 'linear-gradient(135deg, #581c87, #a855f7)', preview: '<strong>Tired of stitching 4 sales tools?</strong><br/><br/>Your current stack: HubSpot + Salesloft + Gong + Apollo<br/>Your team\'s reality: stitching by hand<br/><br/>One platform. Save $40k/yr in tooling.' },
  { id: 6, title: 'Meta Ad — Proof-led Variant 3', agent: 'smm', agentLabel: 'S', agentName: 'SMM', time: '1h ago', version: 'v1 (draft)', status: 'draft', statusText: '○ Awaiting your approval', metric: '→', section: 'draft',
    thumbBg: 'linear-gradient(135deg, #831843, #ec4899)', preview: '<strong>How Customer hit 142% of quota</strong><br/><br/>Case study tease. Lead with the metric. CTA: read the full story →<br/><br/>Gated for lead capture.' },
  { id: 7, title: 'Weekly S/S/C Report — May 20–27', agent: 'data', agentLabel: 'DA', agentName: 'Data Analyst', time: '1 day ago', version: 'v1', status: 'draft', statusText: '○ Awaiting your approval', metric: '→', section: 'draft',
    thumbBg: 'linear-gradient(135deg, #1c1c28, #3a3a52)', preview: '<strong>Weekly Stop / Start / Continue</strong><br/><br/>STOP: Campaign B (high CAC, low quality)<br/>START: A/B testing the proof-led variant<br/>CONTINUE: VP-Sales targeting, doing well', previewFontSize: '7px' },
  // ARCHIVED
  { id: 8, title: 'Meta Ad — Original SMB targeting', agent: 'smm', agentLabel: 'S', agentName: 'SMM', time: '3 weeks ago', version: 'v1', status: 'archived', statusText: '⨯ Paused (low fit)', metric: '—', section: 'archived',
    thumbBg: 'linear-gradient(135deg, #404040, #525252)', preview: '<strong>Built for small teams.</strong><br/><br/>Affordable workflow tools for growing startups.<br/><br/>Try free for 14 days →', previewColor: '#666' },
  { id: 9, title: 'Cold Email Sequence — DevOps (March 2026)', agent: 'bdm', agentLabel: 'B', agentName: 'BDM', time: '2 months ago', version: 'v1', status: 'archived', statusText: '⨯ Archived (didn\'t work)', metric: '—', section: 'archived',
    thumbBg: 'linear-gradient(135deg, #404040, #525252)', preview: '<strong>Cold email to 800 developers</strong><br/><br/>Hi {first_name},<br/>I saw you work with Node.js at {company}…<br/><br/>Response rate: 0.25% · marked as failure', previewColor: '#666', previewFontSize: '7px' },
];

const filters = [
  { key: 'all', label: 'All', count: 47 },
  { key: 'bdm', label: 'BDM', count: 12, avatarClass: 'agent-bdm', avatarLabel: 'B' },
  { key: 'smm', label: 'SMM', count: 18, avatarClass: 'agent-smm', avatarLabel: 'S' },
  { key: 'seo', label: 'SEO', count: 6, avatarClass: 'agent-seo', avatarLabel: 'SEO' },
  { key: 'design', label: 'Design', count: 8, avatarClass: 'agent-design', avatarLabel: 'D' },
  { key: 'data', label: 'Data', count: 3, avatarClass: 'agent-data', avatarLabel: 'DA' },
];

function AssetCard({ asset }) {
  const isArchived = asset.section === 'archived';
  return (
    <div className="asset-card" style={isArchived ? { opacity: 0.6 } : {}}>
      <div className="thumb" style={{ background: asset.thumbBg }}>
        <div className="preview-text" style={{ fontSize: asset.previewFontSize || undefined, color: asset.previewColor || undefined }}
          dangerouslySetInnerHTML={{ __html: asset.preview }} />
      </div>
      <div className="body">
        <div className="title">{asset.title}</div>
        <div className="meta-row">
          <span className={`agent-mini ${asset.agentLabel === 'SEO' ? 'agent-seo' : `agent-${asset.agent}`}`}>{asset.agentLabel}</span>
          {' '}{asset.agentName} &middot; {asset.time} &middot; <span className="ver">{asset.version}</span>
        </div>
      </div>
      <div className={`status-strip strip-${asset.status}`}>
        <span>{asset.statusText}</span><span>{asset.metric}</span>
      </div>
    </div>
  );
}

export default function AssetLibrary() {
  const { setSidebarOpen } = useOutletContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbAssets, setDbAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('nexus_token');
        const res = await fetch('/api/assets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Hydrate the DB records with rich UI properties for the prototype
          const hydrated = data.map(dbItem => {
            const agentMap = { smm: { label: 'S', name: 'SMM', bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }, bdm: { label: 'B', name: 'BDM', bg: 'linear-gradient(135deg, #14532d, #16a34a)' } };
            const ag = agentMap[dbItem.type] || { label: 'A', name: 'Agent', bg: 'linear-gradient(135deg, #404040, #525252)' };
            
            return {
              id: dbItem.id,
              title: dbItem.title,
              agent: dbItem.type,
              agentLabel: ag.label,
              agentName: ag.name,
              time: new Date(dbItem.createdAt).toLocaleDateString(),
              version: 'v1',
              status: dbItem.status,
              statusText: dbItem.status === 'live' ? '● Live' : dbItem.status === 'draft' ? '○ Draft' : '⨯ Archived',
              metric: '—',
              section: dbItem.status,
              thumbBg: ag.bg,
              preview: '<strong>' + dbItem.title + '</strong><br/><br/>Generated by Nexus CMO AI.'
            };
          });
          setDbAssets(hydrated);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssets();
  }, []);

  const filtered = useMemo(() => {
    // Fallback to the rich mock array if DB is empty
    const source = dbAssets.length > 0 ? dbAssets : allAssets;
    return source.filter(a => {
      if (activeFilter !== 'all' && a.agent !== activeFilter) return false;
      if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeFilter, searchQuery]);

  const live = filtered.filter(a => a.section === 'live');
  const draft = filtered.filter(a => a.section === 'draft');
  const archived = filtered.filter(a => a.section === 'archived');

  return (
    <>
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <div className="crumb">Workspace › Asset Library</div>
            <div className="title">Asset Library</div>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-ghost btn-sm">↓ Export selected</button>
          <button className="btn btn-primary btn-sm">+ Upload asset</button>
        </div>
      </div>

      <div className="content">
        <div className="filter-bar">
          <input
            className="search"
            type="text"
            placeholder="🔍 Search assets…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filters.map(f => (
            <span
              key={f.key}
              className={`chip${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.avatarClass && <span className={`agent-mini ${f.avatarClass}`}>{f.avatarLabel}</span>}
              {f.label} &middot; {f.count}
            </span>
          ))}
          <span style={{ flex: 1 }}></span>
          <select style={{ width: 'auto', padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid var(--border-2)', background: 'var(--bg-1)', color: 'var(--text-1)' }}>
            <option>Latest first</option>
            <option>Oldest first</option>
            <option>Most used</option>
          </select>
        </div>

        {/* LIVE / ACTIVE */}
        {live.length > 0 && (
          <>
            <div className="section-h">
              <h3>🟢 Live &amp; in use</h3>
              <div className="meta">{live.length} assets</div>
            </div>
            <div className="asset-grid">
              {live.map(a => <AssetCard key={a.id} asset={a} />)}
            </div>
          </>
        )}

        {/* DRAFTS */}
        {draft.length > 0 && (
          <>
            <div className="section-h">
              <h3>🟡 Drafts waiting for review</h3>
              <div className="meta">{draft.length} assets &middot; need your sign-off</div>
            </div>
            <div className="asset-grid">
              {draft.map(a => <AssetCard key={a.id} asset={a} />)}
            </div>
          </>
        )}

        {/* ARCHIVED */}
        {archived.length > 0 && (
          <>
            <div className="section-h">
              <h3>📦 Archived &amp; superseded</h3>
              <div className="meta">{archived.length} older versions</div>
            </div>
            <div className="asset-grid">
              {archived.map(a => <AssetCard key={a.id} asset={a} />)}
            </div>
          </>
        )}

        {live.length === 0 && draft.length === 0 && archived.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-3)' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>No assets match your filter</div>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>Try a different agent or clear the search.</div>
          </div>
        )}
      </div>
    </>
  );
}
