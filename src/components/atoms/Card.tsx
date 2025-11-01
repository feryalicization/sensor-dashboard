"use client";

import { cn } from "@/lib/utils";

export default function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl bg-white p-5 shadow-soft", className)}
      {...props}
    />
  );
}
