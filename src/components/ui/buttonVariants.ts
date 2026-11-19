import { cn } from "@/lib/utils";

export interface ButtonVariantProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

/** Shared button styling, so links can look like buttons without duplicating classes. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: ButtonVariantProps = {}) {
  return cn(
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-medium transition-all duration-300 focus-visible:outline-none disabled:opacity-50",
    size === "md" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-[0.95rem]",
    variant === "primary" &&
      "bg-gradient-to-b from-gold-bright to-gold text-void shadow-gold-sm hover:shadow-gold hover:-translate-y-0.5",
    variant === "secondary" &&
      "glass-panel text-ink hover:border-gold/40 hover:-translate-y-0.5",
    variant === "ghost" && "text-ink-muted hover:text-gold",
    className
  );
}
