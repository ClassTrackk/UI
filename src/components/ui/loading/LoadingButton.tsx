import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  onClick, 
  isLoading, 
  children, 
  className = '',
  ...props 
}) => (
  <button 
    onClick={onClick}
    disabled={isLoading}
    className={`px-4 py-2 rounded flex items-center justify-center ${
      isLoading 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-blue-600 hover:bg-blue-700 text-white'
    } ${className}`}
    {...props}
  >
    {isLoading ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Caricamento...
      </>
    ) : (
      children
    )}
  </button>
);