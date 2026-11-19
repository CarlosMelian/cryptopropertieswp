import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./buttonVariants";

interface ButtonLinkProps extends ButtonVariantProps {
  href: string;
  icon?: boolean;
  children: React.ReactNode;
}

/**
 * A link styled like <Button>. External links (WhatsApp, social, other sites)
 * open in a new tab; mailto: links open the visitor's email app.
 */
export function ButtonLink({ href, variant = "primary", size = "md", icon = true, className, children }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonVariants({ variant, size, className })}
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
    </a>
  );
}
