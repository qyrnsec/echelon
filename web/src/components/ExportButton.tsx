"use client";

import type { DigestItem } from "@/lib/types";
import { generateDigestMarkdown, downloadMarkdown } from "@/lib/markdown";

export default function ExportButton({
  date,
  items,
}: {
  date: string;
  items: DigestItem[];
}) {
  const handleExport = () => {
    const title = `ECHELON — Digest ${date}`;
    const content = generateDigestMarkdown(title, date, items);
    downloadMarkdown(`echelon-${date}.md`, content);
  };

  return (
    <button
      onClick={handleExport}
      className="text-xs text-text-dim hover:text-accent transition-colors border border-border rounded px-2 py-1 hover:border-accent/40 cursor-pointer"
    >
      <span className="text-accent">$</span> export --md
    </button>
  );
}
