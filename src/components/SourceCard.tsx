"use client";

import type { RefObject } from "react";
import coiDoc from "@/data/coiDocument.json";

const WINDOW = 400;

interface SourceCardProps {
  page: number;
  text: string;
  match: string;
  markRef?: RefObject<HTMLElement | null>;
  onViewInDoc: (page: number, match: string) => void;
}

export const SourceCard = ({ page, text, match, markRef, onViewInDoc }: SourceCardProps) => {
  const idx    = text.indexOf(match);
  const found  = idx >= 0;
  const start  = found ? Math.max(0, idx - WINDOW) : 0;
  const end    = found ? Math.min(text.length, idx + match.length + WINDOW) : 0;
  const before = found ? (start > 0 ? "…" : "") + text.slice(start, idx) : text;
  const after  = found ? text.slice(idx + match.length, end) + (end < text.length ? "…" : "") : "";

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded border border-[var(--border)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-light)] bg-[#f5f5f2]">
          <span className="font-sans text-2xs font-semibold tracking-widest text-[var(--text-tertiary)] uppercase">
            {coiDoc.company}
          </span>
          <span className="font-sans text-2xs text-[var(--text-tertiary)]">Page {page}</span>
        </div>
        <div className="px-6 py-5 bg-[#fafaf8]">
          <p className="font-serif text-sm leading-[1.85] text-[var(--text-primary)]">
            {found ? (
              <>
                {before}
                <mark ref={markRef}>{match}</mark>
                {after}
              </>
            ) : (
              text.slice(0, 800) + "…"
            )}
          </p>
        </div>
      </div>
      <button
        onClick={() => onViewInDoc(page, match)}
        className="self-start text-xs font-medium text-[var(--accent)] hover:underline flex items-center gap-1"
      >
        View in document →
      </button>
    </div>
  );
};
