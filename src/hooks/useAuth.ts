import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Decode JWT payload
  const decodeUser = (token: string): User => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.userId };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await axios.post('http://localhost:5003/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(decodeUser(res.data.token));
    setIsLoading(false);
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    await axios.post('http://localhost:5003/api/auth/signup', { username, email, password });
    await login(email, password); // auto login after signup
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser(decodeUser(token));
  }, []);

  return { user, login, register, logout, isLoading };
};
