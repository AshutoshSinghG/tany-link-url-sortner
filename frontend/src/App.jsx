import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/StatsPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <Dashboard />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/code/:code"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-8">
                    <StatsPage />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

