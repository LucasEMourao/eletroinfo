interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-lg hover:border-accent-400 ${className}`}
    >
      {children}
    </div>
  );
}
