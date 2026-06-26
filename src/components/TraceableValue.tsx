"use client";

import { FileText, FunctionSquare } from "lucide-react";
import tracesRaw from "@/data/traces.json";
import type { Trace } from "@/types";
import { cn } from "@/lib/utils";

const registry = tracesRaw as Record<string, Trace>;

const ICON = {
  stated:   FileText,
  computed: FunctionSquare,
};

interface TraceableValueProps {
  children: React.ReactNode;
  traceId: string;
  onTrace: (id: string) => void;
  isActive?: boolean;
}

export const TraceableValue = ({ children, traceId, onTrace, isActive }: TraceableValueProps) => {
  const type = registry[traceId]?.type ?? "stated";
  const Icon = ICON[type];

  return (
    <button
      onClick={() => onTrace(traceId)}
      className={cn(
        "traceable inline-flex items-center gap-1 font-medium group/tv",
        isActive && "text-accent"
      )}
    >
      {children}
      <Icon
        size={11}
        strokeWidth={1.75}
        className={cn(
          "shrink-0 transition-colors",
          isActive
            ? "text-accent"
            : "text-tertiary group-hover/tv:text-accent"
        )}
      />
    </button>
  );
};

export default TraceableValue;
