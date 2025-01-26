import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  headerAction,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {(title || headerAction) && (
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
