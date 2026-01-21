import PropTypes from 'prop-types';

export const CardVariant = {
  DEFAULT: 'default',
  GLASS: 'glass',
  OUTLINE: 'outline',
  ELEVATED: 'elevated',
};

export const CardPadding = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

const Card = ({
  children,
  variant = CardVariant.GLASS,
  padding = CardPadding.MD,
  className = '',
  header,
  footer,
  hoverable = true,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    [CardVariant.DEFAULT]: 'bg-dark-800 text-text-primary',
    [CardVariant.GLASS]: 'glass-card',
    [CardVariant.OUTLINE]: 'bg-dark-800 text-text-primary border border-dark-600',
    [CardVariant.ELEVATED]: 'bg-dark-800 text-text-primary shadow-lg',
  };

  const paddingClasses = {
    [CardPadding.NONE]: '',
    [CardPadding.SM]: 'p-3',
    [CardPadding.MD]: 'p-4',
    [CardPadding.LG]: 'p-6',
    [CardPadding.XL]: 'p-8',
  };

  const hoverClasses = hoverable ? 'hover-lift' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className,
  ].join(' ');

  return (
    <div className={classes} {...props}>
      {header && (
        <div className="border-b border-dark-600 pb-4 mb-4">
          {header}
        </div>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-dark-600 pt-4 mt-4">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.values(CardVariant)),
  padding: PropTypes.oneOf(Object.values(CardPadding)),
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  hoverable: PropTypes.bool,
};

// Card sub-components for consistency
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component className={`text-xl font-bold text-text-primary ${className}`} {...props}>
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-text-muted ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-dark-600 ${className}`} {...props}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Export pre-configured card variants
export const GlassCard = ({ children, ...props }) => (
  <Card variant={CardVariant.GLASS} {...props}>
    {children}
  </Card>
);

export const OutlineCard = ({ children, ...props }) => (
  <Card variant={CardVariant.OUTLINE} {...props}>
    {children}
  </Card>
);

export default Card;