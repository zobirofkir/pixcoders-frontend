import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';

const ButtonComponent = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  iconSize = 20,
  fullWidth = false,
  external = false,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed';
  
  // Variants
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/20',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700',
    outline: 'bg-transparent text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Sizes
  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-2.5',
    lg: 'text-lg px-8 py-3',
    xl: 'text-xl px-10 py-4',
  };

  // Icon sizes
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };

  // Calculate icon size
  const iconSizeToUse = iconSizes[size] || iconSize;

  // Render icon
  const renderIcon = () => {
    if (!Icon) return null;
    const IconComponent = Icon;
    return (
      <span className={`inline-flex items-center ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`}>
        <IconComponent size={iconSizeToUse} />
      </span>
    );
  };

  // External link icon
  const externalIcon = external && (
    <span className="ml-2">
      <FiExternalLink size={iconSizeToUse * 0.8} />
    </span>
  );

  // Motion props
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...motionProps}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
      {external && externalIcon}
    </motion.button>
  );
});

ButtonComponent.displayName = 'Button';

export { ButtonComponent };
