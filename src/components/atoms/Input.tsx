"use client";

import { cn } from "@/lib/utils";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-brand",
        className
      )}
      {...props}
    />
  );
}
