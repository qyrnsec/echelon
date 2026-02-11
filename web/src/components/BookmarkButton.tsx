"use client";

import { useState, useEffect } from "react";
import type { DigestItem } from "@/lib/types";
import { isBookmarked, addBookmark, removeBookmark } from "@/lib/bookmarks";

export default function BookmarkButton({
  item,
  digestDate,
}: {
  item: DigestItem;
  digestDate: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(item.url));
  }, [item.url]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeBookmark(item.url);
      setSaved(false);
    } else {
      addBookmark({ ...item, digestDate });
      setSaved(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`text-[10px] px-1.5 py-0.5 rounded border transition-all cursor-pointer ${
        saved
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border text-text-dim hover:border-accent/30 hover:text-accent"
      }`}
      title={saved ? "Retirer de Mon Digest" : "Ajouter à Mon Digest"}
    >
      {saved ? "[*]" : "[+]"}
    </button>
  );
}
