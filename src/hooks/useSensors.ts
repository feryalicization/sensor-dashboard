import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "@/lib/axiosClient";
import type { Sensor, SensorResult, ApiResponse, PageMeta } from "@/lib/types";
import { queryClient } from "@/lib/queryClient";

const keys = {
  list: (page: number, size: number, q: string, sort: string) =>
    ["sensors", page, size, q, sort] as const,
};

export function useSensors(params?: {
  page?: number;
  size?: number;
  q?: string;
  sort?: string;
}) {
  const { page = 1, size = 5, q = "", sort = "title" } = params || {};

  return useQuery({
    queryKey: keys.list(page, size, q, sort),
    queryFn: async (): Promise<{ result: SensorResult; page?: PageMeta }> => {
      const { data } = await api.get<ApiResponse<SensorResult>>("/api/sensor/result", {
        params: { page, size, q, sort },
      });
      return { result: data.data, page: data.page };
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

export function useCreateSensor() {
  return useMutation({
    mutationFn: async (
      payload: Omit<Sensor, "_id" | "icon" | "lastMeasurement"> & { icon?: string }
    ) => {
      const { data } = await api.post("/api/sensor", payload);
      return data as Sensor;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sensors"] }),
  });
}

export function useDeleteSensor() {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const { data } = await api.delete(`/api/sensor/${id}`);
      return data as { success: boolean };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sensors"] }),
  });
}
