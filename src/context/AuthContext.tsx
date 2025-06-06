import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('zomato_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This would typically make an API call to authenticate
    // For this demo, we'll simulate a successful login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '1234567890',
      addresses: [
        {
          id: 'addr1',
          type: 'home',
          address: '123 Main St, Apartment 4B',
          landmark: 'Near Central Park'
        }
      ]
    };
    
    setUser(mockUser);
    localStorage.setItem('zomato_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    // This would typically make an API call to register a new user
    // For this demo, we'll simulate a successful registration
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      phone: '',
      addresses: []
    };
    
    setUser(mockUser);
    localStorage.setItem('zomato_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zomato_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};