import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'sm';
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'default', icon, className, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeClasses = {
      default: 'px-6 py-3 text-base',
      sm: 'px-3 py-1.5 text-sm',
    };

    const variantClasses = {
      primary: 'bg-accent-blue-2 text-white hover:bg-accent-blue-1 focus:ring-accent-blue-2',
      secondary: 'bg-primary-light/10 text-primary-light border-primary-light/20 hover:bg-primary-light/20 focus:ring-primary-light',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;