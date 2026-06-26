"use client";

import { useState } from "react";
import type { ComputedTrace as ComputedTraceType } from "@/types";
import { InputCard } from "./InputCard";

interface ComputedTraceProps {
  trace: ComputedTraceType;
  onViewInDoc: (page: number, match: string) => void;
}

export const ComputedTrace = ({ trace, onViewInDoc }: ComputedTraceProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="rounded border border-[var(--border)] bg-[var(--background)] px-5 py-4">
        <p className="text-2xs font-semibold tracking-widest text-[var(--text-tertiary)] uppercase mb-2.5">
          Formula
        </p>
        <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
          {trace.formula}
        </p>
        <p className="font-mono text-xs text-[var(--text-secondary)] mt-1">
          {trace.expression}
        </p>
      </div>

      <div>
        <p className="text-2xs font-semibold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          Inputs
        </p>
        <div className="flex flex-col gap-2">
          {trace.inputs.map((key) => (
            <InputCard
              key={key}
              inputKey={key}
              isExpanded={expandedKeys.has(key)}
              onToggle={() => toggle(key)}
              onViewInDoc={onViewInDoc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComputedTrace;
