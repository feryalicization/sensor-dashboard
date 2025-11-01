"use client";

export default function Label({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <label className="mb-1 block text-xs font-medium text-slate-600">
      {children}
    </label>
  );
}
