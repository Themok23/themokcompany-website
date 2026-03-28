import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
}

/**
 * Category/status badge consistent across all pages.
 * Filled: teal bg with teal text (for categories, active states)
 * Outline: border with muted text (for location, type metadata)
 */
export function Badge({ children, variant = "filled", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide font-heading",
        variant === "filled" && "bg-primary/10 text-primary",
        variant === "outline" && "border border-border text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
