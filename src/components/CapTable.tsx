"use client";

import { ChevronRight } from "lucide-react";
import tracesRaw from "@/data/traces.json";
import type { ShareClassRow, Trace } from "@/types";
import { TraceableValue } from "./TraceableValue";
import { formatShares } from "@/utils/formatShares";
import { formatPercent } from "@/utils/formatPercent";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/lib/utils";

const allTraces = tracesRaw as Record<string, Trace>;

interface CapTableProps {
  rows: ShareClassRow[];
  selectedId: string | null;
  activeTraceId: string | null;
  onRowClick: (id: string) => void;
  onTrace: (id: string) => void;
}

const COL_HEADERS = [
  { label: "SHARE CLASS",            cls: "text-left w-64" },
  { label: "SHARES OUTSTANDING",     cls: "text-right" },
  { label: "CONVERSION RATIO",       cls: "text-right" },
  { label: "AS-IF CONVERTED SHARES", cls: "text-right" },
  { label: "FULLY DILUTED SHARE %",  cls: "text-right" },
  { label: "ISSUE PRICE",            cls: "text-right" },
];

export const CapTable = ({ rows, selectedId, activeTraceId, onRowClick, onTrace }: CapTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs border-separate border-spacing-0">
      <thead>
        <tr>
          {COL_HEADERS.map((col) => (
            <th
              key={col.label}
              className={cn(col.cls, "px-4 py-2.5 font-medium text-2xs tracking-wider text-tertiary border-b border-border whitespace-nowrap")}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          if (row.isSection) {
            return (
              <tr key={row.id}>
                <td colSpan={6} className="px-4 pt-4 pb-1.5 text-2xs font-semibold tracking-widest text-tertiary uppercase">
                  {row.sectionLabel}
                </td>
              </tr>
            );
          }

          if (row.isTotal) {
            return (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-2.5 font-semibold text-primary">{row.name}</td>
                <td className="px-4 py-2.5 text-right text-secondary">—</td>
                <td className="px-4 py-2.5 text-right text-secondary">—</td>
                <td className="px-4 py-2.5 text-right font-medium text-primary">{formatShares(row.asIfConverted)}</td>
                <td className="px-4 py-2.5 text-right font-medium text-primary">{formatPercent(row.fullyDilutedPct)}</td>
                <td className="px-4 py-2.5 text-right text-secondary">—</td>
              </tr>
            );
          }

          const isSelected     = selectedId === row.id;
          const sharesTraceId  = row.traceIds?.sharesOutstanding;
          const priceTraceId   = row.traceIds?.issuePrice;

          return (
            <tr
              key={row.id}
              className={cn("transition-colors", isSelected && "bg-accent-light")}
            >
              <td className="px-4 py-2.5 border-b border-border-light">
                <button
                  onClick={() => onRowClick(row.id)}
                  className={cn(
                    "flex items-center gap-1.5 group/row cursor-pointer",
                    isSelected ? "text-accent font-medium" : "text-primary"
                  )}
                >
                  <ChevronRight
                    size={13}
                    strokeWidth={2}
                    className={cn(
                      "shrink-0 transition-all duration-150",
                      isSelected
                        ? "rotate-90 text-accent"
                        : "text-tertiary group-hover/row:text-secondary"
                    )}
                  />
                  {row.name}
                </button>
              </td>

              <td className="px-4 py-2.5 text-right border-b border-border-light text-secondary tabular-nums">
                {row.sharesOutstanding == null ? "—" : (
                  sharesTraceId ? (
                    <TraceableValue
                      traceId={sharesTraceId}
                      onTrace={onTrace}
                      isActive={activeTraceId === sharesTraceId}
                    >
                      {formatShares(row.sharesOutstanding)}
                    </TraceableValue>
                  ) : formatShares(row.sharesOutstanding)
                )}
              </td>

              <td className="px-4 py-2.5 text-right border-b border-border-light text-secondary tabular-nums">
                {row.conversionRatio.toFixed(4)}
              </td>
              <td className="px-4 py-2.5 text-right border-b border-border-light text-secondary tabular-nums">
                {formatShares(row.asIfConverted)}
              </td>
              <td className="px-4 py-2.5 text-right border-b border-border-light text-secondary tabular-nums">
                {formatPercent(row.fullyDilutedPct)}
              </td>

              <td className="px-4 py-2.5 text-right border-b border-border-light text-secondary tabular-nums">
                {priceTraceId ? (
                  <TraceableValue
                    traceId={priceTraceId}
                    onTrace={onTrace}
                    isActive={activeTraceId === priceTraceId}
                  >
                    {allTraces[priceTraceId]?.value ?? formatPrice(row.issuePrice)}
                  </TraceableValue>
                ) : formatPrice(row.issuePrice)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default CapTable;
