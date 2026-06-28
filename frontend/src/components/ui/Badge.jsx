import React from 'react';
import './Badge.css';

/**
 * Componente Badge Reutilizável
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} rounded - Badge arredondado (pill)
 * @param {string} className - Classes CSS adicionais
 * @param {ReactNode} icon - Ícone (opcional)
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
  icon = null,
  children,
  ...props
}) => {
  const badgeClasses = [
    'badge-custom',
    `badge-${variant}`,
    `badge-size-${size}`,
    rounded && 'badge-rounded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
