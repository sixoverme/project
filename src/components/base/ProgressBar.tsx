import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        {label && <span className="text-sm text-gray-500">{label}</span>}
        <span className="text-sm text-gray-500">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
