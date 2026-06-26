"use client";

import type { ShareClassRow, DrawerData } from "@/types";
import { TraceableValue } from "./TraceableValue";
import { Field } from "./Field";
import { CalcRow } from "./CalcRow";
import { cn } from "@/lib/utils";

interface ShareClassDrawerProps {
  row: ShareClassRow;
  drawer: DrawerData;
  activeTraceId: string | null;
  onTrace: (id: string) => void;
  onClose: () => void;
}

export const ShareClassDrawer = ({ row, drawer, activeTraceId, onTrace, onClose }: ShareClassDrawerProps) => {
  const t = drawer.traceIds;

  return (
    <div className={cn(
      "fixed inset-0 z-40 flex flex-col overflow-y-auto border-t-2 border-[var(--accent)] bg-[var(--surface)] drawer-enter",
      "md:static md:inset-auto md:z-auto md:overflow-visible"
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--accent)]">{row.name}</span>
          <span className="text-[var(--border)]">·</span>
          <span className="text-xs text-[var(--text-secondary)]">Preferred Stock</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close drawer"
          className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors text-lg leading-none w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-6 md:px-8 md:flex-row md:gap-12">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">Rights and Preferences</p>
          <div className="max-w-xs">
            <Field label="LP Rank">{drawer.lpRank}</Field>
            <Field label="LP Multiple">{drawer.lpMultiple}</Field>
            <Field label="Participation">{drawer.participation}</Field>
            <Field label="Participation Cap">{drawer.participationCap ?? "—"}</Field>
            <Field label="Dividend Rate">{drawer.dividendRate}</Field>
            <Field label="Dividend">—</Field>
            <Field label="Issue Date">{drawer.issueDate}</Field>
            <Field label="Conversion Ratio">{drawer.conversionRatio}</Field>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">Calculations</p>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left" />
                <th className="pb-1.5 px-4 text-right text-[10px] font-semibold tracking-wider text-[var(--text-tertiary)] uppercase">Per Share</th>
                <th className="pb-1.5 pl-4 text-right text-[10px] font-semibold tracking-wider text-[var(--text-tertiary)] uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              <CalcRow
                label="Liquidation Preference"
                perShare={t.issuePrice ? (
                  <TraceableValue traceId={t.issuePrice} onTrace={onTrace} isActive={activeTraceId === t.issuePrice}>
                    {drawer.liqPrefPerShare}
                  </TraceableValue>
                ) : drawer.liqPrefPerShare}
                total={t.totalLiqPref ? (
                  <TraceableValue traceId={t.totalLiqPref} onTrace={onTrace} isActive={activeTraceId === t.totalLiqPref}>
                    {drawer.totalLiqPref}
                  </TraceableValue>
                ) : drawer.totalLiqPref}
              />
              <CalcRow label="Dividend" perShare="$0.00" total="$0" />
              <CalcRow
                label="Total Liquidation Preference"
                perShare={drawer.liqPrefPerShare}
                total={t.totalLiqPref ? (
                  <TraceableValue traceId={t.totalLiqPref} onTrace={onTrace} isActive={activeTraceId === t.totalLiqPref}>
                    {drawer.totalLiqPref}
                  </TraceableValue>
                ) : drawer.totalLiqPref}
              />
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-2.5 border-t border-[var(--border-light)] bg-[var(--background)] md:px-8">
        <p className="text-[11px] text-[var(--text-tertiary)]">
          <span className="font-medium text-[var(--text-secondary)]">Sources:</span>{" "}
          Helios Bioscience Inc. — Amended and Restated Certificate of Incorporation (Jan 22, 2026), Series H Stock Purchase Agreement
        </p>
      </div>
    </div>
  );
};

export default ShareClassDrawer;
