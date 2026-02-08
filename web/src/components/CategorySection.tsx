import type { DigestItem } from "@/lib/types";
import DigestCard from "./DigestCard";

const CATEGORY_ICONS: Record<string, string> = {
  Vulns: "!",
  Tools: ">",
  Tutorials: "?",
  News: "#",
};

export default function CategorySection({
  category,
  items,
}: {
  category: string;
  items: DigestItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-sm font-bold uppercase tracking-widest text-text-dim mb-4 flex items-center gap-2">
        <span className="text-accent font-mono">{CATEGORY_ICONS[category] || ">"}</span>
        {category}
        <span className="text-[10px] text-text-dim font-normal">({items.length})</span>
      </h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <DigestCard key={`${item.url}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
