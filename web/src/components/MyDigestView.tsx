"use client";

import { useState, useEffect } from "react";
import type { BookmarkedItem } from "@/lib/types";
import { getBookmarks, removeBookmark } from "@/lib/bookmarks";
import { generateDigestMarkdown, downloadMarkdown } from "@/lib/markdown";
import DigestCard from "./DigestCard";

export default function MyDigestView() {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setMounted(true);
  }, []);

  const handleRemove = (url: string) => {
    removeBookmark(url);
    setBookmarks((prev) => prev.filter((b) => b.url !== url));
  };

  const handleExport = () => {
    const today = new Date().toISOString().split("T")[0];
    const content = generateDigestMarkdown("Mon Digest", today, bookmarks);
    downloadMarkdown(`mon-digest-${today}.md`, content);
  };

  if (!mounted) return null;

  const grouped: Record<string, BookmarkedItem[]> = {};
  for (const item of bookmarks) {
    const key = item.digestDate;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  const sortedDates = Object.keys(grouped).sort().reverse();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="text-base sm:text-lg font-bold">
            <span className="text-accent">$</span> cat mon-digest.md
          </h1>
          {bookmarks.length > 0 && (
            <button
              onClick={handleExport}
              className="text-[11px] sm:text-xs text-text-dim hover:text-accent transition-colors border border-border rounded px-2 py-1 hover:border-accent/40 cursor-pointer w-fit"
            >
              <span className="text-accent">$</span> export --md
            </button>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-text-dim mt-1">
          {bookmarks.length} élément{bookmarks.length > 1 ? "s" : ""} sauvegardé{bookmarks.length > 1 ? "s" : ""}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-text-dim text-sm">
            <span className="text-accent">$</span> cat mon-digest.md
          </p>
          <p className="text-text-dim text-sm mt-1">Aucun élément sauvegardé.</p>
        </div>
      ) : (
        sortedDates.map((digestDate) => (
          <section key={digestDate} className="mb-6 sm:mb-8">
            <h2 className="text-[13px] sm:text-sm font-bold uppercase tracking-widest text-text-dim mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-accent font-mono">&gt;</span>
              Digest {digestDate}
              <span className="text-[10px] text-text-dim font-normal">
                ({grouped[digestDate].length})
              </span>
            </h2>
            <div className="space-y-2">
              {grouped[digestDate].map((item, i) => (
                <DigestCard
                  key={`${item.url}-${i}`}
                  item={item}
                  actions={
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemove(item.url);
                      }}
                      className="text-[10px] px-1.5 py-0.5 rounded border border-red/40 bg-red/10 text-red hover:bg-red/20 transition-all cursor-pointer"
                      title="Retirer de Mon Digest"
                    >
                      [-]
                    </button>
                  }
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
