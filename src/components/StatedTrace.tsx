"use client";

import { useEffect, useRef } from "react";
import coiDoc from "@/data/coiDocument.json";
import type { StatedTrace as StatedTraceType } from "@/types";
import { SourceCard } from "./SourceCard";

type Page = { page: number; text: string };
const pages = (coiDoc as { pages: Page[] }).pages;

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
    return <p className="p-6 text-sm text-secondary">Page not found.</p>;
  }

  return (
    <div className="p-5">
      <SourceCard
        page={source.page}
        text={docPage.text}
        match={source.match}
        markRef={markRef}
        onViewInDoc={onViewInDoc}
      />
    </div>
  );
};

export default StatedTrace;
