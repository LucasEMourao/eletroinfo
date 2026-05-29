type SectionBackground = "white" | "alt" | "dark";

interface SectionProps {
  children: React.ReactNode;
  background?: SectionBackground;
  className?: string;
  id?: string;
}

const backgroundClasses: Record<SectionBackground, string> = {
  white: "bg-white text-foreground",
  alt: "bg-off-white text-foreground",
  dark: "bg-primary-800 text-white",
};

export function Section({
  children,
  background = "white",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
