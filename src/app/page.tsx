"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { CapTable } from "@/components/CapTable";
import { ShareClassDrawer } from "@/components/ShareClassDrawer";
import { TracePanel } from "@/components/TracePanel";
import { DocumentReader } from "@/components/DocumentReader";
import { capTableRows, drawerDataMap } from "@/data/capTableData";
import { TABS, NAV_ITEMS } from "./constants";

interface DocReaderState {
  page: number;
  match: string;
}

const Home = () => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [activeTraceId, setActiveTraceId] = useState<string | null>(null);
  const [panelTraceKey, setPanelTraceKey] = useState<string | null>(null);
  const [docReader,     setDocReader]     = useState<DocReaderState | null>(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const selectedRow = selectedRowId ? capTableRows.find((r) => r.id === selectedRowId) ?? null : null;
  const drawerData  = selectedRowId ? drawerDataMap[selectedRowId] ?? null : null;

  const closePanel = () => {
    setPanelTraceKey(null);
    setActiveTraceId(null);
  };

  const closeAll = () => {
    setSelectedRowId(null);
    setActiveTraceId(null);
    setPanelTraceKey(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (docReader)     { setDocReader(null); return; }
      if (panelTraceKey) { setPanelTraceKey(null); setActiveTraceId(null); return; }
      if (selectedRowId) { setSelectedRowId(null); setActiveTraceId(null); setPanelTraceKey(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [docReader, panelTraceKey, selectedRowId]);

  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      <header className="flex items-center justify-between h-11 px-4 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center justify-center w-7 h-7 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Menu size={16} />
          </button>
          <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">Dryft</span>
          <span className="hidden md:inline text-[var(--border)] select-none">·</span>
          <span className="hidden md:inline text-xs text-[var(--text-secondary)]">Prototype: conclusion-workspace</span>
          <span className="hidden md:inline text-[var(--border)] select-none">·</span>
          <span className="hidden md:inline text-xs text-[var(--text-secondary)]">Helios Bioscience Inc.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Concluded
          </span>
          <div className="w-6 h-6 rounded-full bg-[var(--sidebar-bg)] border border-[var(--border)] flex items-center justify-center text-[10px] font-semibold text-[var(--text-secondary)]">
            KW
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="hidden md:flex w-48 shrink-0 bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex-col py-3 gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-light)] hover:text-[var(--text-primary)] rounded-sm mx-1.5 transition-colors text-left"
            >
              <span className="text-[var(--text-tertiary)] text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-56 bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col py-3 gap-0.5 md:hidden">
              <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b border-[var(--border-light)]">
                <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest">Menu</span>
                <button
                  aria-label="Close navigation"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center w-6 h-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-light)] hover:text-[var(--text-primary)] rounded-sm mx-1.5 transition-colors text-left"
                >
                  <span className="text-[var(--text-tertiary)] text-base leading-none">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </aside>
          </>
        )}

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="px-8 pt-6 pb-0 bg-[var(--surface)] border-b border-[var(--border)] shrink-0">
            <h1 className="font-serif text-2xl text-[var(--text-primary)] tracking-tight mb-1">
              Helios Bioscience Inc.
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              April 30, 2026
              <span className="mx-1.5 text-[var(--border)]">·</span>
              409A Valuation
              <span className="mx-1.5 text-[var(--border)]">·</span>
              Version 4
            </p>
            <nav className="flex gap-0 -mb-px">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                    tab === "Capitalization"
                      ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                      : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 overflow-auto bg-[var(--surface)] pt-2">
              <CapTable
                rows={capTableRows}
                selectedId={selectedRowId}
                activeTraceId={activeTraceId}
                onRowClick={(id) => {
                  if (selectedRowId === id) {
                    closeAll();
                  } else {
                    setSelectedRowId(id);
                    setActiveTraceId(null);
                    setPanelTraceKey(null);
                  }
                }}
                onTrace={(key) => {
                  setActiveTraceId(key);
                  setPanelTraceKey(key);
                }}
              />
            </div>

            {selectedRow && drawerData && (
              <ShareClassDrawer
                row={selectedRow}
                drawer={drawerData}
                activeTraceId={activeTraceId}
                onTrace={(key) => {
                  setActiveTraceId(key);
                  setPanelTraceKey(key);
                }}
                onClose={closeAll}
              />
            )}
          </div>
        </main>

        {panelTraceKey && (
          <TracePanel
            traceKey={panelTraceKey}
            onClose={closePanel}
            onViewInDoc={(page, match) => setDocReader({ page, match })}
          />
        )}
      </div>

      {docReader && (
        <DocumentReader
          page={docReader.page}
          match={docReader.match}
          onClose={() => setDocReader(null)}
        />
      )}
    </div>
  );
};

export default Home;
