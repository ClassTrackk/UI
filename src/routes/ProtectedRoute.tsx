import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const hasQuickLogin = user && user.id && !isAuthenticated;
  
  return (isAuthenticated || hasQuickLogin) ? <>{children}</> : <Navigate to="/login" />;
};

export const RedirectAuthenticated = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const hasQuickLogin = user && user.id && !isAuthenticated;
  
  return (isAuthenticated || hasQuickLogin) ? <Navigate to="/" replace /> : <>{children}</>;
};