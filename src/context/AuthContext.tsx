import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  showDisclaimer: boolean;
  setShowDisclaimer: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage (for testing only)
const MOCK_USERS = new Map([
  ['user@example.com', { 
    id: '1',
    email: 'user@example.com',
    password: 'user',
    phoneNumber: '9123456789',
    role: 'user',
    name: 'Test User'
  }],
  ['admin@example.com', { 
    id: '2',
    email: 'admin@example.com',
    password: 'admin',
    phoneNumber: '9987654321',
    role: 'admin',
    name: 'Admin User'
  }]
]);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userDetails = MOCK_USERS.get(email);

      if (!userDetails || userDetails.password !== password) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userData } = userDetails;
      setUser(userData as User);

      // Show mystery sack disclaimer for regular users
      if (userData.role === 'user') {
        setShowDisclaimer(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, phoneNumber: string) => {
    setLoading(true);
    try {
      if (MOCK_USERS.has(email)) {
        throw new Error('Email already exists');
      }

      // Remove +63 prefix if present and validate length
      const cleanPhoneNumber = phoneNumber.replace('+63', '');
      if (cleanPhoneNumber.length !== 10) {
        throw new Error('Phone number must be 10 digits');
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        phoneNumber: cleanPhoneNumber,
        role: 'user' as const,
        name: ''
      };

      MOCK_USERS.set(email, newUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      if (!MOCK_USERS.has(email)) {
        throw new Error('User not found');
      }
      console.log('Password reset requested for:', email);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true);
    try {
      if (!user) throw new Error('No user logged in');
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update mock storage
      const existingUser = MOCK_USERS.get(user.email);
      if (existingUser) {
        MOCK_USERS.set(user.email, { ...existingUser, ...data });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      resetPassword,
      updateProfile,
      showDisclaimer,
      setShowDisclaimer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};