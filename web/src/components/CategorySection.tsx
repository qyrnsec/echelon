import type { DigestItem } from "@/lib/types";
import type { ReactNode } from "react";
import DigestCard from "./DigestCard";

const CATEGORY_ICONS: Record<string, string> = {
  Vulns: "!",
  Tools: ">",
  Tutorials: "?",
  Bounty: "$",
  News: "#",
};

const CATEGORY_ACCENT: Record<string, string> = {
  Vulns: "text-red",
  Tools: "text-accent",
  Tutorials: "text-purple",
  Bounty: "text-orange",
  News: "text-cyan",
};

export default function CategorySection({
  category,
  items,
  highlightedUrls,
  renderActions,
}: {
  category: string;
  items: DigestItem[];
  highlightedUrls?: Set<string>;
  renderActions?: (item: DigestItem) => ReactNode;
}) {
  if (items.length === 0) return null;

  const accentClass = CATEGORY_ACCENT[category] || "text-accent";

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-[13px] sm:text-sm font-semibold uppercase tracking-widest text-text-dim mb-3 sm:mb-4 flex items-center gap-2">
        <span className={`font-mono font-bold ${accentClass}`}>
          {CATEGORY_ICONS[category] || ">"}
        </span>
        {category}
        <span className="text-[10px] text-text-dim/50 font-normal">
          ({items.length})
        </span>
      </h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <DigestCard
            key={`${item.url}-${i}`}
            item={item}
            highlighted={highlightedUrls?.has(item.url)}
            actions={renderActions?.(item)}
          />
        ))}
      </div>
    </section>
  );
}
