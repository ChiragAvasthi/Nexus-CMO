import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { workspace, products, activeProductId, switchProduct, refreshProducts, refreshWorkspaces } = useAuth();
  
  const [activeTab, setActiveTab] = useState('products'); // 'general' | 'products'
  const [productView, setProductView] = useState('list'); // 'list' | 'edit' | 'new'
  const [editingProductId, setEditingProductId] = useState(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // General Settings Form (Workspace)
  const [generalData, setGeneralData] = useState({
    companyName: workspace?.companyName || workspace?.name || '',
    industry: workspace?.industry || ''
  });

  // Product Form (Edit or New)
  const [productData, setProductData] = useState({
    name: '',
    targetAudience: '',
    currentProblem: '',
    goal: '',
    budget: ''
  });

  // Update generalData when workspace loads
  useEffect(() => {
    if (workspace) {
      setGeneralData({
        companyName: workspace.companyName || workspace.name || '',
        industry: workspace.industry || ''
      });
    }
  }, [workspace]);

  // Load product data when editing
  useEffect(() => {
    if (productView === 'edit' && editingProductId) {
      const p = products.find(prod => prod.id === editingProductId);
      if (p) {
        setProductData({
          name: p.name || '',
          targetAudience: p.targetAudience || '',
          currentProblem: p.currentProblem || '',
          goal: p.goal || '',
          budget: p.budget || ''
        });
      }
    } else if (productView === 'new') {
      setProductData({
        name: '',
        targetAudience: '',
        currentProblem: '',
        goal: '',
        budget: ''
      });
    }
  }, [productView, editingProductId, products]);

  const handleGeneralChange = (e) => setGeneralData({ ...generalData, [e.target.name]: e.target.value });
  const handleProductChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.value });

  const saveGeneralSettings = async (e) => {
    e.preventDefault();
    if (!workspace) return;
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('nexus_token');
      const res = await fetch(`/api/workspace/${workspace.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(generalData)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Company settings updated successfully.' });
        await refreshWorkspaces();
      } else {
        setMessage({ type: 'error', text: 'Failed to update company settings.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setSaving(false);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!workspace) return;
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('nexus_token');
      const isNew = productView === 'new';
      const url = isNew 
        ? `/api/workspace/${workspace.id}/products` 
        : `/api/workspace/${workspace.id}/products/${editingProductId}`;
      
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        const savedProduct = await res.json();
        setMessage({ type: 'success', text: isNew ? 'Product created successfully.' : 'Product updated successfully.' });
        await refreshProducts();
        
        // If creating, switch to it automatically
        if (isNew) {
          switchProduct(savedProduct.id);
        }
        
        setTimeout(() => {
          setProductView('list');
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Failed to save product.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="title">Settings</div>
      </div>

      <div className="content" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        {/* Settings Sidebar / Tabs */}
        <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => { setActiveTab('products'); setProductView('list'); setMessage(null); }}
            style={{ 
              padding: '10px 16px', 
              textAlign: 'left', 
              borderRadius: '8px',
              background: activeTab === 'products' ? 'var(--bg-2)' : 'transparent',
              border: 'none',
              color: activeTab === 'products' ? 'var(--text-1)' : 'var(--text-2)',
              fontWeight: activeTab === 'products' ? 600 : 400,
              cursor: 'pointer'
            }}
          >
            📦 Products
          </button>
          <button 
            onClick={() => { setActiveTab('general'); setMessage(null); }}
            style={{ 
              padding: '10px 16px', 
              textAlign: 'left', 
              borderRadius: '8px',
              background: activeTab === 'general' ? 'var(--bg-2)' : 'transparent',
              border: 'none',
              color: activeTab === 'general' ? 'var(--text-1)' : 'var(--text-2)',
              fontWeight: activeTab === 'general' ? 600 : 400,
              cursor: 'pointer'
            }}
          >
            🏢 Company Details
          </button>
        </div>

        {/* Main Area */}
        <div style={{ flex: 1, maxWidth: '800px' }}>
          {message && (
            <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', backgroundColor: message.type === 'success' ? 'var(--green-soft)' : 'var(--red-soft)', color: message.type === 'success' ? 'var(--green)' : 'var(--red)', fontSize: '14px', fontWeight: '600' }}>
              {message.text}
            </div>
          )}

          {/* GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="card">
              <h2 style={{ marginBottom: '8px', fontSize: '20px' }}>Company Details</h2>
              <p style={{ color: 'var(--text-3)', fontSize: '14px', marginBottom: '24px' }}>
                Manage the core identity of your business.
              </p>
              
              <form onSubmit={saveGeneralSettings}>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" name="companyName" value={generalData.companyName} onChange={handleGeneralChange} required />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input type="text" name="industry" value={generalData.industry} onChange={handleGeneralChange} required />
                </div>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Details'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PRODUCTS (LIST) */}
          {activeTab === 'products' && productView === 'list' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Your Products</h2>
                  <p style={{ color: 'var(--text-3)', fontSize: '15px', margin: 0 }}>
                    Nexus AI operates in completely isolated contexts for each product.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => { setProductView('new'); setMessage(null); }}>
                  + Add New Product
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {products.map(p => (
                  <div 
                    key={p.id} 
                    className="card" 
                    style={{ 
                      cursor: 'pointer', 
                      border: activeProductId === p.id ? '2px solid var(--magenta)' : '1px solid var(--border-1)',
                      position: 'relative'
                    }}
                    onClick={() => {
                      setEditingProductId(p.id);
                      setProductView('edit');
                    }}
                  >
                    {activeProductId === p.id && (
                      <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', fontWeight: 700, color: 'var(--magenta)', background: 'var(--magenta-soft)', padding: '4px 8px', borderRadius: '4px' }}>ACTIVE</span>
                    )}
                    <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', paddingRight: '60px' }}>{p.name}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '4px' }}><strong>Audience:</strong> {p.targetAudience || 'Not specified'}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-2)' }}><strong>Goal:</strong> {p.goal || 'Not specified'}</div>
                    <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--cyan)', fontWeight: 600 }}>Edit specifications →</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCT (NEW / EDIT) */}
          {activeTab === 'products' && (productView === 'new' || productView === 'edit') && (
            <div className="card">
              <button 
                onClick={() => { setProductView('list'); setMessage(null); }} 
                style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}
              >
                ← Back to Products
              </button>

              <h2 style={{ marginBottom: '8px', fontSize: '20px' }}>
                {productView === 'new' ? 'Create New Product' : 'Product Specifications'}
              </h2>
              <p style={{ color: 'var(--text-3)', fontSize: '14px', marginBottom: '24px' }}>
                Alex and the AI team use these details to craft strategy, copy, and targeting.
              </p>

              <form onSubmit={saveProduct}>
                <div className="form-group">
                  <label>Product / Campaign Name</label>
                  <input type="text" name="name" value={productData.name} onChange={handleProductChange} placeholder="e.g. Acme Enterprise Plan" required autoFocus={productView === 'new'} />
                </div>
                <div className="form-group">
                  <label>Target Audience (ICP)</label>
                  <input type="text" name="targetAudience" value={productData.targetAudience} onChange={handleProductChange} placeholder="e.g. VP Sales at mid-market tech companies" required />
                </div>
                <div className="form-group">
                  <label>Current Growth Problem</label>
                  <textarea name="currentProblem" value={productData.currentProblem} onChange={handleProductChange} rows="3" placeholder="e.g. We get traffic but nobody books demos." required />
                </div>
                <div className="form-group">
                  <label>90-Day Goal</label>
                  <input type="text" name="goal" value={productData.goal} onChange={handleProductChange} placeholder="e.g. Generate 50 qualified sales calls per month" required />
                </div>
                <div className="form-group">
                  <label>Monthly Marketing Budget (USD)</label>
                  <input type="text" name="budget" value={productData.budget} onChange={handleProductChange} placeholder="e.g. $5,000" />
                </div>

                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-1)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                    {saving ? 'Saving...' : (productView === 'new' ? 'Create Product' : 'Save Specifications')}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
