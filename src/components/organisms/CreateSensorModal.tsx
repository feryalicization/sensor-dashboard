"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import { useCreateSensor } from "@/hooks/useSensors";

const schema = z.object({
  node: z.string().min(1, "Required"),
  title: z.string().min(2, "Required"),
  unit: z.string().min(1, "Required"),
  sensorType: z.string().min(1, "Required"),
  icon: z.string().optional(),
  lastMeasurementCreatedAt: z.string().optional(),
  lastMeasurementValue: z.string().optional(),
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
    defaultValues: {
      node: "",
      title: "",
      unit: "",
      sensorType: "",
      icon: "",
      lastMeasurementCreatedAt: "",
      lastMeasurementValue: "",
    },
  });

  if (!open) return null;

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        node: values.node,
        title: values.title,
        unit: values.unit,
        sensorType: values.sensorType,
        icon: values.icon || "osem-thermometer",
        lastMeasurement:
          values.lastMeasurementCreatedAt && values.lastMeasurementValue
            ? {
                createdAt: values.lastMeasurementCreatedAt,
                value: values.lastMeasurementValue,
              }
            : undefined,
      };

      await mutateAsync(payload);
      window.alert("✅ Sensor created successfully!");
      reset();
      onClose();
    } catch (e) {
      console.error(e);
      window.alert("❌ Failed to create sensor. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft animate-in">
        <h3 className="text-lg font-semibold text-black">Create Sensor</h3>

        <form className="mt-4 space-y-3 text-black" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Node"
            error={errors.node?.message}
            placeholder="5faea98f9b2df8001b92dfac"
            {...register("node")}
          />
          <FormField
            label="Title"
            error={errors.title?.message}
            placeholder="Temperature"
            {...register("title")}
          />
          <FormField
            label="Unit"
            error={errors.unit?.message}
            placeholder="°C"
            {...register("unit")}
          />
          <FormField
            label="Sensor Type"
            error={errors.sensorType?.message}
            placeholder="BME280"
            {...register("sensorType")}
          />
          <FormField
            label="Icon"
            error={errors.icon?.message}
            placeholder="osem-thermometer"
            {...register("icon")}
          />

          <div className="pt-2">
            <p className="mb-2 text-xs font-medium text-slate-600">
              (Optional) Last Measurement
            </p>
            <FormField
              label="createdAt (ISO)"
              error={errors.lastMeasurementCreatedAt?.message}
              placeholder="2024-02-05T02:59:12.394Z"
              {...register("lastMeasurementCreatedAt")}
            />
            <FormField
              label="value"
              error={errors.lastMeasurementValue?.message}
              placeholder="29.99"
              {...register("lastMeasurementValue")}
            />
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-black border border-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-brand text-black border border-gray-400"
            >
              {isPending ? "Saving..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
