import React, { ReactNode } from 'react';
import { LoadingComponent } from './LoadingComponent';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children 
}) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center rounded">
        <LoadingComponent />
      </div>
    )}
  </div>
);
