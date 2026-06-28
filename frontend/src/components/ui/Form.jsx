import React from 'react';
import './Form.css';

/**
 * Componente Form Container
 * Facilita a organização de formulários com layout responsivo
 */
const Form = ({
  onSubmit = () => {},
  layout = 'vertical',
  columns = 1,
  gap = 'lg',
  children,
  className = '',
  ...props
}) => {
  const formClasses = [
    'form-custom',
    `form-${layout}`,
    `form-cols-${columns}`,
    `form-gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={formClasses} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export default Form;

/**
 * Componente FormRow - Para agrupar campos em linha
 */
export const FormRow = ({ children, gap = 'lg', className = '' }) => {
  const rowClasses = ['form-row', `form-row-gap-${gap}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={rowClasses}>{children}</div>;
};

/**
 * Componente FormGroup - Para agrupar campos com label comum
 */
export const FormGroup = ({
  label = null,
  description = null,
  error = null,
  children,
  className = '',
  required = false,
  ...props
}) => {
  const groupClasses = ['form-group', error && 'form-group-error', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses} {...props}>
      {label && (
        <div className="form-group-header">
          <label className="form-group-label">
            {label}
            {required && <span className="form-required">*</span>}
          </label>
          {description && <p className="form-group-description">{description}</p>}
        </div>
      )}
      {children}
      {error && <span className="form-group-error-message">{error}</span>}
    </div>
  );
};

/**
 * Componente FormActions - Para botões de ação
 */
export const FormActions = ({ children, align = 'right', gap = 'md', className = '' }) => {
  const actionsClasses = [
    'form-actions',
    `form-actions-${align}`,
    `form-actions-gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={actionsClasses}>{children}</div>;
};

/**
 * Componente Select customizado
 */
export const Select = ({
  label = null,
  options = [],
  value = '',
  onChange = () => {},
  disabled = false,
  error = null,
  helper = null,
  required = false,
  placeholder = 'Selecione uma opção...',
  className = '',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const selectClasses = [
    'select-custom',
    `select-size-${size}`,
    error && 'select-error',
    disabled && 'select-disabled',
    fullWidth && 'select-full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'select-container',
    fullWidth && 'select-container-full-width',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        <select
          className={selectClasses}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {error && <span className="select-error-message">{error}</span>}
      {!error && helper && <span className="select-helper">{helper}</span>}
    </div>
  );
};

/**
 * Componente Textarea customizado
 */
export const Textarea = ({
  label = null,
  placeholder = '',
  value = '',
  onChange = () => {},
  rows = 4,
  disabled = false,
  error = null,
  helper = null,
  required = false,
  maxLength = null,
  className = '',
  fullWidth = false,
  size = 'md',
  ...props
}) => {
  const textareaClasses = [
    'textarea-custom',
    `textarea-size-${size}`,
    error && 'textarea-error',
    disabled && 'textarea-disabled',
    fullWidth && 'textarea-full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'textarea-container',
    fullWidth && 'textarea-container-full-width',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}

      <div className="textarea-wrapper">
        <textarea
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span className="textarea-character-count">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {error && <span className="textarea-error-message">{error}</span>}
      {!error && helper && <span className="textarea-helper">{helper}</span>}
    </div>
  );
};

/**
 * Componente Checkbox customizado
 */
export const Checkbox = ({
  label = null,
  checked = false,
  onChange = () => {},
  disabled = false,
  error = null,
  className = '',
  ...props
}) => {
  const containerClasses = ['checkbox-container', disabled && 'checkbox-disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-input"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span className="checkbox-custom"></span>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
      {error && <span className="checkbox-error">{error}</span>}
    </div>
  );
};

/**
 * Componente Radio customizado
 */
export const Radio = ({
  label = null,
  name = '',
  value = '',
  checked = false,
  onChange = () => {},
  disabled = false,
  error = null,
  className = '',
  ...props
}) => {
  const containerClasses = ['radio-container', disabled && 'radio-disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <label className="radio-label">
        <input
          type="radio"
          className="radio-input"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span className="radio-custom"></span>
        {label && <span className="radio-text">{label}</span>}
      </label>
      {error && <span className="radio-error">{error}</span>}
    </div>
  );
};
