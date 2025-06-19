import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div 
        key={index}
        className={`h-4 bg-gray-200 rounded mb-2 ${
          index === 0 ? 'w-3/4' : 
          index === lines - 1 ? 'w-5/6' : 'w-1/2'
        }`}
      />
    ))}
  </div>
);