import PropTypes from 'prop-types';

export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GLASS: 'glass',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  GHOST: 'ghost',
};

export const ButtonSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

const Button = ({
  children,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MD,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    [ButtonVariant.PRIMARY]: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/50',
    [ButtonVariant.SECONDARY]: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary/50',
    [ButtonVariant.GLASS]: 'bg-dark-800/50 text-text-primary border border-dark-600 hover:bg-dark-700/70 focus:ring-dark-500/50',
    [ButtonVariant.DANGER]: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50',
    [ButtonVariant.SUCCESS]: 'bg-accent-emerald text-white hover:bg-accent-emerald-dark focus:ring-accent-emerald/50',
    [ButtonVariant.WARNING]: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500/50',
    [ButtonVariant.GHOST]: 'text-text-secondary hover:text-text-primary hover:bg-dark-700 focus:ring-dark-500/50',
  };

  const sizeClasses = {
    [ButtonSize.SM]: 'px-3 py-1.5 text-sm',
    [ButtonSize.MD]: 'px-4 py-2 text-sm',
    [ButtonSize.LG]: 'px-6 py-3 text-base',
    [ButtonSize.XL]: 'px-8 py-4 text-lg',
  };

  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className,
  ].join(' ');

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
  size: PropTypes.oneOf(Object.values(ButtonSize)),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

export default Button;