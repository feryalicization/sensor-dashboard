"use client";

import Card from "../atoms/Card";
import Button from "../atoms/Button";
import Spinner from "../atoms/Spinner";
import { fmtNumber } from "@/lib/utils";
import type { Sensor } from "@/lib/types";

export default function SensorTable({
  sensors,
  onDelete,
}: {
  sensors: Sensor[];
  onDelete: (id: string) => void;
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-3 font-semibold text-slate-600">Title</th>
              <th className="py-3 pr-3 font-semibold text-slate-600">Type</th>
              <th className="py-3 pr-3 font-semibold text-slate-600">Unit</th>
              <th className="py-3 pr-3 font-semibold text-slate-600">
                Last Measured
              </th>
              <th className="py-3 pr-3 font-semibold text-slate-600">Value</th>
              <th className="py-3 pr-3" />
            </tr>
          </thead>

          <tbody>
            {sensors.map((s) => (
              <tr key={s._id} className="border-b last:border-none">
                <td className="py-3 pr-3">{s.title}</td>
                <td className="py-3 pr-3">{s.sensorType}</td>
                <td className="py-3 pr-3">{s.unit}</td>
                <td className="py-3 pr-3">
                  {s.lastMeasurement?.createdAt
                    ? new Date(s.lastMeasurement.createdAt).toLocaleString()
                    : "—"}
                </td>
                <td className="py-3 pr-3">
                  {fmtNumber(s.lastMeasurement?.value)}
                </td>
                <td className="py-3 pr-3 text-right">
                  <Button
                    variant="danger"
                    onClick={() => onDelete(String(s._id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
