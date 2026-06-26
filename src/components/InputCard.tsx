"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import tracesRaw from "@/data/traces.json";
import coiDoc from "@/data/coiDocument.json";
import type { Trace } from "@/types";
import { cn } from "@/lib/utils";

const allTraces = tracesRaw as Record<string, Trace>;

type Page = { page: number; text: string };
const pages = (coiDoc as { pages: Page[] }).pages;

const WINDOW = 400;

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

  const idx    = docPage ? docPage.text.indexOf(trace.source.match) : -1;
  const start  = idx >= 0 ? Math.max(0, idx - WINDOW) : 0;
  const end    = idx >= 0 ? Math.min(docPage!.text.length, idx + trace.source.match.length + WINDOW) : 0;
  const before = idx >= 0 ? (start > 0 ? "…" : "") + docPage!.text.slice(start, idx) : "";
  const after  = idx >= 0 ? docPage!.text.slice(idx + trace.source.match.length, end) + (end < docPage!.text.length ? "…" : "") : "";

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
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {trace.label}
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
            ✓ Sourced · p.{trace.source.page} · Certificate of Incorporation
          </p>
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
        <div className="px-3.5 pb-3.5 flex flex-col gap-3">
          <div className="rounded border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-light)] bg-[#f5f5f2]">
              <span className="font-sans text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase">
                {coiDoc.company}
              </span>
              <span className="font-sans text-[10px] text-[var(--text-tertiary)]">
                Page {trace.source.page}
              </span>
            </div>
            <div className="px-5 py-4 bg-[#fafaf8]">
              <p className="font-serif text-[12.5px] leading-[1.85] text-[var(--text-primary)]">
                {idx >= 0 ? (
                  <>
                    {before}
                    <mark ref={markRef as React.RefObject<HTMLElement>}>
                      {trace.source.match}
                    </mark>
                    {after}
                  </>
                ) : (
                  docPage.text.slice(0, 600) + "…"
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => onViewInDoc(docPage.page, trace.source.match)}
            className="self-start text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
          >
            View in document →
          </button>
        </div>
      )}
    </div>
  );
};
