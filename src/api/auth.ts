const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Get the auth token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/**
 * Set the auth token in localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

/**
 * Remove the auth token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

/**
 * Get the user data from localStorage
 */
export const getUserData = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Set the user data in localStorage
 */
export const setUserData = (userData: any): void => {
  localStorage.setItem('user_data', JSON.stringify(userData));
};

/**
 * Remove the user data from localStorage
 */
export const removeUserData = (): void => {
  localStorage.removeItem('user_data');
};

/**
 * Make an API request with authorization headers
 */
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeAuthToken();
    removeUserData();
    window.location.href = '/login';
  }

  return response.json().then((data) => {
    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }
    return data;
  });
};

/**
 * Login with email and password
 */
export const login = async (email: string, password: string): Promise<any> => {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setAuthToken(data.token);
    if (data.user) {
      setUserData(data.user);
    }
  }

  return data;
};

/**
 * Logout - revoke the token
 */
export const logout = async (): Promise<void> => {
  try {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    removeAuthToken();
    removeUserData();
  }
};

/**
 * Get current user info
 */
export const getCurrentUser = async (): Promise<any> => {
  return apiRequest('/auth/me', {
    method: 'GET',
  });
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
