"use client";

import type { FilterState } from "@/lib/types";
import { Chip } from "@heroui/react";

const CATEGORIES = ["Vulns", "Bounty", "Tools", "Tutorials", "News"];
const SOURCE_TYPES = ["reddit", "rss", "youtube", "podcast", "github", "nvd"];

const CATEGORY_CHIP_COLORS: Record<
  string,
  "danger" | "success" | "secondary" | "warning" | "primary" | "default"
> = {
  Vulns: "danger",
  Tools: "primary",
  Tutorials: "secondary",
  Bounty: "warning",
  News: "default",
};

const SOURCE_CHIP_COLORS: Record<
  string,
  "danger" | "success" | "secondary" | "warning" | "primary" | "default"
> = {
  reddit: "warning",
  rss: "default",
  youtube: "danger",
  podcast: "secondary",
  github: "primary",
  nvd: "warning",
};

export default function DigestFilters({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  const toggleCategory = (cat: string) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleSource = (src: string) => {
    const next = filters.sourceTypes.includes(src)
      ? filters.sourceTypes.filter((s) => s !== src)
      : [...filters.sourceTypes, src];
    onChange({ ...filters, sourceTypes: next });
  };

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-text-dim/60 uppercase tracking-widest w-6 shrink-0">
          cat
        </span>
        {CATEGORIES.map((cat) => {
          const active = filters.categories.includes(cat);
          return (
            <Chip
              key={cat}
              size="sm"
              variant={active ? "solid" : "bordered"}
              color={CATEGORY_CHIP_COLORS[cat] || "default"}
              onClick={() => toggleCategory(cat)}
              className="cursor-pointer"
              classNames={{
                base: "h-6",
                content: "text-[11px] font-medium",
              }}
            >
              {cat}
            </Chip>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-text-dim/60 uppercase tracking-widest w-6 shrink-0">
          src
        </span>
        {SOURCE_TYPES.map((src) => {
          const active = filters.sourceTypes.includes(src);
          return (
            <Chip
              key={src}
              size="sm"
              variant={active ? "solid" : "bordered"}
              color={SOURCE_CHIP_COLORS[src] || "default"}
              onClick={() => toggleSource(src)}
              className="cursor-pointer"
              classNames={{
                base: "h-6",
                content: "text-[11px] font-medium",
              }}
            >
              {src}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}
