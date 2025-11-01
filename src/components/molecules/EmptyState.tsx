"use client";

import Card from "../atoms/Card";

export default function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Card className="text-center">
      <p className="text-base font-medium text-slate-800">{title}</p>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      )}
    </Card>
  );
}
