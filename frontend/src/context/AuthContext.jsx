import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('nexus_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setWorkspace(data.workspace);
        } else {
          localStorage.removeItem('nexus_token');
        }
      } catch (err) {
        console.error('Failed to verify token', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (token, user, workspace) => {
    localStorage.setItem('nexus_token', token);
    setUser(user);
    setWorkspace(workspace);
    navigate('/command-center');
  };

  const logout = () => {
    localStorage.removeItem('nexus_token');
    setUser(null);
    setWorkspace(null);
    navigate('/signup');
  };

  return (
    <AuthContext.Provider value={{ user, workspace, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
