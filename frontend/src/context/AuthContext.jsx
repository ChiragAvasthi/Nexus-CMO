import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeProductId, setActiveProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async (workspaceId) => {
    const token = localStorage.getItem('nexus_token');
    if (!token || !workspaceId) return;
    try {
      const res = await fetch(`/api/workspace/${workspaceId}/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        
        const savedProdId = localStorage.getItem('nexus_product_id');
        if (savedProdId && data.find(p => p.id === savedProdId)) {
          setActiveProductId(savedProdId);
        } else if (data.length > 0) {
          setActiveProductId(data[0].id);
          localStorage.setItem('nexus_product_id', data[0].id);
        } else {
          setActiveProductId(null);
        }
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

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
          setWorkspaces(data.workspaces);
          
          let currentWs = data.workspace;
          const savedWsId = localStorage.getItem('nexus_workspace_id');
          if (savedWsId) {
            const found = data.workspaces.find(w => w.id === savedWsId);
            if (found) currentWs = found;
          }
          setWorkspace(currentWs);
          if (currentWs) {
            await fetchProducts(currentWs.id);
          }
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

  const login = async (token, user, workspace, workspacesList, isNewUser = false) => {
    localStorage.setItem('nexus_token', token);
    setUser(user);
    setWorkspace(workspace);
    setWorkspaces(workspacesList || [workspace]);
    if (workspace) {
      await fetchProducts(workspace.id);
    }
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/command-center');
    }
  };

  const logout = () => {
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_workspace_id');
    localStorage.removeItem('nexus_product_id');
    setUser(null);
    setWorkspace(null);
    setWorkspaces([]);
    setProducts([]);
    setActiveProductId(null);
    navigate('/signup');
  };

  const switchWorkspace = async (workspaceId) => {
    const target = workspaces.find(w => w.id === workspaceId);
    if (target) {
      setWorkspace(target);
      localStorage.setItem('nexus_workspace_id', target.id);
      await fetchProducts(target.id);
    }
  };

  const switchProduct = (productId) => {
    const target = products.find(p => p.id === productId);
    if (target) {
      setActiveProductId(target.id);
      localStorage.setItem('nexus_product_id', target.id);
    }
  };

  const refreshWorkspaces = async () => {
    const token = localStorage.getItem('nexus_token');
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setWorkspaces(data.workspaces);
      }
    } catch (err) {}
  };

  const refreshProducts = async () => {
    if (workspace) {
      await fetchProducts(workspace.id);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, workspace, workspaces, loading, login, logout, switchWorkspace, refreshWorkspaces,
      products, activeProductId, switchProduct, refreshProducts
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
