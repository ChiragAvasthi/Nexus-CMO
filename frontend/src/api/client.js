/**
 * Centralized API client for all backend requests.
 * Automatically injects the JWT token and parses JSON.
 */

const API_BASE = '/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('nexus_token');
  
  const headers = {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Only set application/json if it's not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Token is invalid or expired
      localStorage.removeItem('nexus_token');
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'API Request Failed');
  }

  // Not all endpoints return JSON, but most do.
  try {
    return await response.json();
  } catch (e) {
    return response;
  }
};

export default apiClient;
