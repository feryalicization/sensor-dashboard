"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useCreateSensor } from "@/hooks/useSensors";

const schema = z.object({
  title: z.string().min(2, "Required"),
  unit: z.string().min(1, "Required"),
  sensorType: z.string().min(1, "Required"),
  icon: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateSensorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { mutateAsync, isPending } = useCreateSensor();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", unit: "", sensorType: "" },
  });

  if (!open) return null;

  const onSubmit = async (values: FormValues) => {
    try {
      await mutateAsync(values);
      reset();
      onClose();
    } catch (e) {
      // error handled globally by interceptor; optionally show local message
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft animate-in">
        <h3 className="text-lg font-semibold">Create Sensor</h3>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Title"
            error={errors.title?.message}
            {...register("title")}
          />
          <FormField
            label="Unit"
            error={errors.unit?.message}
            {...register("unit")}
          />
          <FormField
            label="Sensor Type"
            error={errors.sensorType?.message}
            {...register("sensorType")}
          />

          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
