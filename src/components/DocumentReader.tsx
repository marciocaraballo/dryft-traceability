"use client";

import { useEffect, useRef, useState } from "react";
import coiDoc from "@/data/coiDocument.json";

interface DocumentReaderProps {
  page: number;
  match: string;
  onClose: () => void;
}

type Page = { page: number; text: string };
const allPages = (coiDoc as { pages: Page[] }).pages;
const WINDOW = 600;

export const DocumentReader = ({ page: tracedPage, match, onClose }: DocumentReaderProps) => {
  const [activePage, setActivePage] = useState(tracedPage);
  const markRef   = useRef<HTMLElement>(null);
  const pageRefs  = useRef<Record<number, HTMLDivElement | null>>({});
  const indexRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      markRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      markRef.current?.classList.add("fade-in");
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const p = Number((visible[0].target as HTMLElement).dataset.page);
          if (p) setActivePage(p);
        }
      },
      { root: container, threshold: 0.15 }
    );
    Object.values(pageRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    indexRefs.current[activePage]?.scrollIntoView({ block: "nearest" });
  }, [activePage]);

  return (
    <div className="fixed inset-0 z-50 flex bg-[var(--background)] doc-reader-enter">
      <aside className="w-48 shrink-0 border-r border-[var(--border)] bg-[var(--sidebar-bg)] flex flex-col overflow-hidden">
        <div className="px-4 py-3.5 border-b border-[var(--border)] shrink-0">
          <p className="text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase leading-snug">
            {coiDoc.title}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{coiDoc.company}</p>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{coiDoc.date}</p>
        </div>

        <div className="flex-1 overflow-y-auto py-1">
          {allPages.map((p) => {
            const isActive = p.page === activePage;
            const isTraced = p.page === tracedPage;
            return (
              <button
                key={p.page}
                ref={(el) => { indexRefs.current[p.page] = el; }}
                onClick={() => {
                  setActivePage(p.page);
                  pageRefs.current[p.page]?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center gap-2.5 transition-colors ${
                  isActive
                    ? "bg-[var(--accent-light)] text-[var(--accent)]"
                    : "hover:bg-[var(--border-light)] text-[var(--text-secondary)]"
                }`}
              >
                <span className="text-[10px] tabular-nums shrink-0 w-6 text-right text-[var(--text-tertiary)]">
                  {p.page}
                </span>
                <span className="text-[11px] leading-snug truncate flex-1">
                  {p.text.slice(0, 28).trim()}…
                </span>
                {isTraced && (
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-3 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{coiDoc.title}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {coiDoc.company} · {coiDoc.date} · {coiDoc.totalPages} pages
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-1.5 rounded border border-[var(--border)] hover:border-[var(--text-secondary)]"
          >
            Close ×
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#f4f4f0] px-4 py-6 md:px-12 md:py-10">
          <div className="max-w-[680px] mx-auto flex flex-col gap-8">
            {allPages.map((p) => {
              const isTraced = p.page === tracedPage;
              const idx      = isTraced ? p.text.indexOf(match) : -1;
              const start    = idx >= 0 ? Math.max(0, idx - WINDOW) : 0;
              const end      = idx >= 0 ? Math.min(p.text.length, idx + match.length + WINDOW) : p.text.length;
              const before   = idx >= 0 ? (start > 0 ? "…" : "") + p.text.slice(start, idx) : "";
              const after    = idx >= 0 ? p.text.slice(idx + match.length, end) + (end < p.text.length ? "…" : "") : "";

              return (
                <div
                  key={p.page}
                  ref={(el) => { pageRefs.current[p.page] = el; }}
                  data-page={p.page}
                >
                  <div className={`bg-white rounded-sm border px-4 py-5 md:px-9 md:py-7 shadow-sm transition-all duration-300 ${
                    isTraced
                      ? "border-[var(--accent)] shadow-[0_0_0_3px_var(--accent-light)]"
                      : "border-[var(--border)]"
                  }`}>
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--border-light)]">
                      <span className="font-sans text-[10px] font-semibold tracking-widest text-[var(--text-tertiary)] uppercase">
                        {coiDoc.company}
                      </span>
                      <span className="font-sans text-[10px] text-[var(--text-tertiary)]">
                        Page {p.page}
                      </span>
                    </div>

                    <p className="font-serif text-[13.5px] leading-[1.9] text-[var(--text-primary)]">
                      {isTraced && idx >= 0 ? (
                        <>
                          {before}
                          <mark ref={markRef as React.RefObject<HTMLElement>}>
                            {match}
                          </mark>
                          {after}
                        </>
                      ) : (
                        p.text
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReader;
