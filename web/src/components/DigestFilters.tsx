"use client";

import type { FilterState } from "@/lib/types";

const CATEGORIES = ["Vulns", "Bounty", "Tools", "Tutorials", "News"];
const SOURCE_TYPES = ["reddit", "rss", "youtube", "podcast", "github", "nvd"];

const CATEGORY_ACTIVE_STYLES: Record<string, string> = {
  Vulns: "bg-red/20 border-red text-red",
  Tools: "bg-accent/20 border-accent text-accent",
  Tutorials: "bg-purple/20 border-purple text-purple",
  Bounty: "bg-orange/20 border-orange text-orange",
  News: "bg-cyan/20 border-cyan text-cyan",
};

const SOURCE_ACTIVE_STYLES: Record<string, string> = {
  reddit: "bg-orange/20 border-orange text-orange",
  rss: "bg-cyan/20 border-cyan text-cyan",
  youtube: "bg-red/20 border-red text-red",
  podcast: "bg-purple/20 border-purple text-purple",
  github: "bg-accent/20 border-accent text-accent",
  nvd: "bg-orange/20 border-orange text-orange",
};

const INACTIVE_STYLE = "border-border text-text-dim hover:border-accent/30";

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
      <div className="flex flex-wrap gap-2">
        <span className="text-[10px] text-text-dim uppercase tracking-widest mr-1 self-center">cat</span>
        {CATEGORIES.map((cat) => {
          const active = filters.categories.includes(cat);
          const style = active ? CATEGORY_ACTIVE_STYLES[cat] : INACTIVE_STYLE;
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer ${style}`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-[10px] text-text-dim uppercase tracking-widest mr-1 self-center">src</span>
        {SOURCE_TYPES.map((src) => {
          const active = filters.sourceTypes.includes(src);
          const style = active ? SOURCE_ACTIVE_STYLES[src] : INACTIVE_STYLE;
          return (
            <button
              key={src}
              onClick={() => toggleSource(src)}
              className={`text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer ${style}`}
            >
              {src}
            </button>
          );
        })}
      </div>
    </div>
  );
}
