import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Определяем интерфейс для состояния аутентификации
interface AuthState {
  isAuthenticated: boolean;
  login: (
    access_token: string,
    refresh_token: string,
    username: string,
    role: string,
  ) => void;
  logout: () => void;
  role: string;
}

// Создаем контекст для состояния аутентификации
const AuthContext = createContext<AuthState | undefined>(undefined);

// Компонент-провайдер для контекста аутентификации
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                  children,
                                                                }) => {
  const navigate = useNavigate();
  // Функция для проверки аутентификации
  const checkAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  };

  // Функция для входа
  const login = (
    access_token: string,
    refresh_token: string,
    username: string,
    role: string,
  ) => {
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('username', username);
    // localStorage.setItem('role', role);
    setRole(role);
    document.cookie = `refreshToken=${refresh_token}; Secure; SameSite=Strict`;
    setIsAuthenticated(true);

    navigate('/profile');
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    navigate('/');
  };
  const [role, setRole] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuth());

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
