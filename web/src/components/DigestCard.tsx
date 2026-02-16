import type { DigestItem } from "@/lib/types";
import type { ReactNode } from "react";

const SOURCE_COLORS: Record<string, string> = {
  reddit: "text-orange",
  rss: "text-cyan",
  podcast: "text-purple",
  youtube: "text-red",
  github: "text-accent",
  nvd: "text-orange",
};

const CATEGORY_COLORS: Record<string, string> = {
  Vulns: "border-red bg-red/10 text-red",
  Tools: "border-accent bg-accent/10 text-accent",
  Tutorials: "border-purple bg-purple/10 text-purple",
  Bounty: "border-orange bg-orange/10 text-orange",
  News: "border-cyan bg-cyan/10 text-cyan",
};

export default function DigestCard({
  item,
  highlighted,
  actions,
}: {
  item: DigestItem;
  highlighted?: boolean;
  actions?: ReactNode;
}) {
  const sourceColor = SOURCE_COLORS[item.source_type] || "text-text-dim";
  const catStyle = CATEGORY_COLORS[item.category] || "border-border text-text-dim";

  return (
    <div
      className={`border rounded-lg p-3 sm:p-4 hover:border-accent/40 hover:bg-bg-hover transition-all group ${
        highlighted
          ? "border-accent/50 shadow-[inset_3px_0_0_0_var(--color-accent)] bg-accent/[0.03]"
          : "border-border"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] sm:text-sm font-medium leading-snug group-hover:text-accent transition-colors flex-1"
        >
          {item.title}
        </a>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          <span className={`text-[10px] px-2 py-0.5 rounded border ${catStyle}`}>
            {item.category}
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-text-dim">
        <span className={sourceColor}>{item.source}</span>
        {item.upvotes > 0 && <span>+{item.upvotes}</span>}
        {item.comments > 0 && <span>{item.comments} comments</span>}
        {item.cvss && item.cvss > 0 && <span>CVSS {item.cvss}</span>}
        <span className="ml-auto text-[10px]">
          score {Math.round(item.score)}
        </span>
      </div>
    </div>
  );
}
