"use client";

import { useState } from "react";
import DashboardShell from "@/components/templates/DashboardShell";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import SensorTable from "@/components/organisms/SensorTable";
import CreateSensorModal from "@/components/organisms/CreateSensorModal";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import EmptyState from "@/components/molecules/EmptyState";
import Spinner from "@/components/atoms/Spinner";
import { useSensors, useDeleteSensor } from "@/hooks/useSensors";

export default function SensorsPage() {
  // UI state
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // Query params
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [sort] = useState("title");

  // Search state (tidak ada default "Hum")
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");

  const { data, isLoading, isError, error, isFetching } = useSensors({
    page,
    size,
    q,
    sort,
  });

  const del = useDeleteSensor();

  const sensors = data?.result?.sensors ?? [];
  const meta = data?.page;
  const totalPages = meta?.totalPages;

  // Delete flow
  const onDelete = (id: string) => setConfirmId(id);
  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      await del.mutateAsync(confirmId);
      setConfirmId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const canGoPrev = page > 1;
  const canGoNext = totalPages ? page < totalPages : sensors.length >= size;

  return (
    <DashboardShell
      title="Sensors"
      cta={<Button onClick={() => setOpenCreate(true)}>New Sensor</Button>}
    >
      {/* Search bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-black">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Serach..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQ(searchInput);
                setPage(1);
              }
            }}
            className="w-64 text-black placeholder-gray-400"
          />
          <Button
            onClick={() => {
              setQ(searchInput);
              setPage(1);
            }}
            className="text-black"
          >
            Search
          </Button>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2 text-white">
          <Button
            variant="ghost"
            disabled={!canGoPrev || isFetching}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-black border-gray-300 hover:bg-gray-200 hover:text-black"
          >
            Prev
          </Button>

          <span className="text-sm text-white font-medium">
            Page {page}
            {totalPages ? ` / ${totalPages}` : null}
            {isFetching ? " · updating…" : null}
          </span>
          <Button
            variant="ghost"
            disabled={!canGoNext || isFetching}
            onClick={() => setPage((p) => p + 1)}
            className="text-black border-gray-300 hover:bg-gray-200 hover:text-black"
          >
            Next
          </Button>
        </div>

      </div>

      {/* Content states */}
      {isLoading ? (
        <div className="mt-6 flex items-center gap-2 text-black">
          <Spinner /> Loading…
        </div>
      ) : isError ? (
        <EmptyState
          title="Failed to load sensors"
          subtitle={
            (error as any)?.response?.data?.message ||
            (error as Error)?.message ||
            "Check your API base URL and CORS."
          }
        />
      ) : !sensors.length ? (
        <EmptyState title="No sensors found" subtitle="Try adjusting your search." />
      ) : (
        <div className="mt-6 text-black">
          <SensorTable sensors={sensors} onDelete={onDelete} />
        </div>
      )}

      {/* Modals */}
      <CreateSensorModal open={openCreate} onClose={() => setOpenCreate(false)} />

      <ConfirmDialog
        open={!!confirmId}
        title="Delete sensor"
        message="This action cannot be undone."
        onCancel={() => setConfirmId(null)}
        onConfirm={confirmDelete}
      />
    </DashboardShell>
  );
}
