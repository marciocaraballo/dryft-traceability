"use client";

import { useEffect, useRef } from "react";
import coiDoc from "@/data/coiDocument.json";
import type { StatedTrace as StatedTraceType } from "@/types";

type Page = { page: number; text: string };
const pages = (coiDoc as { pages: Page[] }).pages;

const WINDOW = 400;

interface StatedTraceProps {
  trace: StatedTraceType;
  onViewInDoc: (page: number, match: string) => void;
}

export const StatedTrace = ({ trace, onViewInDoc }: StatedTraceProps) => {
  const markRef = useRef<HTMLElement>(null);
  const { source } = trace;

  const docPage = pages.find((p) => p.page === source.page)
    ?? pages.find((p) => p.text.includes(source.match));

  useEffect(() => {
    const t = setTimeout(() => {
      markRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      markRef.current?.classList.add("fade-in");
    }, 80);
    return () => clearTimeout(t);
  }, [source.page, source.match]);

  if (!docPage) {
    return <p className="p-6 text-sm text-[var(--text-secondary)]">Page not found.</p>;
  }

  const idx    = docPage.text.indexOf(source.match);
  const found  = idx >= 0;
  const start  = found ? Math.max(0, idx - WINDOW) : 0;
  const end    = found ? Math.min(docPage.text.length, idx + source.match.length + WINDOW) : 0;
  const before = found ? (start > 0 ? "…" : "") + docPage.text.slice(start, idx) : docPage.text;
  const after  = found ? docPage.text.slice(idx + source.match.length, end) + (end < docPage.text.length ? "…" : "") : "";

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="rounded border border-[var(--border)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-light)] bg-[#f5f5f2]">
          <span className="font-sans text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase">
            {coiDoc.company}
          </span>
          <span className="font-sans text-[10px] text-[var(--text-tertiary)]">Page {source.page}</span>
        </div>
        <div className="px-6 py-5 bg-[#fafaf8]">
          <p className="font-serif text-[13px] leading-[1.85] text-[var(--text-primary)]">
            {found ? (
              <>
                {before}
                <mark ref={markRef as React.RefObject<HTMLElement>}>{source.match}</mark>
                {after}
              </>
            ) : (
              docPage.text.slice(0, 800) + "…"
            )}
          </p>
        </div>
      </div>

      <button
        onClick={() => docPage && onViewInDoc(docPage.page, source.match)}
        className="self-start text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
      >
        View in document →
      </button>
    </div>
  );
};

export default StatedTrace;
