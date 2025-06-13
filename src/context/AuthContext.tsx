import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

type User = {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // inizialmente false, nessun profilo da caricare

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data); // il backend restituisce già id, nome, cognome, email, ruolo
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // nessun endpoint logout al momento
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
