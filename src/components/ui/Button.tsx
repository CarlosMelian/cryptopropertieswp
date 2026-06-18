"use client";

import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", icon = true, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-medium transition-all duration-300 focus-visible:outline-none disabled:opacity-50",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-[0.95rem]",
          variant === "primary" &&
            "bg-gradient-to-b from-gold-bright to-gold text-void shadow-gold-sm hover:shadow-gold hover:-translate-y-0.5",
          variant === "secondary" &&
            "glass-panel text-ink hover:border-gold/40 hover:-translate-y-0.5",
          variant === "ghost" &&
            "text-ink-muted hover:text-gold",
          className
        )}
        {...props}
      >
        {children}
        {icon && (
          <ArrowUpRight
            className={cn(
              "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              variant === "primary" ? "text-void" : "text-gold"
            )}
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
