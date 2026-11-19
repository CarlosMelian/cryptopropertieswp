"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BridgeMark } from "@/components/ui/BridgeMark";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Why Uruguay", href: "/#why-uruguay" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "Properties", href: "/properties" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-8xl items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-7 ${
          scrolled ? "glass-panel mx-4 sm:mx-8" : "mx-4 sm:mx-8"
        }`}
        style={{ height: scrolled ? "60px" : "72px" }}
      >
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <BridgeMark className="h-6 w-6 text-gold sm:h-7 sm:w-7" />
          <span className="font-display text-[0.95rem] leading-none tracking-wide sm:text-base">
            CryptoProperties
            <span className="ml-1.5 hidden text-ink-muted sm:inline">
              Uruguay
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-sm text-ink-muted transition-colors hover:text-gold-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button size="md" className="text-[0.8rem]">
            Private Consultation
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass-panel mx-4 mt-3 rounded-2xl px-6 py-6 sm:mx-8 lg:hidden"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-ink-muted transition-colors hover:text-gold-bright"
                >
                  {link.label}
                </Link>
              ))}
              <Button size="md" className="mt-2 w-full">
                Private Consultation
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
