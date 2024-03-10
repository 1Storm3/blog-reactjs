import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import { AuthProvider, useAuth } from './Auth';
import AdminPanel from './components/AdminPanel/AdminPanel';

function Main() {
  const navigate = useNavigate();
  const { isAuthenticated ,role} = useAuth();
  // const role = localStorage.getItem('role');
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      {isAuthenticated && <Route path="/profile" element={<ProfilePage />} />}
      {isAuthenticated && <Route path="/home" element={<HomePage />} />}
      {isAuthenticated && role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
