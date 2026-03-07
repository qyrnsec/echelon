"use client";

import type { DigestItem } from "@/lib/types";
import { generateDigestMarkdown, downloadMarkdown } from "@/lib/markdown";
import { Button } from "@heroui/react";
import { Download } from "lucide-react";

export default function ExportButton({
  date,
  items,
}: {
  date: string;
  items: DigestItem[];
}) {
  const handleExport = () => {
    const title = `ÉCHELON — Digest ${date}`;
    const content = generateDigestMarkdown(title, date, items);
    downloadMarkdown(`echelon-${date}.md`, content);
  };

  return (
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
  );
}
