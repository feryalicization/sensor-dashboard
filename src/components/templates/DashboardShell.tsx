"use client";

import Button from "../atoms/Button";

export default function DashboardShell({
  title,
  cta,
  children,
}: {
  title: string;
  cta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-slate-500">
            Monitor and manage sensors in real-time.
          </p>
        </div>
        {cta}
      </div>

      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}
