import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionEyebrow({
  children,
  align = "left",
  className,
}: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold to-gold" />
      <span className="eyebrow">{children}</span>
      {align === "center" && (
        <span className="h-px w-8 bg-gradient-to-l from-transparent via-gold to-gold" />
      )}
    </div>
  );
}
