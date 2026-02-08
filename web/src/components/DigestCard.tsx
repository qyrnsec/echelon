import type { DigestItem } from "@/lib/types";

const SOURCE_COLORS: Record<string, string> = {
  reddit: "text-orange",
  rss: "text-cyan",
  twitter: "text-purple",
  youtube: "text-red",
  nvd: "text-orange",
};

const CATEGORY_COLORS: Record<string, string> = {
  Vulns: "border-red bg-red/10 text-red",
  Tools: "border-accent bg-accent/10 text-accent",
  Tutorials: "border-purple bg-purple/10 text-purple",
  Bounty: "border-orange bg-orange/10 text-orange",
  News: "border-cyan bg-cyan/10 text-cyan",
};

export default function DigestCard({ item }: { item: DigestItem }) {
  const sourceColor = SOURCE_COLORS[item.source_type] || "text-text-dim";
  const catStyle = CATEGORY_COLORS[item.category] || "border-border text-text-dim";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-border rounded-lg p-4 hover:border-accent/40 hover:bg-bg-hover transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-snug group-hover:text-accent transition-colors flex-1">
          {item.title}
        </h3>
        <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded border ${catStyle}`}>
          {item.category}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-text-dim">
        <span className={sourceColor}>{item.source}</span>
        <span>+{item.upvotes}</span>
        <span>{item.comments} comments</span>
        <span className="ml-auto text-[10px]">
          score {Math.round(item.score)}
        </span>
      </div>
    </a>
  );
}
