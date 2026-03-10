"use client";

import { useEffect, useMemo, useState } from "react";
import { useProjectContext } from "@/lib/projectContext";

type RoomRow = { id: number; parameters?: Record<string, unknown> | null; [k: string]: unknown };

function parseArea(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const s = String(value).replace(",", ".");
  const match = s.match(/[-+]?\d*\.?\d+/);
  return match ? Number(match[0]) : 0;
}

export default function ProjectOverviewPage() {
  const { selectedProjectId } = useProjectContext();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!selectedProjectId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/rooms?projectId=${selectedProjectId}`, { cache: "no-store" });
        const json = (await res.json()) as { ok: boolean; rooms?: RoomRow[]; error?: string };
        if (!json.ok) {
          setError(json.error ?? "Errore caricamento rooms.");
          return;
        }
        if (!cancelled) setRooms(json.rooms ?? []);
      } catch {
        if (!cancelled) setError("Errore di rete.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedProjectId]);

  const metrics = useMemo(() => {
    const roomsCount = rooms.length;
    const areaSum = rooms.reduce((acc, r) => acc + parseArea((r as any).area ?? (r as any).Area), 0);
    return { roomsCount, areaSum };
  }, [rooms]);

  return (
    <main className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">📊 Project Overview</h1>
        <p className="mt-2 text-slate-600">
          Contesto progetto: <span className="font-medium">{selectedProjectId ?? "-"}</span>
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">📍 Locali</div>
          <div className="mt-2 text-2xl font-semibold">{loading ? "…" : metrics.roomsCount}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">📐 Superficie Totale</div>
          <div className="mt-2 text-2xl font-semibold">
            {loading ? "…" : `${metrics.areaSum.toFixed(2)} m²`}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">🔍 Filtro</div>
          <div className="mt-2 text-2xl font-semibold">{selectedProjectId ? "Attivo" : "Globale"}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">📑 Elenco Locali</h2>
        <p className="mt-1 text-sm text-slate-600">
          Vista semplificata (la tabella completa è in “Rooms”).
        </p>
      </div>
    </main>
  );
}

