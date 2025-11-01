"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof motion.button> & {
  variant?: "primary" | "ghost" | "danger";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  const styles =
    {
      primary:
        "bg-white text-black border border-slate-300 hover:bg-slate-100",
      ghost:
        "bg-white text-black border border-slate-300 hover:bg-slate-100",
      danger:
        "bg-white text-black border border-red-400 hover:bg-red-50",
    }[variant] || "";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-soft transition",
        styles,
        className
      )}
      {...props}
    />
  );
}
