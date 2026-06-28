import React from 'react';
import './Button.css';

/**
 * Componente Button Reutilizável
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost' | 'outline'
 * @param {string} size - 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} disabled - Desabilita o botão
 * @param {boolean} fullWidth - Faz o botão ocupar toda a largura disponível
 * @param {boolean} loading - Mostra estado de carregamento
 * @param {ReactNode} icon - Ícone à esquerda do texto
 * @param {ReactNode} iconRight - Ícone à direita do texto
 * @param {string} className - Classes CSS adicionais
 * @param {function} onClick - Callback ao clicar
 * @param {ReactNode} children - Conteúdo do botão
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  loading = false,
  icon = null,
  iconRight = null,
  className = '',
  onClick = () => {},
  children,
  type = 'button',
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && !loading) {
      onClick(e);
    }
  };

  const buttonClasses = [
    'btn-custom',
    `btn-${variant}`,
    `btn-size-${size}`,
    fullWidth && 'btn-full-width',
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      <span className="btn-content">
        {icon && <span className="btn-icon-left">{icon}</span>}
        {loading && <span className="btn-spinner"></span>}
        {children}
        {iconRight && <span className="btn-icon-right">{iconRight}</span>}
      </span>
    </button>
  );
};

export default Button;
