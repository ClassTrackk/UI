import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FullScreenLoader } from '../components/ui/loading/FullScreenLoader';

interface LoadingContextType {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  
  return (
    <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
      {globalLoading && <FullScreenLoader />}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading deve essere usato dentro LoadingProvider');
  }
  return context;
};