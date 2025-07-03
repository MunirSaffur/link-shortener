import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';

interface AuthContextType {
  user: { email: string } | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/auth`; // adjust for your NestJS

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');
    if (token && email) {
      setAccessToken(token);
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    const token = response.data.access_token;
    const user_id = response.data.user_id;

    setAccessToken(token);
    setUser({ email });

    localStorage.setItem('access_token', token);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_id', user_id);
  };

  const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
    });
    // auto login after register
    await login(email, password);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
