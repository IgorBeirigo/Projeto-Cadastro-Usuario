import React from 'react';
import './LoadingSpinner.css';

/**
 * Componente LoadingSpinner
 * 
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} color - Cor do spinner (qualquer cor CSS válida)
 * @param {string} fullPage - Se true, ocupa a página inteira
 * @param {string} message - Mensagem de carregamento
 */
const LoadingSpinner = ({
  size = 'md',
  color = 'var(--color-primary)',
  fullPage = false,
  message = null,
  className = '',
  ...props
}) => {
  const wrapperClasses = [
    'loading-spinner-wrapper',
    `spinner-size-${size}`,
    fullPage && 'spinner-full-page',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} {...props}>
      <div className="spinner-container">
        <div
          className="spinner-ring"
          style={{
            borderColor: `transparent transparent transparent ${color}`,
          }}
        ></div>
        {message && <p className="spinner-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
