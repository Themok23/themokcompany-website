import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
  maxWidth?: "6xl" | "7xl" | "4xl" | "5xl";
  id?: string;
}

/**
 * Consistent section wrapper matching homepage spacing.
 * py-32 px-4 sm:px-6 lg:px-8 with centered max-width container.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, border = false, maxWidth = "6xl", id }, ref) => {
    const maxWidthMap = {
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative py-32 px-4 sm:px-6 lg:px-8",
          border && "border-b border-border",
          className
        )}
      >
        <div className={cn(maxWidthMap[maxWidth], "mx-auto")}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
