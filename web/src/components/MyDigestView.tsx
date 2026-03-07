"use client";

import { useState, useEffect } from "react";
import type { BookmarkedItem } from "@/lib/types";
import { getBookmarks, removeBookmark } from "@/lib/bookmarks";
import { generateDigestMarkdown, downloadMarkdown } from "@/lib/markdown";
import DigestCard from "./DigestCard";
import { Button } from "@heroui/react";
import { Download, Trash2 } from "lucide-react";

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
          <h1 className="text-base sm:text-lg font-semibold">
            <span className="text-accent font-mono">$</span>{" "}
            <span className="font-display">mon-digest</span>
          </h1>
          {bookmarks.length > 0 && (
            <Button
              size="sm"
              variant="bordered"
              color="default"
              startContent={<Download size={13} />}
              onPress={handleExport}
              className="border-[#1e1e2e] text-text-dim hover:border-accent/40 hover:text-accent h-7 text-[11px]"
            >
              Export .md
            </Button>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-text-dim/60 mt-1">
          {bookmarks.length} élément{bookmarks.length > 1 ? "s" : ""} sauvegardé{bookmarks.length > 1 ? "s" : ""}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-text-dim text-sm">Aucun élément sauvegardé.</p>
          <p className="text-text-dim/50 text-xs mt-1">
            Utilisez l&apos;icône marque-page sur les articles pour les ajouter ici.
          </p>
        </div>
      ) : (
        sortedDates.map((digestDate) => (
          <section key={digestDate} className="mb-6 sm:mb-8">
            <h2 className="text-[13px] sm:text-sm font-semibold uppercase tracking-widest text-text-dim mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-accent font-mono">&gt;</span>
              Digest {digestDate}
              <span className="text-[10px] text-text-dim/50 font-normal">
                ({grouped[digestDate].length})
              </span>
            </h2>
            <div className="space-y-2">
              {grouped[digestDate].map((item, i) => (
                <DigestCard
                  key={`${item.url}-${i}`}
                  item={item}
                  actions={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => handleRemove(item.url)}
                      aria-label="Retirer de Mon Digest"
                      className="h-6 w-6 min-w-6"
                    >
                      <Trash2 size={11} />
                    </Button>
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
