import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "@/lib/axiosClient";
import type {
  Sensor,
  SensorResult,
  ApiResponse,
  PageMeta,
  DeleteResponse,
  LastMeasurement,
} from "@/lib/types";
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
    // React Query v5
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

type CreateSensorPayload = {
  node: string;
  title: string;
  unit: string;
  sensorType: string;
  icon?: string;
  lastMeasurement?: LastMeasurement;
};

export function useCreateSensor() {
  return useMutation({
    mutationFn: async (payload: CreateSensorPayload) => {
      const { data } = await api.post<ApiResponse<Sensor>>("/api/sensor", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
    },
  });
}

export function useDeleteSensor() {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const { data } = await api.delete<DeleteResponse>("/api/sensor", {
        params: { id },
      });
      return data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
    },
  });
}
