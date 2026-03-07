"use client";

import { useState, useEffect } from "react";
import type { DigestItem } from "@/lib/types";
import { isBookmarked, addBookmark, removeBookmark } from "@/lib/bookmarks";
import { Button } from "@heroui/react";
import { Bookmark, BookmarkCheck } from "lucide-react";

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

  const toggle = () => {
    if (saved) {
      removeBookmark(item.url);
      setSaved(false);
    } else {
      addBookmark({ ...item, digestDate });
      setSaved(true);
    }
  };

  return (
    <Button
      isIconOnly
      size="sm"
      variant={saved ? "flat" : "light"}
      color={saved ? "primary" : "default"}
      onPress={toggle}
      aria-label={saved ? "Retirer de Mon Digest" : "Ajouter à Mon Digest"}
      className="h-6 w-6 min-w-6"
    >
      {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
    </Button>
  );
}
