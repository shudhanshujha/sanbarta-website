import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallNowButtonProps {
  phone?: string;
  displayNumber?: string;
  className?: string;
}

/**
 * Animated "Call Now" button — adapated from the apple-play-button (Skiper3) pattern.
 * Compact phone-icon pill that expands on click/hover to reveal the number.
 */
const CallNowButton: React.FC<CallNowButtonProps> = ({
  phone = "tel:+917044077047",
  displayNumber = "+91 70440 77047",
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.a
      href={phone}
      layout
      onClick={(e) => {
        // On mobile: toggle expand first click, call on second
        if (!expanded) {
          e.preventDefault();
          setExpanded(true);
        }
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Call us now"
      className={cn(
        "relative flex items-center overflow-hidden rounded-full cursor-pointer",
        "bg-gradient-to-r from-[#d4af37] to-[#f5cc5f]",
        "shadow-[0_4px_20px_rgba(212,175,55,0.35)]",
        "h-10",
        className
      )}
      animate={{ width: expanded ? 210 : 42 }}
      transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8 }}
      style={{ minWidth: 42 }}
    >
      {/* Phone icon — always visible */}
      <div className="flex items-center justify-center shrink-0 w-10 h-10 z-10">
        <Phone
          size={16}
          className="text-[#020617] stroke-[2.5]"
          strokeWidth={2.5}
        />
      </div>

      {/* Expanding label */}
      <AnimatePresence>
        {expanded && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18, delay: 0.06 }}
            className="text-[#020617] font-black text-[11px] tracking-widest uppercase whitespace-nowrap pr-4"
          >
            {displayNumber}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Shimmer sweep on expand */}
      {expanded && (
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        />
      )}
    </motion.a>
  );
};

export { CallNowButton };
