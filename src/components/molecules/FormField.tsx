"use client";

import Label from "../atoms/Label";
import Input from "../atoms/Input";

type Props = {
  label: string;
  placeholder?: string;
  name?: string;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  label,
  error,
  ...rest
}: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...rest} />
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
