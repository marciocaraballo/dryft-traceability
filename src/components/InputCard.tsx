"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import tracesRaw from "@/data/traces.json";
import coiDoc from "@/data/coiDocument.json";
import type { Trace } from "@/types";
import { cn } from "@/lib/utils";
import { SourceCard } from "./SourceCard";

const allTraces = tracesRaw as Record<string, Trace>;

type Page = { page: number; text: string };
const pages = (coiDoc as { pages: Page[] }).pages;

interface InputCardProps {
  inputKey: string;
  isExpanded: boolean;
  onToggle: () => void;
  onViewInDoc: (page: number, match: string) => void;
}

export const InputCard = ({ inputKey, isExpanded, onToggle, onViewInDoc }: InputCardProps) => {
  const trace = allTraces[inputKey];
  const markRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isExpanded) return;
    const t = setTimeout(() => {
      markRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      markRef.current?.classList.add("fade-in");
    }, 120);
    return () => clearTimeout(t);
  }, [isExpanded]);

  if (!trace || trace.type !== "stated") return null;

  const docPage = pages.find((p) => p.page === trace.source.page)
    ?? pages.find((p) => p.text.includes(trace.source.match));

  return (
    <div className={cn(
      "rounded border transition-colors duration-150",
      isExpanded
        ? "border-[var(--accent)] bg-[var(--accent-light)]"
        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3.5 py-3 text-left gap-3 group"
      >
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {trace.label}
          </p>
          <span className="inline-flex self-start items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
            ✓ Sourced
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
            {trace.value}
          </span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={cn(
              "text-[var(--text-tertiary)] transition-transform duration-200",
              isExpanded && "rotate-180 text-[var(--accent)]"
            )}
          />
        </div>
      </button>

      {isExpanded && docPage && (
        <div className="px-3.5 pb-3.5">
          <SourceCard
            page={trace.source.page}
            text={docPage.text}
            match={trace.source.match}
            markRef={markRef}
            onViewInDoc={onViewInDoc}
          />
        </div>
      )}
    </div>
  );
};
