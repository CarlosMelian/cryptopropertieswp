import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gold?: boolean;
}

export function GlassCard({ className, gold = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-glass",
        gold ? "glass-panel-gold" : "glass-panel",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
