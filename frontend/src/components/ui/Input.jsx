import React, { useRef } from 'react';
import './Input.css';

/**
 * Componente Input Reutilizável
 * 
 * @param {string} type - 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url'
 * @param {string} label - Label do input
 * @param {string} placeholder - Placeholder
 * @param {string} value - Valor do input
 * @param {function} onChange - Callback de mudança
 * @param {boolean} disabled - Desabilita o input
 * @param {boolean} readOnly - Input somente leitura
 * @param {string} error - Mensagem de erro
 * @param {string} helper - Mensagem de ajuda
 * @param {boolean} required - Campo obrigatório
 * @param {ReactNode} icon - Ícone à esquerda
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Largura total
 */
const Input = ({
  type = 'text',
  label = null,
  placeholder = '',
  value = '',
  onChange = () => {},
  disabled = false,
  readOnly = false,
  error = null,
  helper = null,
  required = false,
  icon = null,
  size = 'md',
  fullWidth = false,
  className = '',
  maxLength = null,
  ...props
}) => {
  const inputRef = useRef(null);

  const inputClasses = [
    'input-custom',
    `input-size-${size}`,
    icon && 'input-with-icon',
    error && 'input-error',
    disabled && 'input-disabled',
    fullWidth && 'input-full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'input-container',
    fullWidth && 'input-container-full-width',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && <span className="input-icon-left">{icon}</span>}
        <input
          ref={inputRef}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span className="input-character-count">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {error && <span className="input-error-message">{error}</span>}
      {!error && helper && <span className="input-helper">{helper}</span>}
    </div>
  );
};

export default Input;
