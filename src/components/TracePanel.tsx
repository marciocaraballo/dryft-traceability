"use client";

import tracesRaw from "@/data/traces.json";
import type { Trace } from "@/types";
import { StatedTrace } from "./StatedTrace";
import { ComputedTrace } from "./ComputedTrace";

const allTraces = tracesRaw as Record<string, Trace>;

interface TracePanelProps {
  traceKey: string;
  onClose: () => void;
  onViewInDoc: (page: number, match: string) => void;
}

export const TracePanel = ({ traceKey, onClose, onViewInDoc }: TracePanelProps) => {
  const trace = allTraces[traceKey];
  if (!trace) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={trace.label} className="fixed inset-0 z-50 flex flex-col bg-[var(--surface)] panel-enter overflow-hidden md:static md:inset-auto md:z-auto md:w-[440px] md:shrink-0 md:border-l-2 md:border-[var(--border)]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] shrink-0 gap-3">
        <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
          {trace.label}
        </span>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="shrink-0 w-6 h-6 flex items-center justify-center text-lg leading-none text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          ×
        </button>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-light)] shrink-0 bg-[var(--background)]">
        <span className="text-lg font-semibold tabular-nums text-[var(--text-primary)]">
          {trace.value}
        </span>
        {trace.type === "stated" ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-2xs font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
            ✓ Sourced
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-2xs font-semibold bg-violet-50 text-violet-700 border-violet-200">
            ƒ Computed
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {trace.type === "stated" ? (
          <StatedTrace trace={trace} onViewInDoc={onViewInDoc} />
        ) : (
          <ComputedTrace trace={trace} onViewInDoc={onViewInDoc} />
        )}
      </div>
    </div>
  );
};

export default TracePanel;
