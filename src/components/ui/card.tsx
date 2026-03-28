import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: boolean;
}

/**
 * Consistent card component matching the homepage design language.
 * Base: rounded-xl, border, glass surface, backdrop-blur.
 */
export function Card({
  children,
  className,
  hover = true,
  glow = false,
  padding = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-surface/60 backdrop-blur-sm overflow-hidden",
        hover && "hover:border-primary/40 transition-all duration-300",
        glow && "hover:shadow-[0_0_30px_rgba(0,196,175,0.1)]",
        padding && "p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Card with top accent border (teal top bar like homepage three-arms cards).
 */
export function AccentCard({
  children,
  className,
  padding = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-t-2 border-t-primary border border-border/60 bg-surface/60 backdrop-blur-sm overflow-hidden",
        "hover:border-primary/60 transition-all duration-300 group",
        padding && "p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
