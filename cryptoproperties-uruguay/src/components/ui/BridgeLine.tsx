"use client";

import { motion } from "framer-motion";

interface BridgeLineProps {
  className?: string;
}

/**
 * A horizontal cable line with a traveling pulse, echoing the bridge mark.
 * Used to connect sequential nodes (e.g. the How It Works timeline) so the
 * "bridge" concept threads through the page rather than living only in the hero.
 */
export function BridgeLine({ className = "" }: BridgeLineProps) {
  return (
    <div className={`relative h-px w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-graphite-border" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <motion.div
        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold-bright shadow-gold-sm"
        initial={{ left: "0%" }}
        animate={{ left: "100%" }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
