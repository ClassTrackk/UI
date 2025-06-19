import { useState } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  withLoading: <T>(asyncFunction: () => Promise<T>) => Promise<T>;
}

export const useLoading = (): UseLoadingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const withLoading = async <T,>(asyncFunction: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { isLoading, setIsLoading, withLoading };
};