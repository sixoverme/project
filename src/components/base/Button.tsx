import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
}) => {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none focus:ring-2';
  
  const variantStyles = {
    primary: 'bg-[var(--juniper-sage)] text-[var(--text-on-colored)] hover:bg-[var(--juniper-dark)] focus:ring-[var(--focus-ring-primary)]',
    secondary: 'bg-[var(--juniper-dark)] text-[var(--text-on-colored)] hover:bg-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]',
    outline: 'border-2 border-[var(--juniper-sage)] text-[var(--juniper-sage)] hover:bg-[var(--sage-mist)] focus:ring-[var(--focus-ring-primary)]',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
