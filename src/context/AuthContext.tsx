import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentUser } from '../types.js';
import { authService } from '../services/api.js';

interface AuthContextType {
  user: StudentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginUser: (email: string, password: string) => Promise<any>;
  registerUser: (name: string, email: string, password: string) => Promise<any>;
  logoutUser: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('csit_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Validate user session on startup
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            // Token stale/incorrect, clear
            logoutUser();
          }
        } catch (err: any) {
          console.warn('Session check failed or expired token');
          logoutUser();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      if (data.success && data.token) {
        localStorage.setItem('csit_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setLoading(false);
        return { success: true, message: data.message };
      }
      throw new Error(data.message || 'Login failed');
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Error occurred during login';
      setError(errMsg);
      setLoading(false);
      return { success: false, message: errMsg };
    }
  };

  const registerUser = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(name, email, password);
      if (data.success && data.token) {
        localStorage.setItem('csit_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setLoading(false);
        return { success: true, message: data.message };
      }
      throw new Error(data.message || 'Registration failed');
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Error occurred during registration';
      setError(errMsg);
      setLoading(false);
      return { success: false, message: errMsg };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('csit_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        loginUser,
        registerUser,
        logoutUser,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
