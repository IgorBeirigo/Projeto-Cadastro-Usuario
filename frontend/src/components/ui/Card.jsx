import React from 'react';
import './Card.css';

/**
 * Componente Card Reutilizável
 * 
 * @param {ReactNode} children - Conteúdo do card
 * @param {ReactNode} header - Conteúdo do header (opcional)
 * @param {ReactNode} footer - Conteúdo do footer (opcional)
 * @param {string} variant - 'default' | 'elevated' | 'outlined' | 'filled'
 * @param {boolean} hoverable - Adiciona efeito hover interativo
 * @param {string} className - Classes CSS adicionais
 * @param {string} padding - Padding interno: 'none' | 'sm' | 'md' | 'lg'
 */
const Card = ({
  children,
  header = null,
  footer = null,
  variant = 'default',
  hoverable = false,
  className = '',
  padding = 'md',
  onClick = null,
  ...props
}) => {
  const cardClasses = [
    'card-custom',
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable && 'card-hoverable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
