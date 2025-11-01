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
  const styles = {
    primary: "bg-brand text-white hover:bg-blue-600",
    ghost:
      "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }[variant];

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
