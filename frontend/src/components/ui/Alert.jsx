import React from 'react';
import './Alert.css';

/**
 * Componente Alert Reutilizável
 * 
 * @param {string} variant - 'success' | 'warning' | 'error' | 'info'
 * @param {boolean} dismissible - Mostra botão de fechar
 * @param {function} onClose - Callback ao fechar
 * @param {string} title - Título do alerta (opcional)
 * @param {ReactNode} icon - Ícone (opcional)
 */
const Alert = ({
  variant = 'info',
  dismissible = false,
  onClose = () => {},
  title = null,
  icon = null,
  children,
  className = '',
  ...props
}) => {
  const alertClasses = [
    'alert-custom',
    `alert-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={alertClasses} role="alert" {...props}>
      <div className="alert-content">
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-message">
          {title && <strong className="alert-title">{title}</strong>}
          {children && <p className="alert-text">{children}</p>}
        </div>
      </div>
      {dismissible && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
