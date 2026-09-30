// PackWise AI — Reusable Card Component
export default function Card({
  children,
  className = '',
  hover = false,
  glow = false,
  padding = 'md',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  };

  const base = 'bg-[#151922] border border-white/5 rounded-xl';
  const hoverClass = hover
    ? 'transition-all duration-300 hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/5'
    : '';
  const glowClass = glow ? 'border-green-500/20 shadow-lg shadow-green-500/5' : '';

  return (
    <div
      className={`${base} ${hoverClass} ${glowClass} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Card sub-components
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-3 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-sm font-semibold text-white ${className}`}>{children}</h3>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-white/5 ${className}`}>
      {children}
    </div>
  );
}
