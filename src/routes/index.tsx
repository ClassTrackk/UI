import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute,RedirectAuthenticated } from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import GradesPage from '../pages/GradesPage';
import Account from '../pages/Account';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Grades"
        element={
          <ProtectedRoute>
            <GradesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticated>
            <Login />
          </RedirectAuthenticated>
        }
      />
    </Routes>
  );
}
