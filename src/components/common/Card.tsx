import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const hoverClass = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};