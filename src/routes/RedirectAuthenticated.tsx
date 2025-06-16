import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store'; 

interface RedirectAuthenticatedProps {
  children: ReactNode;
}

export const RedirectAuthenticated = ({ children }: RedirectAuthenticatedProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};
