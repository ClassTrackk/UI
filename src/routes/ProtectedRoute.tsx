// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { RootState } from '../store';

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};