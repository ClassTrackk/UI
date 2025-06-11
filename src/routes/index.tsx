import { Routes, Route} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import GradesPage from '../pages/GradesPage';
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
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
