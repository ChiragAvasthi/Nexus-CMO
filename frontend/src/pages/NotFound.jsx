import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', minHeight: '60vh',
      textAlign: 'center', color: 'var(--text-1)'
    }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>🗺️</div>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Page not found</h1>
      <p style={{ color: 'var(--text-2)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '32px' }}>
        We couldn't find the page you were looking for. It might have been moved, or you might be a little early for a feature we haven't built yet.
      </p>
      <Link to="/command-center" className="btn btn-primary btn-lg">
        ← Back to Command Center
      </Link>
    </div>
  );
}
