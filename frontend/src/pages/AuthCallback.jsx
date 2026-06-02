import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('nexus_token', token);
      navigate('/command-center', { replace: true });
    } else {
      navigate('/signup', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-0)', color: 'var(--text-2)' }}>
      Authenticating...
    </div>
  );
}
