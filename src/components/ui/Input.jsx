import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

export const InputVariant = {
  DEFAULT: 'default',
  FILLED: 'filled',
  OUTLINED: 'outlined',
  GLASS: 'glass',
};

export const InputSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

const Input = forwardRef(({
  type = 'text',
  variant = InputVariant.DEFAULT,
  size = InputSize.MD,
  icon: Icon,
  iconPosition = 'left',
  label,
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseContainerClasses = 'relative';
  
  const variantClasses = {
    [InputVariant.DEFAULT]: 'bg-dark-800 border-dark-600 focus:border-primary focus:ring-primary/20',
    [InputVariant.FILLED]: 'bg-dark-700 border-dark-600 focus:border-primary focus:ring-primary/20',
    [InputVariant.OUTLINED]: 'bg-transparent border-dark-600 focus:border-primary focus:ring-primary/20',
    [InputVariant.GLASS]: 'bg-dark-800/50 border-dark-600 focus:border-primary focus:ring-primary/20 backdrop-blur-sm',
  };

  const sizeClasses = {
    [InputSize.SM]: 'px-3 py-1.5 text-sm',
    [InputSize.MD]: 'px-4 py-2 text-sm',
    [InputSize.LG]: 'px-5 py-3 text-base',
  };

  const iconSizeClasses = {
    [InputSize.SM]: 'w-4 h-4',
    [InputSize.MD]: 'w-4 h-4',
    [InputSize.LG]: 'w-5 h-5',
  };

  const iconPadding = {
    left: {
      [InputSize.SM]: 'pl-9 pr-3',
      [InputSize.MD]: 'pl-10 pr-4',
      [InputSize.LG]: 'pl-11 pr-5',
    },
    right: {
      [InputSize.SM]: 'pl-3 pr-9',
      [InputSize.MD]: 'pl-4 pr-10',
      [InputSize.LG]: 'pl-5 pr-11',
    },
  };

  const hasError = Boolean(error);
  const hasIcon = Boolean(Icon);

  const inputClasses = [
    'w-full rounded-lg border transition-all duration-200 placeholder-text-muted',
    variantClasses[variant],
    sizeClasses[size],
    hasIcon ? iconPadding[iconPosition][size] : 'px-4 py-2',
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ].join(' ');

  const iconClasses = [
    'absolute top-1/2 -translate-y-1/2 text-text-muted',
    iconSizeClasses[size],
    iconPosition === 'left' ? 'left-3' : 'right-3',
    isFocused && !hasError ? 'text-primary' : '',
    hasError ? 'text-red-500' : '',
  ].join(' ');

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className={`${containerClassName} ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      
      <div className={baseContainerClasses}>
        {hasIcon && (
          <Icon className={iconClasses} />
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      
      {helperText && !hasError && (
        <p className="mt-1 text-xs text-text-muted">
          {helperText}
        </p>
      )}
      
      {hasError && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(InputVariant)),
  size: PropTypes.oneOf(Object.values(InputSize)),
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

// Pre-configured input variants
export const GlassInput = (props) => <Input variant={InputVariant.GLASS} {...props} />;
export const FilledInput = (props) => <Input variant={InputVariant.FILLED} {...props} />;
export const OutlinedInput = (props) => <Input variant={InputVariant.OUTLINED} {...props} />;

// Textarea component with similar props
export const Textarea = forwardRef(({
  label,
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const hasError = Boolean(error);

  const textareaClasses = [
    'w-full rounded-lg border border-dark-600 bg-dark-800 transition-all duration-200',
    'px-4 py-2 text-text-primary placeholder-text-muted',
    'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none',
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ].join(' ');

  return (
    <div className={`${containerClassName} ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        disabled={disabled}
        {...props}
      />
      
      {helperText && !hasError && (
        <p className="mt-1 text-xs text-text-muted">
          {helperText}
        </p>
      )}
      
      {hasError && (
        <p className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Input;