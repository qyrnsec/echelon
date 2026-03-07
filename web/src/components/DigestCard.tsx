import type { DigestItem } from "@/lib/types";
import type { ReactNode } from "react";
import { Card, CardBody, Chip } from "@heroui/react";

const SOURCE_COLORS: Record<string, string> = {
  reddit: "text-orange",
  rss: "text-cyan",
  podcast: "text-purple",
  youtube: "text-red",
  github: "text-accent",
  nvd: "text-orange",
};

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
  const chipColor = CATEGORY_CHIP_COLORS[item.category] || "default";

  return (
    <Card
      className={`border transition-all group ${
        highlighted
          ? "border-accent/50 bg-accent/[0.04] shadow-[inset_3px_0_0_0_#7c3aed]"
          : "border-[#1e1e2e] bg-bg-card hover:border-accent/30 hover:bg-bg-hover"
      }`}
      shadow="none"
      radius="md"
    >
      <CardBody className="p-3 sm:p-4 gap-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] sm:text-sm font-medium leading-snug group-hover:text-accent transition-colors flex-1 text-text"
          >
            {item.title}
          </a>
          <div className="flex items-center gap-2 shrink-0">
            {actions}
            <Chip
              size="sm"
              variant="bordered"
              color={chipColor}
              classNames={{
                base: "h-5 px-1.5",
                content: "text-[10px] font-medium px-0",
              }}
            >
              {item.category}
            </Chip>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-text-dim">
          <span className={sourceColor}>{item.source}</span>
          {item.upvotes > 0 && <span>+{item.upvotes}</span>}
          {item.comments > 0 && <span>{item.comments} comments</span>}
          {item.cvss && item.cvss > 0 && <span>CVSS {item.cvss}</span>}
          <span className="ml-auto text-[10px] text-text-dim/50">
            score {Math.round(item.score)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
