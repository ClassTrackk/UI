// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { RootState } from '../store';

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};