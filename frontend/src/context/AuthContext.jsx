import { createContext, useState, useEffect, useContext } from 'react';
import { register, login, getMe } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set token in localStorage and axios headers
  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await getMe();
          setUser(data.user);
        } catch (error) {
          // Token invalid, clear it
          setAuthToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const signup = async (username, email, password) => {
    try {
      const data = await register(username, email, password);
      setAuthToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const signin = async (email, password) => {
    try {
      const data = await login(email, password);
      setAuthToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    signup,
    signin,
    signout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

