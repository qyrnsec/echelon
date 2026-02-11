import { getDigest, getDigestDates } from "@/lib/digests";
import CategorySection from "@/components/CategorySection";
import ExportButton from "@/components/ExportButton";
import type { DigestItem } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getDigestDates().map((date) => ({ date }));
}

export default async function DigestPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const digest = getDigest(date);

  if (!digest) notFound();

  const grouped: Record<string, DigestItem[]> = {};
  for (const item of digest.items) {
    const cat = item.category || "News";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  const categoryOrder = ["Vulns", "Bounty", "Tools", "Tutorials", "News"];

  return (
    <div>
      <Link
        href="/archive"
        className="text-xs text-text-dim hover:text-accent transition-colors mb-4 inline-block"
      >
        &larr; Archives
      </Link>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">
            <span className="text-accent">$</span> digest —date {digest.date}
          </h1>
          <ExportButton date={digest.date} items={digest.items} />
        </div>
        <p className="text-xs text-text-dim mt-1">
          {digest.count} éléments sélectionnés
        </p>
      </div>
      {categoryOrder.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          items={grouped[cat] || []}
        />
      ))}
    </div>
  );
}
